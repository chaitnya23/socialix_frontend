import React from 'react'
import { FaHeart } from 'react-icons/fa'

export default function ProfilePostCard({ image, Likes }) {
  return (
    <div className='rounded-xl relative overflow-hidden md:h-[14rem] h-[9rem] cursor-pointer  '>
      <img className='w-full h-full object-cover' src={image} alt="" />

    </div>
  )
}
