"use client"

import Link from "next/link"
import { useState } from "react"
import { menuItems_head } from "@/utils/config_master";
import LoadingOverlay from '@/components/LoadingOverlay'



export default function MiniMenuBar({ onMenu }) {

  const [loading, setLoading] = useState(false)
  const [activeMenu, setActiveMenu] = useState(onMenu)
  const handleClick = (id) => {
    setActiveMenu(id)
    setLoading(true)
    // สามารถโชว์ LoadingOverlay หรือ Spinner ตรงนี้ได้
    setTimeout(() => setLoading(false), 800) // mock โหลด 0.8 วิ
  }

  return (
    <div className="flex flex-row space-x-4 mb-4">
      {menuItems_head.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`flex items-center px-4 py-2 rounded-lg ${activeMenu === item.id
            ? "bg-[#9f67e5] text-white"
            : "text-black hover:bg-[#b892e6] hover:text-white"
            }`}
          onClick={() => handleClick(item.id)}
        >
          {/* Bullet */}
          <span className="w-3 h-3 rounded-full bg-white border-[1px] border-black mr-2"></span>
          {item.label}
        </Link>
      ))}
      {loading && <LoadingOverlay />}
    </div>
  )

}
