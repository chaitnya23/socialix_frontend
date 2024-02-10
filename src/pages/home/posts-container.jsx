import React from 'react'
import PostDetailsBox from '../../components/posts/post-stats-box'
import { PostDisplayCard,Loader } from '../../components'
import { useQuery } from 'react-query'
import { getAllPosts, useGetPosts } from '../../apis'

export default function PostsContainer() {

  const {data:posts ,isLoading,isError} = useGetPosts();

  return (
    <>
    <Loader loading={isLoading}/>
    <div className='h-[95vh] p-2  posts-container overflow-y-scroll'>
      {
        posts?.map((post,i)=>{
          return (
            
            <PostDisplayCard {...post} key={i}/>
          )
        })
      }

    </div>
    </>
  )
}
