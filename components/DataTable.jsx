'use client'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUnlock } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { useState, useContext } from "react";
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import SearchByDate from "./SearchByDate";
import Image from "next/image";
import { CiMenuKebab } from "react-icons/ci";
import UpdateFormModal from "./UpdateFormModal";
import axios from 'axios';
const DataTable = ({ setUpdate, setUpdateId, handleDelete, handleUnlockCertificate }) => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const users = useContext(SearchArrayDataProvider);

  const handleOpenModal = (user) => {
    setCurrentUser(user);
    setOpenFormModal(true);
  };

  const handleCloseModal = () => {
    setOpenFormModal(false);
    setCurrentUser(null);
  };

  const handleUpdate = async(updatedUser) => {
    // Update the user in the context or state
    await axios.patch(`/api/user/${updatedUser.id}`,updatedUser)
    .then(() => {
        alert("user certificate has been unlock!")
    })
    .catch((e) => alert(e.message))

    console.log('Updated user:', updatedUser);
    // Here you can call an update function to persist the changes
  };

  return (
    <div className="w-full h-full flex flex-col gap-5 p-6">
      <div className="flex justify-between items-center w-full">
        <h2>List of Trainees</h2>
        <SearchByDate />
        <h2>Total: {users.finalUsers.length}</h2>
      </div>
      <table className='w-full'>
        <thead className='bg-red-700'>
          <tr>
            <th className='py-3 px-4 text-sm text-left text-white'>Name</th>
            <th className='py-3 px-4 text-sm text-left text-white'>Email</th>
            <th className='py-3 px-4 text-sm text-left text-white'>Category</th>
            <th className='py-3 px-4 text-sm text-left text-white'>Date Started</th>
            <th className='py-3 px-4 text-sm text-left text-white'>Or Number</th>
            <th className='py-3 px-4 text-sm text-left text-white'>Action</th>
          </tr>
        </thead>
        <tbody className="relative">

          {users.finalUsers.length === 0 ? <div className="absolute z-10 inset-0 flex justify-center items-center w-full h-full bg-blue-500"><h1 className="text-xl text-center w-full mt-40">Users does not exist!</h1> </div>  :
          <>
          {users.finalUsers.map((val, index) => (
            <tr key={val.id} className={`${index % 2 === 0 ? "bg-[#d9d9d9]" : "bg-[#f0f0f0]"} hover:bg-red-300 cursor-pointer`}>
              <td className='p-3 px-4 text-sm text-[#0e0d0d] flex items-center gap-2'>
                <div className="h-8 w-8 rounded-full relative bg-[#8d8d8d] overflow-hidden ">
                  {val.profilePictureUrl === null ? <Image src={'/assets/user profile.jpg'} fill className="object-cover absolute inset-0 w-full h-full" />
                    :
                    <Image src={val.profilePictureUrl} fill className="object-cover absolute inset-0 w-full h-full" />
                  }
                </div>
                {val.name}</td>
              <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val.email}</td>
              <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.category}</td>
              <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.dateStarted}</td>
              <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.orNumber}</td>
             
              <td className='p-3 gap-2'>


                <div className="flex  items-center gap-2">
                <button
                 onClick={() => handleOpenModal(val)}
                  className='text-lg text-[#343434]'
                >
                  <FaEdit />
                </button>

                <button onClick={() => handleDelete(val.id)} className='text-xl text-[#343434] '>
                  <MdDelete />
                </button>

                <button onClick={() => handleUnlockCertificate(val.id)} className='text-base text-[#343434] '>
                  {val.certificatedApproved ? <FaClipboardCheck /> : <FaUnlock />}
                </button>


                </div>
              </td>
            </tr>
          ))}

        </>

        }
        </tbody>
      </table>

      <UpdateFormModal
        isOpen={openFormModal}
        onClose={handleCloseModal}
        userData={currentUser}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default DataTable;
