
import {useEffect} from 'react'
import MonthTrainee from './TotalEnrolliesGender'
import TotalTraineesChart from './TotaltraineesChart'
import TotalEnrolliesGender from './TotalEnrolliesGender'


const Analytics = () => {


  

  return (
    <div className='w-full flex justify-evenly items-center'>
      <TotalTraineesChart/>
      <TotalEnrolliesGender/>
    </div>
  )
}

export default Analytics