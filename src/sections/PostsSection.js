import React, { useEffect, useState, useContext } from 'react'
import Post from '../components/Post'
import Postupload from './Postupload';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';


function PostsSection() {

  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    // get all posts
    const getPosts = async () => {

      try {

        setloading(true);

        const { data } = await axios.get('https://socialix-social-media-backend.vercel.app/api/post/get');

        setposts(data);
        setloading(false);

      } catch (error) {
        setloading(false);

        console.log("error in featching posts");
        console.log(error.message);
      }
    }

    getPosts();

  }, [])

  return (
    <>
      <Loader loading={loading} />
      <div className='posts-section  h-screen md:mr-6 md:w-[80%] w-[90%] mx-auto'>

        <Postupload setposts={setposts} posts={posts} />

        {
          posts &&
          posts.map((post, idx) => {
            return (

              <Post post={post} />

            )
          })
        }

      </div>
    </>
  )
}

export default PostsSection