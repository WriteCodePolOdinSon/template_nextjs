'use client'
import { useState, useRef, useEffect } from 'react'
import ModalIframe from '@/components/ModalIframe';
import useAuthGuard from '@/hooks/useAuthGuard'
import API_BASE_URL from '@/utils/config' // ปรับ path ตามโปรเจกต์คุณ
import { BirdIcon } from 'lucide-react' // หรือใช้ CrowIcon ถ้าใช้ custom
import Link from 'next/link'
import { useRouter } from 'next/navigation'
export default function Topmenu() {
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [count, setCount] = useState(0)
  const checkingAuth = useAuthGuard()

  const openModalWithUrl = (url) => {
    setModalUrl(url);
    setShowModal(true);
  };
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const linkButtons = [
    { label: 'LIST D+', href: '/monitor_dp' },
    // { label: 'HISTORY', href: '/history' },
    // { label: 'Highlight', href: '/hl' },
    // { label: 'Quick Manual', href: '/qm' },
  ]

  const menuItems = [
    // { name: 'CMD', src: '/cmd' },
    // { name: 'Redis', src: '/showkey' },
    { name: 'LIST D+', src: '/mdp' },
    { name: 'Data Compare', src: '/table/tb' },
    { name: 'Function', src: '/table/fn' },
    // { name: 'History', src: '/table/fn' },
    // { name: 'Edit-SQL', src: '/esql' },
  ]



  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/rvpdp/notice_fix_return/count`)
        const data = await res.json()
        setCount(data.count || 0)
      } catch (err) {
        console.error('🚨 Failed to fetch notification count', err)
      }
    }

    fetchCount()

    // ⏱ refresh ทุก 60 วินาที
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 text-white border-b border-gray-700">
      <div className="flex items-center px-4 py-2 justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4 relative" ref={menuRef}>
          {/* 🐦 นกแจ้งเตือน ซ้ายสุด */}
          <div className="relative">
            <BirdIcon
              className={`w-8 h-8 text-white cursor-pointer transition ${count > 0 ? 'animate-shake' : ''}`}
              title="แจ้งเตือน"
              onClick={() => {
                setIsOpen(false)
                openModalWithUrl('/fix/notice_fix')
              }}
            />
            {count > 0 && (
              <span className="absolute -top-0 -right-4 text-xs bg-red-600 text-white px-1 rounded-full">
                {count}
              </span>
            )}
          </div>

          {/* 🔗 โลโก้ */}
          <Link href="/">
            <span className="text-lg ml-3 font-bold border-r pr-4 cursor-pointer hover:text-[#0099ff] transition-colors">
              ODINSON
            </span>
          </Link>

          {/* ☰ เมนู dropdown */}
          <div className="relative text-lg font-bold pr-4 border-r">
            <button onClick={() => setIsOpen(!isOpen)}>☰</button>

            {isOpen && (
              <div className="absolute top-9 left-0 bg-gray-800 border border-gray-700 shadow-md w-48 z-50 text-sm">
                <ul className="flex flex-col">
                  {menuItems.map((item, idx) => (
                    <li key={idx}>
                      <button
                        className="w-full text-left border-b border-gray-700 px-4 py-2 hover:bg-gray-700"
                        onClick={() => {
                          setIsOpen(false)
                          openModalWithUrl(item.src)
                        }}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {showModal && (
              <ModalIframe src={modalUrl} onClose={() => setShowModal(false)} />
            )}
          </div>

          {/* 🔘 ปุ่มลิงก์ */}
          {linkButtons.map((btn, index) => (
            <Link key={index} href={btn.href}>
              <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                {btn.label}
              </button>
            </Link>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-4 relative">
          <LogoutButton />

        </div>

      </div>

      <style jsx>{`
        @keyframes shake {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
          transform-origin: top center;
        }
      `}</style>
    </div>

  )
}
function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    router.replace('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
    >
      Logout
    </button>
  )
}
