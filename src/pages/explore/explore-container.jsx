import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useGetPolularPosts } from '../../apis/queries/react-useQueries'
import ExplorePostCard from './explore-post-card';
import { Loader } from '../../components';
import { Link } from 'react-router-dom';

export default function ExploreContainer() {

  const { data: posts, isLoading, isError } = useGetPolularPosts();


  return (

    <div className=''>
      <Loader loading={isLoading} />
      <p className="text-3xl font-bold text-white my-4 inner-shadow">Explore Popular </p>
      <div className='md:mx-24 mt-2 p-4  grid md:grid-cols-3 grid-cols-2 gap-12 h-[90vh] no-scrollBar'>
        {
          posts?.map((post, i) => {
            return (
              <Link to={'/post/' + post._id}>
                <ExplorePostCard {...post} key={i} />
              </Link>
            )
          })
        }


      </div>
    </div>
  )
}

