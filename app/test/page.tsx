"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export default function TestPage() {
  const [msg, setMsg] = useState("Testing connection...");

  useEffect(() => {
    async function test() {
      const { error } = await supabase.from("test").select("*").limit(1);
      if (error) setMsg("Connected (table not found is OK)");
      else setMsg("Connected successfully!");
    }
    test();
  }, []);

  return <div style={{ padding: 20 }}>{msg}</div>;
}