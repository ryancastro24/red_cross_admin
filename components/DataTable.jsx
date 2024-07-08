'use client'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { useState, useContext } from "react";
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import SearchByDate from "./SearchByDate";
import Image from "next/image";
import { CiMenuKebab } from "react-icons/ci";
import UpdateFormModal from "./UpdateFormModal";
import DetailsModal from "./DetailsModal";
import CategoryDropdown from "./CategoryDropdown";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DataTable = ({ setUpdate, setUpdateId, handleDelete, handleUnlockCertificate }) => {
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openDetaisModal, setOpenDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [checkedUsers, setCheckedUsers] = useState([]);

  const users = useContext(SearchArrayDataProvider);

  const handleOpenModal = (e, user) => {
    e.stopPropagation();
    setCurrentUser(user);
    setOpenFormModal(true);
  };

  const handleOpenDetailsModal = (user) => {
    setCurrentUser(user);
    setOpenDetailsModal(true);
  };

  const handleCloseModal = () => {
    setOpenFormModal(false);
    setCurrentUser(null);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setCurrentUser(null);
  };

  const handleUpdate = async (updatedUser) => {
    // Update the user in the context or state
    await axios.patch(`/api/user/${updatedUser.id}`, updatedUser)
      .then(() => {
        toast('Data has been updated', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      })
      .catch((e) => alert(e.message));

    console.log('Updated user:', updatedUser);
    // Here you can call an update function to persist the changes
  };

  const handleCheckboxChange = (user) => {
    let newCheckedUsers = [...checkedUsers];
    if (newCheckedUsers.find(u => u.id === user.id)) {
      newCheckedUsers = newCheckedUsers.filter(u => u.id !== user.id);
    } else {
      newCheckedUsers.push(user);
    }
    setCheckedUsers(newCheckedUsers);
  };

  const handleBulkUnlock = async () => {

    const dateNow = new Date();
    const formattedDate = dateNow.toISOString().split('T')[0];


    const userIds = checkedUsers.map(user => user.id);
    try {
      await axios.patch('/api/users/graduates', { userIds ,formattedDate}); // Update your API route accordingly
      alert('Selected users have been unlocked!');
      setCheckedUsers([]); // Clear the checked users after successful update
    } catch (error) {
      alert('Error unlocking users: ' + error.message);
    }
  };

  return (
    <>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>



    <div className="w-full h-full flex flex-col gap-5 p-6">
      
      <div className="flex justify-between items-center w-full">
        <h2>List of Trainees</h2>
        <SearchByDate />
        <CategoryDropdown />
        <button
          onClick={handleBulkUnlock}
          className="bg-red-900 text-white py-2 px-4 rounded"
          disabled={checkedUsers.length === 0}
        >
          Unlock Selected
        </button>
        <h2>Total: {users.finalUsers.length}</h2>
      </div>
      <div className="w-full h-[400px] overflow-auto">
        <table className='w-full'>
          <thead className='bg-red-700 sticky top-0'>
            <tr>
              <th className='py-3 px-4 text-sm text-left text-white'>Select</th>
              <th className='py-3 px-4 text-sm text-left text-white'>Name</th>
              <th className='py-3 px-4 text-sm text-left text-white'>Email</th>
              <th className='py-3 px-4 text-sm text-left text-white'>Category</th>
              <th className='py-3 px-4 text-sm text-left text-white'>Date Started</th>
              <th className='py-3 px-4 text-sm text-left text-white'>Or Number</th>
              <th className='py-3 px-4 text-sm text-left text-white'>Action</th>
            </tr>
          </thead>
          <tbody className="relative">
            {users.finalUsers.length === 0 ? (
              <div className="absolute z-10 inset-0 flex justify-center items-center w-full h-full bg-blue-500">
                <h1 className="text-xl text-center w-full mt-40">No Data to Show!</h1>
              </div>
            ) : (
              <>
                {users.finalUsers.map((val, index) => (
                  <tr
                    key={val.id}
                    className={`${checkedUsers.find(u => u.id === val.id) ? "bg-red-900" : index % 2 === 0 ? "bg-[#d9d9d9]" : "bg-[#f0f0f0]"} hover:bg-red-300 cursor-pointer`}
                  >
                    <td className='p-3 px-4 text-sm text-[#0e0d0d]'>
                      <input
                        type="checkbox"
                        checked={checkedUsers.find(u => u.id === val.id)}
                        onChange={() => handleCheckboxChange(val)}
                      />
                    </td>
                    <td className='p-3 px-4 text-sm text-[#0e0d0d] flex items-center gap-2'>
                      <div className="h-8 w-8 rounded-full relative bg-[#8d8d8d] overflow-hidden">
                        {val.profilePictureUrl === "" ? (
                          <Image src={'/assets/user profile.jpg'} fill className="object-cover absolute inset-0 w-full h-full" />
                        ) : (
                          <Image src={val.profilePictureUrl} fill className="object-cover absolute inset-0 w-full h-full" />
                        )}
                      </div>
                      {val.name}
                    </td>
                    <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val.email}</td>
                    <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.category}</td>
                    <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.dateStarted}</td>
                    <td className='p-3 px-4 text-sm text-[#0e0d0d]'>{val?.orNumber}</td>
                    <td className='p-3 gap-2'>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleOpenModal(e, val)}
                          className='text-lg text-[#343434]'
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(val.id)} className='text-xl text-[#343434] '>
                          <MdDelete />
                        </button>
                        <button onClick={() => handleOpenDetailsModal(val)} className='text-xl text-[#343434] '>
                          <IoEyeSharp />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
      <UpdateFormModal
        isOpen={openFormModal}
        onClose={handleCloseModal}
        userData={currentUser}
        onUpdate={handleUpdate}
      />
      <DetailsModal
        isOpen={openDetaisModal}
        onClose={handleCloseDetailsModal}
        userData={currentUser}
      />
    </div>

    </>
  );
}

export default DataTable;
