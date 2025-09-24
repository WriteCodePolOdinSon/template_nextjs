'use client'

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="text-white text-lg flex items-center gap-2">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4" />
          <div className="text-gray-300">กำลังโหลดข้อมูล...</div>
        </div>
      </div>
    </div>
  )
}
