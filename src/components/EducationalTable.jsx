import React, { useMemo, useState, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import Pagination from "./Pagination";
import { FiSearch } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

export default function EducationalTable({ data }) {
    const [query, setQuery] = useState("");
    const [selectedStatuses, setSelectedStatuses] = useState(["Active", "Alumni", "Inactive"]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState({ key: "studentId", dir: "asc" });
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(data);

    const [gpaRange, setGpaRange] = useState({ min: "", max: "" });

    const [viewStudent, setViewStudent] = useState(null);
    const [editStudent, setEditStudent] = useState(null);

    useEffect(() => setRows(data), [data]);

    // Toggle status selection
    function toggleStatus(status) {
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    }

    const processed = useMemo(() => {
        let items = [...rows];

        // Multi-select filter
        if (selectedStatuses.length > 0) {
            items = items.filter(r => selectedStatuses.includes(r.status));
        }

        // GPA range filter
        if (gpaRange.min !== "" || gpaRange.max !== "") {
            items = items.filter(r => {
                const gpaNum = parseFloat(r.gpa);
                const minOK = gpaRange.min === "" || gpaNum >= parseFloat(gpaRange.min);
                const maxOK = gpaRange.max === "" || gpaNum <= parseFloat(gpaRange.max);
                return minOK && maxOK;
            });
        }

        // Search
        if (query.trim()) {
            const q = query.toLowerCase();
            items = items.filter(r =>
                Object.values(r).some(v => String(v).toLowerCase().includes(q))
            );
        }

        // Sorting
        items.sort((a, b) => {
            const A = a[sortBy.key];
            const B = b[sortBy.key];
            if (A < B) return sortBy.dir === "asc" ? -1 : 1;
            if (A > B) return sortBy.dir === "asc" ? 1 : -1;
            return 0;
        });

        return items;
    }, [rows, query, selectedStatuses, sortBy, gpaRange]);

    const totalPages = Math.max(1, Math.ceil(processed.length / rowsPerPage));
    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [totalPages]);

    const pageItems = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return processed.slice(start, start + rowsPerPage);
    }, [processed, page, rowsPerPage]);

    function toggleSort(key) {
        setSortBy(s =>
            s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }
        );
    }

    function handleDelete(studentId) {
        if (window.confirm("Are you sure you want to delete this student?")) {
            setRows(prev => prev.filter(r => r.studentId !== studentId));
        }
    }

    function handleEditSave() {
        setRows(prev =>
            prev.map(r => (r.studentId === editStudent.studentId ? editStudent : r))
        );
        setEditStudent(null);
    }

    return (
        <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">Educational Information</h2>
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search input */}
                    <div className="relative w-full sm:w-64">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search in educational table..."
                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:bg-white border border-gray-300 
                            focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                        />
                    </div>

                    {/* GPA range filter */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min GPA"
                            value={gpaRange.min}
                            onChange={e => setGpaRange(prev => ({ ...prev, min: e.target.value }))}
                            className="w-21 border rounded px-2 py-1"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max GPA"
                            value={gpaRange.max}
                            onChange={e => setGpaRange(prev => ({ ...prev, max: e.target.value }))}
                            className="w-21 border rounded px-2 py-1"
                        />
                    </div>

                    {/* Status filter multi-select */}
                    <div className="relative">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="px-4 py-2 border rounded-full bg-white flex items-center gap-2 shadow-sm"
                        >
                            Filter Status
                            <FaChevronDown
                                className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg p-3 z-50">
                                {["Active", "Alumni", "Inactive"].map(status => (
                                    <label key={status} className="flex items-center gap-2 py-1">
                                        <input
                                            type="checkbox"
                                            checked={selectedStatuses.includes(status)}
                                            onChange={() => toggleStatus(status)}
                                        />
                                        {status}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white border rounded overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="text-left">
                            <th className="p-3">
                                {/* <input type="checkbox" /> */}
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => toggleSort("studentId")}>
                                Student Id
                            </th>
                            <th className="p-3 cursor-pointer" onClick={() => toggleSort("fullname")}>
                                Fullname
                            </th>
                            <th className="p-3">Graduation Date</th>
                            <th className="p-3">Date of Entry</th>
                            <th className="p-3">Duration</th>
                            <th className="p-3">GPA</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageItems.map((row, idx) => (
                            <tr key={row.studentId} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                                <td className="p-3">
                                    {/* <input type="checkbox" /> */}
                                </td>
                                <td className="p-3 font-medium">{row.studentId}</td>
                                <td className="p-3">{row.fullname}</td>
                                <td className="p-3">{row.graduationDate}</td>
                                <td className="p-3">{row.dateOfEntry}</td>
                                <td className="p-3">{row.duration}</td>
                                <td className="p-3">{row.gpa}</td>
                                <td className="p-3">
                                    <StatusBadge status={row.status} />
                                </td>
                                <td className="p-3">
                                    <ActionButtons
                                        onView={() => setViewStudent(row)}
                                        onEdit={() => setEditStudent(row)}
                                        onDelete={() => handleDelete(row.studentId)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                    {(page - 1) * rowsPerPage + 1} -{" "}
                    {Math.min(page * rowsPerPage, processed.length)} of {processed.length}
                </div>
                <div className="flex items-center gap-3">
                    <div>
                        Rows per page:
                        <select
                            value={rowsPerPage}
                            onChange={e => {
                                setRowsPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            className="ml-2 border rounded px-2 py-1"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                    <Pagination page={page} totalPages={totalPages} setPage={setPage} />
                </div>
            </div>

            {/* View Modal */}
            {viewStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">
                            Viewing {viewStudent.fullname}
                        </h2>
                        <ul className="space-y-2">
                            {Object.entries(viewStudent).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setViewStudent(null)}
                            className="mt-4 px-4 py-2 bg-gray-300 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editStudent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Edit {editStudent.fullname}</h2>
                        <div className="flex flex-col gap-2">
                            {Object.keys(editStudent).map(key =>
                                key !== "status" ? (
                                    <input
                                        key={key}
                                        name={key}
                                        value={editStudent[key]}
                                        onChange={e =>
                                            setEditStudent(prev => ({
                                                ...prev,
                                                [key]: e.target.value,
                                            }))
                                        }
                                        className="border p-2 rounded"
                                    />
                                ) : (
                                    <select
                                        key={key}
                                        name="status"
                                        value={editStudent.status}
                                        onChange={e =>
                                            setEditStudent(prev => ({
                                                ...prev,
                                                status: e.target.value,
                                            }))
                                        }
                                        className="border p-2 rounded"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Alumni">Alumni</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                )
                            )}
                        </div>
                        <div className="flex justify-end mt-4 gap-2">
                            <button
                                onClick={() => setEditStudent(null)}
                                className="px-4 py-2 bg-gray-300 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                className="px-4 py-2 bg-green-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
