import React from 'react'

export default function Card() {
    return (
        <div className='w-[18rem] h-[20rem] rounded shadow-xl relative overflow-hidden hover:scale-105 duration-300'>
            <div className="absolute top-0 bottom-0 right-0 left-0 bg-black z-[100] opacity-60">
            </div>
            <div className="absolute flex justify-center items-center top-0 bottom-0 right-0 left-0">
                <p className="text-2xl block  font-bold  text-center  z-[500] text-white">Card CardText</p>
            </div>
            <img className='w-full h-full' src="https://cdn.pixabay.com/photo/2018/05/22/14/00/girl-3421489_960_720.jpg" alt="" />

        </div>
    )
}
