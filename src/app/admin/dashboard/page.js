"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push("/admin");
  };
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="my-10">
          <h1 className="text-4xl font-black mb-2">관리자 대시보드</h1>
          <p className="text-slate-400">
            예약 및 문의 내역을 관리할 수 있습니다.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/admin/reservations"
            className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="text-3xl mb-4">📅</div>

            <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
              예약 관리
            </h2>

            <p className="text-slate-400 text-sm">
              예약 목록 조회, 완료 처리 및 삭제
            </p>
          </Link>

          <Link
            href="/admin/inquiries"
            className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/50 transition-all duration-300"
          >
            <div className="text-3xl mb-4">💬</div>

            <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
              문의 관리
            </h2>

            <p className="text-slate-400 text-sm">
              문의 내역 조회, 진행 상태 관리 및 삭제
            </p>
          </Link>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={handleLogout}
            className="px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
