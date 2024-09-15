import React, { useState, useContext } from "react";
import Image from "next/image";
import { saveAs } from "file-saver";
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import SearchByDateArchives from "./SearchByDateArchives";
import { FiDownload } from "react-icons/fi";
import UserDetailsModal from "./userDetailsModal";
import { useToast } from "@/components/ui/use-toast"
import axios from "axios";
import Loader from "./Loader";
import { FaRegUser } from "react-icons/fa6";
import { RiDeleteBin7Line } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const Archives = () => {

  const { toast } = useToast()
  const [deleteLoader,setDeleteLoader] = useState(false);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const graudatedUsers = useContext(SearchArrayDataProvider);
  const groupedUsers = groupByDate(graudatedUsers.archivedUsers);

  const handleOpenDetailsModal = (user) => {
    setCurrentUser(user);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setCurrentUser(null);
  };

  const downloadGroupData = (users, headers) => {
    const csvContent = [
      headers.join(","),
      ...users.map(user => [
        user.name,
        user.email,
        user.category,
        user.dateStarted,
        user.address,
        user.orNumber,
        user.gender,
        user.contact,
      ].map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "group_data.csv");
  };


  const handleDelete = async(id) => {

    setDeleteLoader(true);

    await axios.delete(`/api/user/${id}`)
                .then(() => {
                  toast({
                    title: "User Successfully Deleted!",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  })

                  setDeleteLoader(false);
    
                })
                .catch((e) => alert(e.message))
}



  return (
    <div className="w-full gap-5 p-4">
      <div className="flex justify-between items-center w-full mb-5">
        <h2>Archived Files</h2>
        <SearchByDateArchives />
        <h2 className="flex items-center gap-2">
        <FaRegUser/> 

        <strong>
        {graudatedUsers.archivedUsers.length}
        </strong>
        {graudatedUsers.archivedUsers.length  === 1 ? "Graduated Trainee" : "Graduated Trainees"} 
        </h2>
      </div>

      <div className="w-full h-[450px] overflow-auto">
        <Table>
          <TableCaption>{graudatedUsers.archivedUsers.length ===  0 ? "No Trainees Graduated" : "Graduate Trainees"}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead >Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Date Started</TableHead>
              <TableHead className="text-right">Location</TableHead>
              <TableHead className="text-right w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupedUsers.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <TableRow className="bg-gray-200">
                  <TableCell colSpan={5}>
                    <strong>{group.date}</strong>
                  </TableCell>
                  <TableCell className="text-right">
                    <button
                      className="text-lg  gap-2 bg-transparent border-none outline-none"
                      onClick={() => downloadGroupData(group.users, ["Name", "Email", "Category", "Date Started","Location","Or Number","Gender","Contact Number"])}
                    >
                      <FiDownload/>
                    </button>
                  </TableCell>
                </TableRow>
                {group.users.map((val, index) => (
                  <TableRow
                    onClick={() => handleOpenDetailsModal(val)}
                    key={val.id}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full relative bg-gray-400 overflow-hidden">
                        {val.profilePictureUrl === "" ? (
                          <Image alt="profile picture" src="/assets/user profile.jpg" fill className="object-cover absolute inset-0 w-full h-full" />
                        ) : (
                          <Image alt="profile picture" src={val.profilePictureUrl} fill className="object-cover absolute inset-0 w-full h-full" />
                        )}
                      </div>
                      {val.name}
                    </TableCell>
                    <TableCell>{val.email}</TableCell>
                    <TableCell>{val.category}</TableCell>
                    <TableCell className="text-right">{val.dateStarted}</TableCell>
                    <TableCell className="text-right">{val.address}</TableCell>
                    <TableCell className="flex items-center gap-2 justify-center">
                          <UserDetailsModal {...val}/>
                          {/* change the text delete to an icon instead */}
                          <button className="text-lg"  onClick={() => handleDelete(val.id)}>{deleteLoader ? <Loader color="black"/> : <RiDeleteBin7Line/>}</button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
     

     
    </div>
  );
};

export default Archives;

const groupByDate = (data) => {
  const groupedData = data.reduce((acc, user) => {
    const date = new Date(user.dateEnded).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(user);
    return acc;
  }, {});

  // Sort the dates
  const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));
  return sortedDates.map(date => ({ date, users: groupedData[date] }));
};
