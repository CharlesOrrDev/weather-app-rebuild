import FavoritesBtn from "@/components/FavoritesBtn";
import FiveDayCard from "@/components/FiveDayCard";
import SearchBar from "@/components/SearchBar";
import TodaysWeather from "@/components/TodaysWeather";

export default function Home()
{
  const date = new Date();
  const slicedDate = date.toString().slice( 0,3 );
  const slicedMonth = date.toString().slice( 4,7 );
  let dayNumber = date.toString().slice( 8,10 );
  const year = date.toString().slice( 11,15 );

  const days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const mapArr: string[] = [];

  let todaysDay: string = "";

  days.forEach(day =>
  {
    if ( day.includes( slicedDate ) )
    {
      todaysDay = day;
    }
  });
  
  let todaysIndex = days.indexOf( todaysDay );

  mapArr.push( days[todaysIndex] );
  
  for( let i = 0; i < 4; i++ )
  {
    let nextDay = 0;
    if ( days.indexOf(mapArr[i]) + 1 <= 6 )
    {
      nextDay = days.indexOf(mapArr[i]) + 1;
    }
    mapArr.push( days[nextDay] );
  }

  if ( dayNumber.endsWith( "1" ) )
  {
    dayNumber += "st";
  }else if ( dayNumber.endsWith( "2" ) )
  {
    dayNumber += "nd";
  }else if ( dayNumber.endsWith( "3" ) )
  {
    dayNumber += "rd";
  }else
  {
    dayNumber += "th";
  }

  return (
    <>
      <div className="bg-[url('/assets/background.jpg')] h-[100vh] bg-cover bg-center bg-no-repeat text-white m-0 flex justify-center items-center">
        <div>
          <div className="flex pb-[20px]">

            <SearchBar />

            <FavoritesBtn />

          </div>

          <TodaysWeather todaysDay={todaysDay} slicedMonth={slicedMonth} dayNumber={dayNumber} year={year} />
        </div>

        <div className="grid grid-cols-2 w-fit gap-[26px]">
          {
            mapArr.map( (day, index) =>
            {
              return (
                <div key={index}>
                  <FiveDayCard day={day} days={days} months={months} date={date} index={index} />
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  );
}
