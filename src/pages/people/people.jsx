import React, { useContext, useState } from 'react'
import PeopleCard from './people-card'
import { useGetNewPeople, useSearchUser } from '../../apis'
import { UserContext } from '../../context/Context';
import { Loader, SearchResultContainer } from '../../components';
import { COLORS, IoMdSearch, MdClose } from '../../utils';
import { useDebouncer } from '../../utils/useDebouncer';

export default function PeopleContainer() {

    const { user } = useContext(UserContext);
    const [openSearchBox, setopenSearchBox] = useState(false);
    const [searchParam, setSearchParam] = useState("");

    const { data: people, isLoading, isError } = useGetNewPeople(user ? user._id:"");

    //search user
    const searchParamDebounceValue = useDebouncer(searchParam, 1);
    const { data: searchResults } = useSearchUser(searchParamDebounceValue);


    return (
        <div className=''>



            <Loader loading={isLoading} />
            <p className="text-3xl font-bold text-white my-4 inner-shadow">Be friend, Others </p>
            {/* user Search */}
            <div className='text-white mx-3'>
                <div className="my-5 flex gap-5 items-center justify-between p-2 md:w-2/5 m-auto rounded relative" style={{ background: COLORS.dark }}>
                {
                    searchResults &&searchResults.length>0 &&
                    <SearchResultContainer searchResults={searchResults}/>
                }
                    <div className='flex gap-3'>
                    <IoMdSearch size={25} color={COLORS.gray} />
                    <input onChange={(e) => setSearchParam(e.target.value)} value={searchParam} type="text" className='outline-none bg-transparent block ' placeholder='Search a user' />
                    </div>
                    <MdClose size={25} color={COLORS.gray} onClick={()=>setSearchParam("")}/>
                </div>
            </div>
            <div className='md:mx-24 mt-2 md:p-4 p-2  grid md:grid-cols-3 grid-cols-2 gap-12 h-[90vh]  no-scrollBar'>
                {
                    people?.map((ele, i) => {
                        return <PeopleCard {...ele} key={i} />
                    })
                }


            </div>
        </div>
    )
}
