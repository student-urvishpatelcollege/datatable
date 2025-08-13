// import React, { useState } from 'react';
// import Topbar from './Topbar';

// export default function App() {
//     const [students, setStudents] = useState([]);

//     const handleAddStudent = () => {
//         const newStudent = {
//             id: students.length + 1,
//             name: `Student ${students.length + 1}`,
//             email: `student${students.length + 1}@example.com`,
//             course: "BCA",
//             year: "3rd Year"
//         };
//         setStudents([...students, newStudent]);
//     };

//     return (
//         <div>
//             <Topbar onAddStudent={handleAddStudent} />
//             <div className="p-6">
//                 <h2 className="font-bold mb-4">Student List</h2>
//                 <ul className="list-disc pl-6">
//                     {students.map(s => (
//                         <li key={s.id}>
//                             {s.name} - {s.email} - {s.course} - {s.year}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }
