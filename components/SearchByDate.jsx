'use client'
import {useContext} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
const SearchByDate = () => {

    const navigationData = useContext(SideNavigationProvider);
    const searchData = useContext(SearchArrayDataProvider);
  return (
    <div  className='flex items-center gap-3'>
            <label htmlFor="dateSearch" className='text-sm'>Date Started</label>
          <input dateSearch value={searchData.searchData} type="date" onChange={(e) => searchData.setSearchData(e.target.value)} onFocus={() => navigationData.setNavigation("list")} placeholder="search..." className="px-3 py-1 rounded outline-none w-[250px]"/>
    </div>
  )
}

export default SearchByDate