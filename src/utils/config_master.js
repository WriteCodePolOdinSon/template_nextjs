
export const user_master = [
  { value: "1", label: "ผู้มอบหมาย1" },
  { value: "2", label: "ผู้มอบหมาย2" },
  { value: "3", label: "ผู้มอบหมาย3" }
];

export const user_recv = [
  { value: "4", label: "ผู้รับงาน1" },
  { value: "5", label: "ผู้รับงาน2" },
  { value: "6", label: "ผู้รับงาน3" }
];

export const list_pooling = [
  { value: "poolclaim", label: "CLAIM" },

];

export const users_poolcliam = [
  { username: 'rvpadmin1', password: 'odinson99', role: 'admin', name: 'Admin RVP1' },
  { username: 'rvpadmin2', password: 'odinson99', role: 'admin', name: 'Admin RVP2' },
  { username: 'user1', password: 'user1234', role: 'user', name: 'John User' },
  { username: 'user2', password: 'user1234', role: 'user', name: 'Mary User' },
]

export const menuItems = [
  { id: "req_pool", label: "งาน รอรับคำร้อง", href: "/poolclaim/req_pool" },
  { id: "report_hi04", label: "รายงาน HI04", href: "/poolclaim/report/hi04" },
  { id: "report_req_pool", label: "รายงานคำร้อง", href: "/poolclaim/report/req_pool" },

];

import { FileText, LayoutDashboard , Calculator   , FolderOpen }  from "lucide-react"
export const menuItems_left = [
  
  { name: "DashBoard", href: "/poolclaim/dashboard/main", icon: LayoutDashboard },
  { name: "งานของฉัน", href: "/poolclaim/req_pool", icon: FolderOpen   },
  { name: "คำนวณ", href: "/poolclaim/banner/dev", icon: Calculator    },
  // { name: "Assign", href: "/poolclaim/assign", icon: UserPlus },
  // { name: "รอรับคำรอง", href: "/project", icon: FileText },
];

export const menuItems_head = [
  { id: "report_hi04", label: "หน้าแรก", href: "/poolclaim/banner/dev" },
  { id: "req_pool", label: "ภาค", href: "/poolclaim/banner/close" },
  { id: "1", label: "สินไหม", href: "/poolclaim/banner/close" },
  { id: "2", label: "บริษัทประกัน", href: "/poolclaim/banner/close" },
  { id: "3", label: "นิติการ", href: "/poolclaim/banner/close" },
  { id: "4", label: "การตั้งค่า", href: "/poolclaim/banner/dev" },
];

