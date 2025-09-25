"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Leftmenu from "@/components/Leftmenu";
import Footer from "@/components/Footer";
import Header from "@/components/1Header";

export default function DashboardPage() {

  return (
    <div className="flex flex-col min-h-screen bg-white text-white overflow-x-hidden">
      <Header />
      <div className="flex flex-grow">
        <Leftmenu />
        <main className="flex-grow pt-6 px-6 overflow-auto">
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                ขอโทษครับ 🚫
              </h1>
              <p className="text-gray-600 text-lg">
                ยังไม่มีบริการนี้ในขณะนี้
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
