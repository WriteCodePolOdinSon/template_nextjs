'use client'

import Leftmenu from '@/components/Leftmenu'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0e1624] text-white overflow-x-hidden">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Leftmenu />

        {/* Main Content */}
        <main className="flex-grow pt-6 px-6 overflow-auto">
          {/* เนื้อหาใส่ตรงนี้ */}
      
        </main>
      </div>

      <Footer />
    </div>
  )
}
