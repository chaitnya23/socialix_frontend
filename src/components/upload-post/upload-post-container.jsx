import React from 'react'
import { COLORS, FaImage, MdFileUpload } from '../../utils'

export default function UploadPostContainer() {
  return (
    <div>
      <p className="font-semibold text-2xl text-white my-4">Update your activity</p>

      <div className="post-bio-box rounded-xl" style={{ backgroundColor: COLORS.dark }}>
        <textarea placeholder='Do you have something in mind...💭' name="bio" id="" className='border-none outline-none bg-transparent p-2 text-white w-full' rows={2}></textarea>
        <div className="flex justify-between gap-8">
          <div  className='flex gap-3 p-3 cursor-pointer'>
            <FaImage size={22} color={COLORS.lightblue} />
            <p className=" " style={{ color: COLORS.lightblue }}>Media</p>
          </div>
          <div className='flex gap-3 p-3 cursor-pointer'>
            <MdFileUpload  size={22} color={COLORS.red} />
            <p className=" " style={{ color: COLORS.red }}>Upload post</p>
          </div>
        </div>
      </div>

    </div>
  )
}
