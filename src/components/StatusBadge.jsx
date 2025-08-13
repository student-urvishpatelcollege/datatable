import React from 'react'

export default function StatusBadge({ status }) {
    const base = 'px-3 py-1 rounded-full text-xs font-medium'
    if (status === 'Active') return <span className={`${base} bg-green-100 text-green-700`}>Active</span>
    if (status === 'Alumni') return <span className={`${base} bg-indigo-100 text-indigo-700`}>Alumni</span>
    return <span className={`${base} bg-gray-100 text-gray-700`}>Inactive</span>
}

