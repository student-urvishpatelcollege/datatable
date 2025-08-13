import React, { useState } from 'react'
import {
    FaTachometerAlt,
    FaUserGraduate,
    FaBriefcase,
    FaCalendarAlt,
    FaUsers,
    FaCog,
    FaSignOutAlt
} from 'react-icons/fa'

const items = [
    { label: 'Dashboard', icon: <FaTachometerAlt /> },
    {
        label: 'Alumni',
        icon: <FaUserGraduate />,
        children: [ 'Educational Info']
    },
    { label: 'Job', icon: <FaBriefcase /> },
    { label: 'Event', icon: <FaCalendarAlt /> },
    { label: 'Users', icon: <FaUsers /> },
    { label: 'Settings', icon: <FaCog /> }
]

export default function Sidebar({ active = 'Educational Info', onMenuSelect }) {
    const [activeParent, setActiveParent] = useState(
        items.find(item => item.children?.includes(active))?.label || active
    )
    const [activeChild, setActiveChild] = useState(active)

    const handleParentClick = (label) => {
        setActiveParent(label)
        if (!items.find(i => i.label === label)?.children) {
            setActiveChild(label)
            onMenuSelect?.(label)
        }
    }

    const handleChildClick = (child) => {
        setActiveChild(child)
        onMenuSelect?.(child)
    }

    return (
        <aside className="w-64 bg-white h-screen border-r flex flex-col">
            {/* Logo */}
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded flex items-center justify-center text-indigo-600 font-bold">
                    IT
                </div>
                <div>
                    <div className="text-sm font-semibold text-indigo-600">INFORMATION</div>
                    <div className="text-xs text-gray-500">TECHNOLOGY</div>
                </div>
            </div>

            {/* Menu */}
            <nav className="p-4 flex-1 overflow-auto">
                {items.map(item => (
                    <div key={item.label} className="mb-2">
                        {/* Parent item */}
                        <div
                            className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer ${activeParent === item.label && !item.children
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            onClick={() => handleParentClick(item.label)}
                        >
                            <div className="text-lg">{item.icon}</div>
                            <div className="font-medium">{item.label}</div>
                        </div>

                        {/* Children */}
                        {item.children && activeParent === item.label && (
                            <div className="ml-7 mt-2">
                                {item.children.map(child => (
                                    <div
                                        key={child}
                                        onClick={() => handleChildClick(child)}
                                        className={`px-3 py-2 rounded text-sm cursor-pointer ${activeChild === child
                                                ? 'bg-indigo-600 text-white'
                                                : 'text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {child}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-6 border-t">
                <button
                    onClick={() => alert('Logging out...')}
                    className="w-full flex items-center gap-3 text-gray-600 hover:text-red-600"
                >
                    <FaSignOutAlt /> Log out
                </button>
            </div>
        </aside>
    )
}
