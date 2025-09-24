'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { LogInIcon } from 'lucide-react'
import { list_pooling } from "@/utils/config_master"
import LoadingOverlay from '@/components/LoadingOverlay'
import { API_BASE_URL } from "@/utils/config"

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [listPoolings, setListPoolings] = useState([]); // array
  const [selectedPool, setSelectedPool] = useState(listPoolings[0]?.value || '')

  useEffect(() => {
    setListPoolings(list_pooling); // ถ้า list_pooling เป็น array ปกติ
  }, []);


  useEffect(() => {
    // เลือก pool แรกอัตโนมัติเมื่อ listPoolings โหลดแล้ว
    if (listPoolings.length > 0 && !selectedPool) {
      setSelectedPool(listPoolings[0].value);
    }
  }, [listPoolings]);

  const handleLogin = async () => {
    try {
      setIsLoading(true)
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token)
        router.push(`/${selectedPool}/home`)
      } else {
        alert('❌ Login ผิด')
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Error fetching notes:", err)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen ">
      {/* ด้านซ้าย: รูปภาพเต็มครึ่ง */}
      <div className="w-1/2 h-screen">
        <img
          src="/img/img_login.webp"
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ด้านขวา */}
      <div className="w-1/2 flex flex-col items-center justify-start p-6 gap-6 bg-[#ffffff]">
        {/* โลโก้ด้านบน */}
        {/* โลโก้ด้านบน ครึ่งบนของฝั่งขวา */}
        <div className="w-full h-1/2 flex justify-center items-center">
          <img
            src="/img/img_logo_login.webp"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* ฟอร์ม login */}
        <div className="bg-white p-6 rounded-lg w-[80%]  space-y-4 ">
          <h1 className="text-xl font-bold text-center text-gray-700">Login / เข้าสู่ระบบ</h1>

          <div className="space-y-1">
            <label className="text-gray-600">รหัสผู้ใช้ :</label>
            <input
              className="w-full px-3 py-2 rounded border border-gray-400 bg-gray-200 text-black focus:border-blue-500 focus:outline-none"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-600">รหัสผ่าน :</label>
            <input
              type="password"
              className="w-full px-3 py-2 rounded border border-gray-400 bg-gray-200 text-black focus:border-blue-500 focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin()
              }}
            />
          </div>


          <div className="space-y-1">
            <label className="text-gray-600">Pool :</label>
            <select
              value={selectedPool}
              onChange={(e) => setSelectedPool(e.target.value)}
              className=" ml-2 border   border-gray-400 rounded bg-gray-200 text-black px-2 py-1 w-[20%] "
            >
              {listPoolings.map((g, idx) => (
                <option key={idx} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>


          </div>

          <button
            className="w-full text-white bg-[#412965] hover:bg-[#4129657d] px-3 py-2 rounded flex items-center justify-center gap-2"
            onClick={handleLogin}
          >
            Login
            <LogInIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isLoading && <LoadingOverlay />}
    </div>
  )
}
