'use client'
import {useContext} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
const CategoryDropdown = () => {

    
    const navigationData = useContext(SideNavigationProvider);
    const searchData = useContext(SearchArrayDataProvider);
  return (
    <>

    <select name="" id="" value={searchData.searchData} onChange={(e) => searchData.setSearchData(e.target.value)} className="px-3 py-1 rounded bg-[#dadada] outline-none w-[250px]">
        <option value="">Filter By Category</option>
        <option value="standard">Standard</option>
        <option value="occupational">Occupational</option>
    </select>

    </>
  )
}

export default CategoryDropdown