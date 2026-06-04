"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.push("/admin/dashboard");
      }
    });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("data:", data);
    console.log("error:", error);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800"
      >
        <h1 className="text-2xl font-bold text-white mb-6">관리자 로그인</h1>

        <div className="mb-4">
          <label className="block text-slate-300 mb-2">이메일</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-4 py-3 bg-slate-800 text-white border border-slate-700"
          />
        </div>

        <div className="mb-6">
          <label className="block text-slate-300 mb-2">비밀번호</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg px-4 py-3 bg-slate-800 text-white border border-slate-700"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold"
        >
          로그인
        </button>
      </form>
    </div>
  );
}
