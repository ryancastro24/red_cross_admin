
import {useEffect} from 'react'
import MonthTrainee from './MonthTrainee'
import TotalTraineesChart from './TotaltraineesChart'




const Analytics = () => {


  

  return (
    <div className='w-full flex justify-evenly items-center'>
      <TotalTraineesChart/>
      <MonthTrainee/>
    </div>
  )
}

export default Analytics