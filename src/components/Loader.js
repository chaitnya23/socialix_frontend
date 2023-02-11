import React from 'react'
import GridLoader from "react-spinners/GridLoader";

export default function Loader({loading}) {

  return (
    <>
    {
      loading ? (<div className='h-screen flex absolute right-0 z-60 w-full top-0 left-0 justify-center items-center backdrop-blur-lg'>
      <GridLoader size={25} loading={loading} color=" rgb(140 150 255)"/> 
      </div>) : (<></>)
    }
    </>
    
  )
}
