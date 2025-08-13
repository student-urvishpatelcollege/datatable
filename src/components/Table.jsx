// import React, { useState } from "react";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

// export default function EducationalTable({ data, setData }) {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [newStudent, setNewStudent] = useState({
//         studentId: "",
//         fullname: "",
//         graduationDate: "",
//         dateOfEntry: "",
//         duration: "",
//         gpa: "",
//         status: "Active",
//     });

//     // Handle input change in modal
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setNewStudent((prev) => ({ ...prev, [name]: value }));
//     };

//     // Add student to table
//     const handleAdd = () => {
//         if (!newStudent.fullname || !newStudent.studentId) {
//             alert("Please fill required fields");
//             return;
//         }
//         setData((prev) => [...prev, newStudent]);
//         setNewStudent({
//             studentId: "",
//             fullname: "",
//             graduationDate: "",
//             dateOfEntry: "",
//             duration: "",
//             gpa: "",
//             status: "Active",
//         });
//         setIsModalOpen(false);
//     };

//     // Delete student
//     const handleDelete = (id) => {
//         setData((prev) => prev.filter((student) => student.studentId !== id));
//     };

//     return (
//         <div className="p-4">
//             {/* Table */}
//             <table className="w-full border-collapse border border-gray-300">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border p-2">ID</th>
//                         <th className="border p-2">Full Name</th>
//                         <th className="border p-2">Graduation Date</th>
//                         <th className="border p-2">Date of Entry</th>
//                         <th className="border p-2">Duration</th>
//                         <th className="border p-2">GPA</th>
//                         <th className="border p-2">Status</th>
//                         <th className="border p-2">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((student, index) => (
//                         <tr key={index} className="text-center">
//                             <td className="border p-2">{student.studentId}</td>
//                             <td className="border p-2">{student.fullname}</td>
//                             <td className="border p-2">{student.graduationDate}</td>
//                             <td className="border p-2">{student.dateOfEntry}</td>
//                             <td className="border p-2">{student.duration}</td>
//                             <td className="border p-2">{student.gpa}</td>
//                             <td className="border p-2">{student.status}</td>
//                             <td className="border p-2 flex justify-center gap-2">
//                                 <button className="p-1 bg-blue-500 text-white rounded">
//                                     <FaEye />
//                                 </button>
//                                 <button className="p-1 bg-yellow-500 text-white rounded">
//                                     <FaEdit />
//                                 </button>
//                                 <button
//                                     onClick={() => handleDelete(student.studentId)}
//                                     className="p-1 bg-red-500 text-white rounded"
//                                 >
//                                     <FaTrash />
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Add Student Modal */}
//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded shadow-lg w-96">
//                         <h2 className="text-lg font-bold mb-4">Add New Alumni</h2>
//                         <div className="flex flex-col gap-2">
//                             <input
//                                 name="studentId"
//                                 placeholder="Student ID"
//                                 value={newStudent.studentId}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             />
//                             <input
//                                 name="fullname"
//                                 placeholder="Full Name"
//                                 value={newStudent.fullname}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             />
//                             <input
//                                 type="date"
//                                 name="graduationDate"
//                                 value={newStudent.graduationDate}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             />
//                             <input
//                                 type="date"
//                                 name="dateOfEntry"
//                                 value={newStudent.dateOfEntry}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             />
//                             <input
//                                 name="duration"
//                                 placeholder="Duration"
//                                 value={newStudent.duration}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             />
//                             <input
//                                 type="number"
//                                 name="gpa"
//                                 placeholder="GPA"
//                                 value={newStudent.gpa}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             />
//                             <select
//                                 name="status"
//                                 value={newStudent.status}
//                                 onChange={handleChange}
//                                 className="border p-2 rounded"
//                             >
//                                 <option value="Active">Active</option>
//                                 <option value="Alumni">Alumni</option>
//                                 <option value="Inactive">Inactive</option>
//                             </select>
//                         </div>
//                         <div className="flex justify-end mt-4 gap-2">
//                             <button
//                                 onClick={() => setIsModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleAdd}
//                                 className="px-4 py-2 bg-green-500 text-white rounded"
//                             >
//                                 Add
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Floating Add Button (triggered by Topbar) */}
//             <button
//                 onClick={() => setIsModalOpen(true)}
//                 className="hidden"
//                 id="openAddModalBtn"
//             >
//                 +
//             </button>
//         </div>
//     );
// }
