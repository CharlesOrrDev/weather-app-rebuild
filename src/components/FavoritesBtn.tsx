import React from 'react'

const FavoritesBtn = () => {
  return (
    <button className="cursor-pointer">
      <div className="
          w-[42px] h-[42px]
          bg-black/50
          rounded-[10px]
          border-white
          border
          shadow-[0_0_15px_rgba(0,0,0,1)]
          ml-[10px]
        ">
          <div className="flex justify-center items-center h-[100%]">
            <img src="/assets/favorited.png" alt="favorite star" />
          </div>
      </div>
    </button>
  )
}

export default FavoritesBtn