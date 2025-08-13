import React from 'react'

export default function Pagination({ page, totalPages, setPage }) {
    const pages = []
    for (let i = 1; i <= Math.min(totalPages, 10); i++) pages.push(i)
    return (
        <div className="flex items-center gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded">‹</button>
            {pages.map(p => (
                <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 border rounded ${p === page ? 'bg-indigo-600 text-white' : ''}`}>{p}</button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 border rounded">›</button>
        </div>
    )
}
