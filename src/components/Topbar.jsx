import React from 'react'
import { FaUserShield } from 'react-icons/fa'

export default function Topbar() {
    return (
        <header className="bg-white px-6 py-4 flex items-center justify-between border-b">
            {/* Left section: Welcome text */}
            <div>
                <h1 className="text-lg font-semibold text-gray-800">Welcome back, Urvish!</h1>
                <p className="text-xs text-gray-500">Here’s what’s happening today</p>
            </div>

            {/* Right section: Profile */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-indigo-100 flex items-center justify-center rounded-full">
                    <FaUserShield className="text-indigo-600" />
                </div>
                <div className="text-sm">
                    <div className="font-semibold">Urvish Patel</div>
                    <div className="text-xs text-gray-500">Administrator</div>
                </div>
            </div>
        </header>
    )
}
