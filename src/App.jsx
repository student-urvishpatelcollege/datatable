import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import EducationalTable from './components/EducationalTable'
import { students } from './data/students'

export default function App() {
  const [globalQuery, setGlobalQuery] = useState('')

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar onSearch={setGlobalQuery} />
        <main className="overflow-auto">
          <EducationalTable data={students} />
        </main>
      </div>
    </div>
  )
}