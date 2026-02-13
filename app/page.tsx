"use client";

import { useEffect } from "react";
import { supabase } from "@/src/lib/supabaseClient";

export default function Home() {

  useEffect(() => {
    async function test() {
      const { data, error } = await supabase
        .from("students")
        .select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return <div>Check console for Supabase data</div>;
}