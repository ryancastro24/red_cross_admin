'use client'
import {useContext} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
const SearchInputField = () => {

    const navigationData = useContext(SideNavigationProvider);
    const searchData = useContext(SearchArrayDataProvider);
  return (
    <>
          <input value={searchData.searchData} type="text" onChange={(e) => searchData.setSearchData(e.target.value)} onFocus={() => navigationData.setNavigation("list")} placeholder="search..." className="px-3 py-1 rounded outline-none w-[400px]"/>
    </>
  )
}

export default SearchInputField