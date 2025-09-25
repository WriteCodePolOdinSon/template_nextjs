'use client'

import { useState, useEffect } from 'react'
import LoadingOverlay from '@/components/LoadingOverlay'
import Leftmenu from "@/components/1Leftmenu";
import Footer from "@/components/Footer";
import Header from "@/components/1Header";
import { menuItems } from "@/utils/config_master";
import Link from "next/link";
import { Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


export default function Req_PoolPage() {
    const [detail, setDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedSort, setSelectedSort] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]); // เก็บรายการ checkbox
    // รายการเมนู
    const [activeMenu, setActiveMenu] = useState("report_req_pool")
    const [monthly, setMonthly] = useState([]);
    const [summary, setSummary] = useState({
        total: 120,
        completed: 85,
        inProgress: 20,
        delayed: 1
    });

    // Pie chart data
    const pieData = {
        labels: ['งานรอรับคำร้อง', 'งานรออนุมัติ', 'งานตรวจสอบเอกสาร', 'งานล่าช้า', 'งานสำเร็จ'],
        datasets: [
            {
                data: [10, 20, 20, 15, 35], // ตัวเลขตัวอย่าง
                backgroundColor: ['#007bff', '#28a745', '#fd7e14', '#dc3545', '#17a2b8'],
                hoverOffset: 4
            }
        ]
    };

    // Line chart data
    const lineData = {
        labels: ['Jun 18', 'Jun 5', 'Jun 10', 'Jun 19', 'Jun 21', 'Jun 24'],
        datasets: [
            {
                label: 'งาน',
                data: [5, 10, 8, 12, 6, 14],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0,123,255,0.2)',
                tension: 0.4
            },
            {
                label: 'งานสำเร็จ',
                data: [3, 7, 6, 8, 5, 10],
                borderColor: '#28a745',
                backgroundColor: 'rgba(40,167,69,0.2)',
                tension: 0.4
            }
        ]
    };
    useEffect(() => {
        const fetchStat = async () => {
            try {
                const res = await fetch("/api/poolclaim/dashboard");
                const data = await res.json();

                if (data.success) {
                    // ✅ summary
                    if (data.summary?.length > 0) {
                        const s = data.summary[0];
                        setSummary({
                            total: (s.total),
                            completed: (s.completed),
                            inprogress: (s.inprogress),
                            delayed: (s.delayed),
                        });
                    }

                    // ✅ monthly
                    if (data.monthly) {
                        setMonthly(data.monthly);
                    }
                }
            } catch (err) {
                console.error("Error fetching dashboard:", err);
            }
        };

        fetchStat();
    }, []);


    return (
        <div className="flex flex-col min-h-screen bg-white text-black overflow-x-hidden">
            <Header />
            <div className="flex flex-grow">
                <Leftmenu />
                <main className="flex-grow overflow-auto p-4">
                    <div className="p-6 space-y-6">
                        {/* Summary Cards */}
                        <div className="flex gap-4 mb-6">
                            <div className="bg-blue-500 text-white p-4 rounded shadow w-1/4 text-center">
                                <h2 className="text-xl font-bold">{summary.total}</h2>
                                <p>งานทั้งหมด</p>
                            </div>
                            <div className="bg-green-500 text-white p-4 rounded shadow w-1/4 text-center">
                                <h2 className="text-xl font-bold">{summary.completed}</h2>
                                <p>งานสำเร็จ</p>
                            </div>
                            <div className="bg-orange-400 text-white p-4 rounded shadow w-1/4 text-center">
                                <h2 className="text-xl font-bold">{summary.inprogress}</h2>
                                <p>งานอยู่ระหว่างดำเนินการ</p>
                            </div>
                            <div className="bg-red-500 text-white p-4 rounded shadow w-1/4 text-center">
                                <h2 className="text-xl font-bold">{summary.delayed}</h2>
                                <p>งานล่าช้า</p>
                            </div>
                        </div>

                        {/* Charts */}
                        <div className="flex gap-6 items-start">
                            {/* Pie Chart */}
                            <div className="w-1/3 bg-white p-4 rounded-xl shadow">
                                <h3 className="mb-2 font-bold text-center">Summary</h3>
                                <Pie data={pieData} />
                            </div>

                            {/* Line Chart */}
                            <div className="w-2/3 bg-white p-4 rounded-xl shadow">
                                <h3 className="mb-4 font-bold">Performance Trends</h3>
                                <div className="h-[300px]">
                                    <Line data={monthly} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
            <Footer />
        </div >
    )
}
