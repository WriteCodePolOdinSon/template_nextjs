'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogOutIcon } from 'lucide-react'
import Header_menu from '@/components/Header_Menu'
import { user_master, user_recv } from "@/utils/config_master"
import jwt from 'jsonwebtoken' // 👈 ใช้ decode token ฝั่ง client


export default function Header() {
  const [collapsed, setCollapsed] = useState(true)
  const [user_masters, setUser_Master] = useState("")
  const [dataSource, setDataSource] = useState("master")
  const [userInfo, setUserInfo] = useState(null) // 👈 เก็บข้อมูล user จาก token

  // ✅ decode JWT จาก localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwt.decode(token)
        setUserInfo(decoded) // { username, role, name }
      } catch (err) {
        console.error("Invalid token", err)
      }
    }
  }, [])

  const options = dataSource === "master" ? user_master : user_recv

  return (
    <div className="rounded flex justify-between items-center 
    text-black bg-white px-2 py-4 border-b border-gray-400"
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>

      {/* 🔘 logo + radio + dropdown */}
      <div className="flex items-center gap-4">

        <div className="flex justify-center items-center">
          <img
            src="/img/logo_rvp.webp"
            alt="Logo"
            className="w-[150px] h-[60px] object-contain"
          />
        </div>
        <div className="flex flex-col h-[80px] ">
          <div className="text-[#9f67e5] text-[25px] font-bold mb-2">
            Pooling System
          </div>
          <div className="mt-auto">
            <Header_menu />
          </div>
        </div>



      </div>

      {/* ขวา: ชื่อ + role + logout */}

      <div className="flex items-center gap-4">
        {userInfo && (
          <div className="text-right min-w-[180px]">
            <div className="font-bold"> ชื่อ : {userInfo.name}</div>
            <div className="text-sm text-gray-600">ตำแหน่ง : {userInfo.role}</div>
          </div>
        )}
        <LogoutButton collapsed={collapsed} />
      </div>
    </div>
  )
}

function LogoutButton({ collapsed }) {
  const router = useRouter()
  const handleLogout = () => {
    localStorage.removeItem('token')
    router.replace('/login')
  }
  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 w-full text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
    >
      <LogOutIcon className="w-5 h-5" /> Logout
      {!collapsed && "Logout"}
    </button>
  )
}
