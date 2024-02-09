import React, { useContext, useState } from 'react'
import { COLORS } from '../../utils'
import { GoFileMedia } from '../../utils/';
import { useCreatePost } from '../../apis';
import { Loader } from '../../components';
import { UserContext } from '../../context/Context';
import PostPreview from './post-preview';

export default function CreatePageContainer() {

    const { user } = useContext(UserContext);
    const [postDetails, setPostDetails] = useState({ description: "", location: "", tags: "", imgData: "", user_id: user?._id });
    const [tempImgUrl, setTempImgUrl] = useState(null);

    const { mutate: uploadPost, isLoading } = useCreatePost();

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPostDetails({ ...postDetails, [name]: value });
    }

    const handleFileChange = async (file) => {
        
        if (file === undefined) {
            
            throw new Error("file not selected!!");
        }
        try {
            
            if (
                file.type === "image/jpeg" ||
                file.type === "image/png" ||
                file.type === "image/jpg"
                ) {
                setTempImgUrl(URL.createObjectURL(file));
                const data = new FormData();
                data.append("file", file);
                data.append("upload_preset", "socialix");
                data.append("cloud_name", "dkvpwutkh");


                setPostDetails({ ...postDetails, imgData: data });

            }else{

                console.log("please select correct file");
            }
        } catch (error) {

            console.log(error.message);

        }
    };


    return (
        <div className='mt-12'>
       
            <Loader loading={isLoading} />

            <div className="md:flex gap-10 justify-center items-center">
                <div className='md:w-[40%] mx-6'>
                    <PostPreview {...postDetails} tempImgUrl={tempImgUrl}/>
                </div>
                <div className="form md:w-[60%] mx-6 p-2 text-white">
                    <div>
                        <label htmlFor="description" className='font-semibold text-lg'>Caption :</label>
                        <textarea rows={4} onChange={handleOnChange} value={postDetails.description} name='description' className='p-2 w-full my-2 rounded outline-none' style={{ background: COLORS.dark }} />
                    </div>

                    <div className='my-3'>
                        <label htmlFor="location" className='font-semibold text-lg'>Location :</label>
                        <input type="text" onChange={handleOnChange} value={postDetails.location} placeholder='Enter location' name='location' className='p-2 w-full my-2 rounded outline-none' style={{ background: COLORS.dark }} />
                    </div>
                    <div className='my-3'>
                        <label htmlFor="tags" className='font-semibold text-lg'>Tags : (write in a comma seperated form)</label>
                        <input type="text" onChange={handleOnChange} value={postDetails.tags} name='tags' placeholder='e.g. insta,facebook,good' className='p-2 w-full my-2 rounded outline-none' style={{ background: COLORS.dark }} />
                    </div>

                    <div className=" my-4 ">
                        <p className="text-lg font-semibold my-3">Add Photo : </p>
                        <div className="h-[10rem] border-dashed rounded relative border-[3px] border-gray-500  w-full  md:flex justify-center items-center" style={{ background: COLORS.dark }} >
                            <div>
                                <div>
                                    <div className='flex justify-center my-3'>
                                        <GoFileMedia size={45} color={COLORS.gray} />

                                    </div>
                                    <p className="text-center font-semibold">
                                        Drag and Drop here
                                    </p>
                                    <p className="text-center font-bold">or</p>
                                    <p className="text-center text-blue-500 font-semibold">
                                        Browse files from your device
                                    </p>
                                </div>

                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e.target.files[0])}
                                    name="image"
                                    placeholder="Enter"
                                    className="cursor-pointer absolute w-full top-0 bottom-0 right-0 left-0 opacity-0 rounded p-2 py-3 border border-gray-300 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="btns flex">
                        <button className='font-semibold text-center p-2 px-6 rounded' onClick={() => uploadPost(postDetails)} style={{ background: COLORS.lightblue }}>Create</button>
                    </div>
                </div>

            </div>

        </div>
    )
}
