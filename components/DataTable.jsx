'use client'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUnlock } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
const DataTable = ({setUpdate,setUpdateId,users,handleDelete,handleUnlockCertificate}) => {

    
// bg-[#211e1e]
  return (
  
        <table className='w-full'>
            <thead className=' bg-[#302c2c] sticky top-0'>
                <tr>
                    <th className='py-3 text-white'>Name</th>
                    <th className='py-3 text-white'>Email</th>
                    <th className='py-3 text-white'>Address</th>
                    <th className='py-3 text-white'>Contact Number</th>
                    <th className='py-3 text-white'>Management</th>
                </tr>
            </thead>
            <tbody className="">

                {users.map(val =>  <tr key={val.id} className=''>
                    <td className=' p-3 text-white '>{val.name}</td>
                    <td className=' p-3 text-white '>{val.email}</td>
                    <td className=' p-3 text-white '>{val.address}</td>
                    <td className=' p-3 text-white '>{val.contact}</td>
                    <td className='flex items-center justify-center mt-2 gap-5 '>
                        <button onClick={() => 
                        {
                            setUpdate(true) 
                            setUpdateId(val.id)
                         }} className='text-xl text-blue-500 '><FaEdit /></button>
                        <button onClick={() => handleDelete(val.id)} className='text-xl text-red-500'><MdDelete /></button>
                        <button onClick={() => handleUnlockCertificate(val.id)} className='text-xl text-orange-500'>{val.certificatedApproved ? <FaClipboardCheck/> : <FaUnlock />}</button>
                    </td>
                </tr> )}
               

        
            </tbody>
        </table>
 
  )
}

export default DataTable