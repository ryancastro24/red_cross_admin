'use client'
import {useContext} from 'react'
import { SideNavigationProvider } from './SideNavigationProvider';
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import DatePicker from "./DatePicker";
const SearchByDate = () => {

    const navigationData = useContext(SideNavigationProvider);
    const searchData = useContext(SearchArrayDataProvider);

    
  return (
    <div  className='flex items-center gap-3'>
            <DatePicker date={searchData.searchData} setDate={searchData.setSearchData}/>
    </div>
  )
}

export default SearchByDate