"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/src/lib/supabaseClient";

type Student = {
  id: string;
  student_name: string;
  created_at?: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canAdd = useMemo(
    () => name.trim().length > 0 && !saving,
    [name, saving]
  );

  // READ
  async function fetchStudents() {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("students")
      .select("id, student_name, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setStudents([]);
    } else {
      setStudents(data ?? []);
    }

    setLoading(false);
  }

  // CREATE
  async function addStudent() {
    const trimmed = name.trim();
    if (!trimmed) return;

    setSaving(true);
    setErrorMsg(null);

    const { error } = await supabase.from("students").insert({
      student_name: trimmed,
    });

    if (error) {
      setErrorMsg(error.message);
      setSaving(false);
      return;
    }

    setName("");
    await fetchStudents();
    setSaving(false);
  }

  // DELETE
  async function deleteStudent(id: string) {
    setErrorMsg(null);
    const backup = students;
    setStudents((prev) => prev.filter((s) => s.id !== id));

    const { error } = await supabase.from("students").delete().eq("id", id);

    if (error) {
      setStudents(backup);
      setErrorMsg(error.message);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBFBFB] px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900">
              Student CRUD
            </h1>
            <p className="mt-1 text-sm text-zinc-600">
              Supabase CRUD demo (Create · Read · Delete)
            </p>
          </div>

          <button
            onClick={fetchStudents}
            className="h-10 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
          >
            Refresh
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          {/* Error */}
          {errorMsg && (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {errorMsg}
            </div>
          )}

          {/* Add Student */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-semibold text-zinc-700">
                Student name
              </label>
              <input
                type="text"
                placeholder="Enter student name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addStudent()}
                className="h-11 w-full rounded-xl border border-zinc-200 px-4 text-sm outline-none focus:ring-2 focus:ring-[#2F52FF]"
              />
            </div>

            <button
              onClick={addStudent}
              disabled={!canAdd}
              className="h-11 rounded-xl bg-[#2F52FF] px-5 text-sm font-semibold text-white disabled:opacity-50"
            >
              {saving ? "Adding..." : "Add"}
            </button>
          </div>

          {/* List */}
          <div className="mt-6">
            <div className="mb-3 flex justify-between text-sm">
              <span className="font-semibold text-zinc-800">
                Student list
              </span>
              <span className="text-zinc-400">
                {students.length} students
              </span>
            </div>

            {loading ? (
              <div className="rounded-xl border p-6 text-center text-sm text-zinc-500">
                Loading...
              </div>
            ) : students.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center">
                <p className="font-semibold">No students yet</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Add your first student above
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border">
                <table className="w-full">
                  <thead className="bg-zinc-50 text-xs text-zinc-700">
                    <tr>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Created</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((s) => (
                      <tr key={s.id} className="text-sm">
                        <td className="px-4 py-3 font-medium">
                          {s.student_name}
                        </td>
                        <td className="px-4 py-3 text-zinc-600">
                          {s.created_at
                            ? new Date(s.created_at).toLocaleString()
                            : "-"}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => deleteStudent(s.id)}
                            className="rounded-lg border px-3 py-1.5 text-sm font-semibold text-rose-600 hover:bg-zinc-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <p className="mt-4 text-xs text-zinc-400">
          Tip: Press Enter to add faster
        </p>
      </div>
    </div>
  );
}