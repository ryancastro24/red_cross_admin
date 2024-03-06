'use client'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect,useState } from "react";
import axios from "axios";
const DataTable = ({setUpdate,setUpdateId}) => {

    const [users,setUsers] = useState([]);

    const handleDelete = async(id) => {

        await axios.delete(`/api/user/${id}`)
                    .then(() => {
                        alert("data has beeen deleted!")
                    })
                    .catch((e) => alert(e.message))
      
    }

   
    useEffect(() => {

        const getUsers = async () => {
            try {
                const usersData = await axios.get('/api/user');
                const data = usersData.data;
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    
        getUsers();
        
    }, [users]);
    

  return (
    <div>
        <table className='w-full h-full '>
            <thead className=' bg-[#B00909]'>
                <tr>
                    <th className='py-3 text-white'>Name</th>
                    <th className='py-3 text-white'>Email</th>
                    <th className='py-3 text-white'>Address</th>
                    <th className='py-3 text-white'>Contact Number</th>
                    <th className='py-3 text-white'>Management</th>
                </tr>
            </thead>
            <tbody>

                {users.map(val =>  <tr key={val.id} className=' border-black border-b-[0.3px] border-opacity-25'>
                    <td className=' p-3 '>{val.name}</td>
                    <td className=' p-3 '>{val.email}</td>
                    <td className=' p-3 '>{val.address}</td>
                    <td className=' p-3 '>{val.contact}</td>
                    <td className='flex items-center justify-center h-full gap-5'>
                        <button onClick={() => 
                        {
                            setUpdate(true) 
                            setUpdateId(val.id)
                         }} className='text-xl text-blue-500'><FaEdit /></button>
                        <button onClick={() => handleDelete(val.id)} className='text-xl text-red-500'><MdDelete /></button>
                    </td>
                </tr> )}
               

        
            </tbody>
        </table>
    </div>
  )
}

export default DataTable