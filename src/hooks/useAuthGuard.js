'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from "@/utils/config"
export default function useAuthGuard() {
  const [checkingAuth, setCheckingAuth] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.replace('/login')
      return
    }

    // สมมติ token เป็น JWT แบบ base64.payload.signature
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      if (payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('token')
        router.replace('/login')
        return
      }
    } catch (err) {
      // ถ้าไม่ใช่ JWT หรือ parse ไม่ได้ ก็เช็คสถานะกับ API /api/check-login
      fetch(`${API_BASE_URL}/api/check-login?token=${token}`)
        .then(res => res.json())
        .then(data => {
          if (!data.loggedIn) {
            localStorage.removeItem('token')
            router.replace('/login')
          } else {
            setCheckingAuth(false)
          }
        })
        .catch(() => {
          localStorage.removeItem('token')
          router.replace('/login')
        })
      return
    }

    setCheckingAuth(false)
  }, [router])

  return checkingAuth
}
