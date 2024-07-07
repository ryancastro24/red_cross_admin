'use client'
import {useContext} from 'react'
import { SearchArrayDataProvider } from "./SearchArrayProvider";
const SearchByDateArchives = () => {
    const searchArchivesData = useContext(SearchArrayDataProvider);
  return (
    <div  className='flex items-center gap-3'>
            <label htmlFor="dateSearch" className='text-sm'>Date Ended</label>
          <input dateSearch value={searchArchivesData.searchDataArchives} type="date" onChange={(e) => searchArchivesData.setSearchDataArchives(e.target.value)}  placeholder="search..." className="px-3 py-1 bg-[#dadada] rounded outline-none w-[250px]"/>
    </div>
  )
}

export default SearchByDateArchives