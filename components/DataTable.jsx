'use client'
import Link from "next/link";
import { CiMenuKebab } from "react-icons/ci";
import { useState, useContext } from "react";
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import SearchByDate from "./SearchByDate";
import Image from "next/image";
import { CiMenuKebab } from "react-icons/ci";
import UpdateFormModal from "./UpdateFormModal";
import DetailsModal from "./DetailsModal";
import UpdateModal from "./UpdateModal";
import CategoryDropdown from "./CategoryDropdown";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UserDetailsModal from "./userDetailsModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
        

<Table>
      <TableCaption>{users.finalUsers.length === 0 ? "No Available Trainees" : "Available Trainees"}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Select</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead >Category</TableHead>
          <TableHead >Date Started</TableHead>
          <TableHead >Action </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  
        {users.finalUsers.map((val,index) => (
          <TableRow key={val.id}>
            <TableCell > 
                    <input
                        type="checkbox"
                        checked={checkedUsers.find(u => u.id === val.id)}
                        onChange={() => handleCheckboxChange(val)}
                      /></TableCell>
            <TableCell className={'flex items-center gap-3'}>
              <div className="h-8 w-8 rounded-full relative bg-[#8d8d8d] overflow-hidden">
                        {val.profilePictureUrl === "" ? (
                          <Image src={'/assets/user profile.jpg'} fill className="object-cover absolute inset-0 w-full h-full" />
                        ) : (
                          <Image src={val.profilePictureUrl} fill className="object-cover absolute inset-0 w-full h-full" />
                        )}
                      </div>
                      {val.name}
              </TableCell>
            <TableCell>{val.email}</TableCell>
            <TableCell >{val.category}</TableCell>
            <TableCell >{val.dateStarted}</TableCell>
            <TableCell >
              <div className="flex items-center gap-2">
              <UpdateModal {...val}/> 
              <UserDetailsModal {...val}/> 

              <DropdownMenu>
                <DropdownMenuTrigger className="text-xl"><CiMenuKebab/></DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/assessment/${val.id}`} >Assess</Link> 
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/assessment/score/${val.id}`} >View Score</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                        <button onClick={() => handleDelete(val.id)} >
                         delete user
                        </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
             

                       
                        
                      </div>
              </TableCell>
          </TableRow>
        ))}

        
      </TableBody>
        
    </Table>



      </div>

    </div>

    </>
  );
}

export default DataTable;
