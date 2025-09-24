'use client'
import { useState, useEffect } from 'react'
import ModalIframe from '@/components/ModalIframe'
import useAuthGuard from '@/hooks/useAuthGuard'
import { MenuIcon, LogOutIcon  , } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { menuItems_left } from "@/utils/config_master";

export default function Leftmenu() {
  const [showModal, setShowModal] = useState(false)
  const [modalUrl] = useState('')
  // const [collapsed, setCollapsed] = useState(true) // default
  const checkingAuth = useAuthGuard()

  // ให้ default เป็น true ฝั่ง server
  const [collapsed, setCollapsed] = useState(true)

  // โหลดค่า localStorage เฉพาะฝั่ง client
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed")
    if (saved !== null) {
      setCollapsed(JSON.parse(saved))
    }
  }, [])

  // บันทึกทุกครั้งที่ collapsed เปลี่ยน
  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", collapsed)
  }, [collapsed])



  return (
    <div
      className={`bg-white text-black border-r border-gray-400
        transition-all duration-100 ${collapsed ? 'w-[6vh]' : 'w-[15vh]'}`}
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.36)' }}
    >
      <div className="flex flex-col h-full px-2 py-4 ">
        {/* ปุ่ม toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mb-6 p-1 rounded transition  border-b border-t w-full"
        >
          {!collapsed && (
            <span className="flex justify-center items-center text-xl font-bold cursor-pointer hover:text-[#0099ff] transition-colors w-full">
              POOLClAIM
            </span>
          )}
          {collapsed && <MenuIcon className="w-6 h-6 " />}
        </button>
        {/* เมนูหลัก */}
        <div className="flex flex-col gap-2 text-sm">
          {menuItems_left.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex flex-col items-center justify-center px-3 py-2 rounded hover:bg-gray-300"
            >
              <item.icon className="w-7 h-7 text-black mb-1" />
              {!collapsed && <span className="text-center">{item.name}</span>}
            </Link>
          ))}
        </div>

      </div>

      {showModal && (
        <ModalIframe src={modalUrl} onClose={() => setShowModal(false)} />
      )}
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
      <LogOutIcon className="w-5 h-5" />
      {!collapsed && "Logout"}
    </button>
  )
}
