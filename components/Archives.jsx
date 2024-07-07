import React, { useState, useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaUnlock } from "react-icons/fa6";
import { FaClipboardCheck } from "react-icons/fa6";
import { SearchArrayDataProvider } from "./SearchArrayProvider";
import DetailsModal from "./DetailsModal";
import { FaFileDownload } from "react-icons/fa";
import Image from "next/image";
import { saveAs } from "file-saver";
import SearchByDateArchives from "./SearchByDateArchives";


const Archives = () => {
  const [openDetaisModal, setOpenDetailsModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenDetailsModal = (user) => {
    setCurrentUser(user);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
    setCurrentUser(null);
  };

  const graudatedUsers = useContext(SearchArrayDataProvider);

  const groupedUsers = groupByDate(graudatedUsers.archivedUsers);

  const downloadGroupData = (users, headers) => {
    const csvContent = [
      headers.join(","),
      ...users.map(user => [
        user.name,
        user.email,
        user.category,
        user.dateStarted,
        user.orNumber,
        user.certificatedApproved ? "Graduated" : ""
      ].map(field => `"${field}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "group_data.csv");
  };

  return (
    <div className="w-full gap-5 p-6">
      <div className="flex justify-between items-center w-full mb-5">
        <h2>Archived Files</h2>
        <SearchByDateArchives/>
        <h2>Total: {graudatedUsers.archivedUsers.length}</h2>
      </div>

      <div className="w-full h-[500px] overflow-scroll">
      <table className="w-full">
        <thead className="bg-red-700 top-0 sticky">
          <tr>
            <th className="py-3 px-4 text-sm text-left text-white">Name</th>
            <th className="py-3 px-4 text-sm text-left text-white">Email</th>
            <th className="py-3 px-4 text-sm text-left text-white">Category</th>
            <th className="py-3 px-4 text-sm text-left text-white">Date Started</th>
            <th className="py-3 px-4 text-sm text-left text-white">Or Number</th>
            <th className="py-3 px-4 text-sm text-left text-white">Status</th>
          </tr>
        </thead>
        <tbody className="relative">
          {graudatedUsers.archivedUsers.length === 0 ? (
            <div className="absolute z-10 inset-0 flex justify-center items-center w-full h-full bg-blue-500">
              <h1 className="text-xl text-center w-full mt-40">No Data to Show</h1>
            </div>
          ) : (
            groupedUsers.map((group, groupIndex) => (
              <React.Fragment key={groupIndex}>
                <tr className="bg-[#929292]">
                  <td  className="p-3 px-4 font-bold text-[white] flex items-center justify-between">
                    <span>{group.date}</span>
                  </td>

                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                 
                  <td className="flex justify-center items-center">
                  <button
                      className="text-white bg-transparent border-none outline-none"
                      onClick={() => downloadGroupData(group.users, ["Name", "Email", "Category", "Date Started", "Or Number", "Status"])}
                    >
                      <FaFileDownload />
                    </button>
                  </td>
                </tr>
                {group.users.map((val, index) => (
                  <tr
                    onClick={() => handleOpenDetailsModal(val)}
                    key={val.id}
                    className={`${index % 2 === 0 ? "bg-[#d9d9d9]" : "bg-[#f0f0f0]"} hover:bg-red-300 cursor-pointer`}
                  >
                    <td className="p-3 px-4 text-sm text-[#0e0d0d] flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full relative bg-[#8d8d8d] overflow-hidden">
                        {val.profilePictureUrl === "" ? (
                          <Image src="/assets/user profile.jpg" fill className="object-cover absolute inset-0 w-full h-full" />
                        ) : (
                          <Image src={val.profilePictureUrl} fill className="object-cover absolute inset-0 w-full h-full" />
                        )}
                      </div>
                      {val.name}
                    </td>
                    <td className="p-3 px-4 text-sm text-[#0e0d0d]">{val.email}</td>
                    <td className="p-3 px-4 text-sm text-[#0e0d0d]">{val?.category}</td>
                    <td className="p-3 px-4 text-sm text-[#0e0d0d]">{val?.dateStarted}</td>
                    <td className="p-3 px-4 text-sm text-[#0e0d0d]">{val?.orNumber}</td>
                    <td className="p-3 px-4 text-sm text-[#0e0d0d]">{val?.certificatedApproved ? "Graduated" : ""}</td>
                    
                  </tr>
                ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      </div>
      <DetailsModal isOpen={openDetaisModal} onClose={handleCloseDetailsModal} userData={currentUser} />
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
