"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    const { data } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    setReservations(data || []);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleComplete = async (id) => {
    const { error } = await supabase
      .from("reservations")
      .update({
        status: "completed",
      })
      .eq("id", id);

    if (error) {
      alert("완료 처리 실패");
      return;
    }

    setReservations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "completed" } : item,
      ),
    );
  };

  const handleDelete = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) {
      return;
    }
    //

    const { error } = await supabase.from("reservations").delete().eq("id", id);

    if (error) {
      alert("삭제 실패");
      return;
    }

    setReservations((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="pt-20 px-8">
      <h1 className="text-3xl font-bold mb-6">예약 관리</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-800 text-left">
              <th className="p-3">예약일</th>
              <th className="p-3">시간</th>
              <th className="p-3">이름</th>
              <th className="p-3">연락처</th>
              <th className="p-3">제작종류</th>
              <th className="p-3">업종</th>
              <th className="p-3">상태</th>
              <th className="p-3">관리</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((item) => (
              <tr key={item.id} className="border-b border-slate-800">
                <td className="p-3">{item.reservation_date}</td>

                <td className="p-3">{item.reservation_time}</td>

                <td className="p-3">{item.name}</td>

                <td className="p-3">{item.phone}</td>

                <td className="p-3">{item.production_type}</td>

                <td className="p-3">{item.business_type}</td>

                <td className="p-3">
                  {item.status === "completed" ? "완료" : "대기"}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    {item.status !== "completed" && (
                      <button
                        onClick={() => handleComplete(item.id)}
                        className="px-3 py-1 rounded bg-green-600 text-white text-sm"
                      >
                        완료
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                    >
                      삭제
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
