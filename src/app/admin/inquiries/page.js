"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);

  const fetchInquiries = async () => {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("data", data);
    console.log("error", error);

    if (!error) {
      setInquiries(data || []);
    }
  };
  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleProgress = async (id) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: "progress" })
      .eq("id", id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "progress" } : item,
        ),
      );
    }
  };

  const handleComplete = async (id) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: "completed" })
      .eq("id", id);

    if (!error) {
      setInquiries((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "completed" } : item,
        ),
      );
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    const { error } = await supabase.from("inquiries").delete().eq("id", id);

    if (!error) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="pt-20 px-8">
      <h1 className="text-3xl font-bold mb-6">문의 관리</h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-3 text-left">이름</th>
              <th className="p-3 text-left">연락처</th>
              <th className="p-3 text-left">제작종류</th>
              <th className="p-3 text-left">업종</th>
              <th className="p-3 text-left">상태</th>
              <th className="p-3 text-left">관리</th>
            </tr>
          </thead>

          <tbody>
            {inquiries.map((item) => (
              <tr key={item.id} className="border-b border-slate-800">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.phone}</td>
                <td className="p-3">{item.production_type}</td>
                <td className="p-3">{item.business_type}</td>

                <td className="p-3">
                  {item.status === "completed"
                    ? "완료"
                    : item.status === "progress"
                      ? "진행중"
                      : "대기"}
                </td>

                <td className="p-3">
                  <div className="flex gap-2">
                    {item.status === "pending" && (
                      <button
                        onClick={() => handleProgress(item.id)}
                        className="px-3 py-1 bg-yellow-600 rounded cursor-pointer"
                      >
                        진행중
                      </button>
                    )}

                    {item.status !== "completed" && (
                      <button
                        onClick={() => handleComplete(item.id)}
                        className="px-3 py-1 bg-green-600 rounded cursor-pointer"
                      >
                        완료
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-600 rounded cursor-pointer"
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
