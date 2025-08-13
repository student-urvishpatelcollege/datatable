import React from 'react'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'

export default function ActionButtons({ row, onView, onEdit, onDelete }) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => onView(row)}
                className="p-2 rounded bg-white border hover:shadow"
                title="View"
            >
                <FaEye />
            </button>
            <button
                onClick={() => onEdit(row)}
                className="p-2 rounded bg-white border hover:shadow"
                title="Edit"
            >
                <FaEdit />
            </button>
            <button
                onClick={() => onDelete(row)}
                className="p-2 rounded bg-white border hover:shadow text-red-600"
                title="Delete"
            >
                <FaTrash />
            </button>
        </div>
    )
}
