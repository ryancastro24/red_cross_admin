'use client'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUnlock } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { useState ,useContext} from "react";
import { SearchArrayDataProvider } from "./SearchArrayProvider";
const DataTable = ({setUpdate,setUpdateId,handleDelete,handleUnlockCertificate}) => {

    const [openFormModal,setOpenFormModal] = useState(false);



    const users = useContext(SearchArrayDataProvider);




// bg-[#211e1e]
  return (
<div className="w-full h-full flex flex-col gap-5 p-6">

    <div className="flex justify-between items-center w-full">
    <h2>List of Trainees</h2>
    <h2>Total: {users.finalUsers.length}</h2>

    </div>
    <table className='w-full'>
  <thead className='bg-red-700'>
    <tr>
      <th className='py-3 px-4 text-sm text-left text-white'>Name</th>
      <th className='py-3 px-4 text-sm text-left text-white'>Email</th>
      <th className='py-3 px-4 text-sm text-left text-white'>Address</th>
      <th className='py-3 px-4 text-sm text-left text-white'>Contact Number</th>
      <th className='py-3 px-4 text-sm text-left text-white'>Category</th>
      <th className='py-3 px-4 text-sm text-left text-white'>Date Started</th>
      <th className='py-3 px-4 text-sm text-left text-white'>Management</th>
    </tr>
  </thead>
  <tbody>
    {users.finalUsers.map((val, index) => (
      <tr key={val.id} className={`${index % 2 === 0 ? "bg-[#d9d9d9]" : "bg-[#f0f0f0]"}`}>
        <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val.name}</td>
        <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val.email}</td>
        <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val.address}</td>
        <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val.contact}</td>
        <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.category}</td>
        <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.dateStarted}</td>
        <td className='p-3 text-sm flex items-center justify-center gap-5'>
          <button
            onClick={() => {
              setUpdate(true);
              setUpdateId(val.id);
            }}
            className='text-xl text-blue-500'
          >
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(val.id)} className='text-xl text-red-500'>
            <MdDelete />
          </button>
          <button onClick={() => handleUnlockCertificate(val.id)} className='text-xl text-orange-500'>
            {val.certificatedApproved ? <FaClipboardCheck /> : <FaUnlock />}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
  )
}

export default DataTable