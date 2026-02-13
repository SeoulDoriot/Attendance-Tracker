"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type TabKey = "dashboard" | "today" | "calendar" | "attendance";

type ClassItem = {
  id: string;
  title: string;
  teacher: string;
  time: string;
  location: string;
  students: number;
};

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M7 3v2M17 3v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 8h16" stroke="currentColor" strokeWidth="2" />
      <path d="M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IconBar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 20v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StatCard({
  title,
  value,
  label,
  sub,
  rightIcon,
}: {
  title?: string; // small text on top
  value: React.ReactNode; // big number
  label?: string; // text under value
  sub?: string; // smallest text
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm min-h-[140px]">
      {/* TOP ROW */}
      <div className="flex items-start justify-between">
        {title && (
          <p className="text-xs font-medium text-zinc-500">{title}</p>
        )}

        {rightIcon ? (
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-[#2F52FF]">
            {rightIcon}
          </div>
        ) : null}
      </div>

      {/* BIG NUMBER */}
      <div className="mt-3 text-4xl font-semibold text-zinc-900 leading-none">
        {value}
      </div>

      {/* LABEL UNDER VALUE */}
      {label && (
        <p className="mt-2 text-sm font-medium text-zinc-700">{label}</p>
      )}

      {/* SMALL SUB */}
      {sub ? <p className="mt-1 text-xs text-zinc-400">{sub}</p> : null}
    </div>
  );
}

function MiniSchedule() {
  const rows = [
    { name: "Event Name", time: "08:00" },
    { name: "Event Name", time: "08:00" },
    { name: "Event Name", time: "08:00" },
    { name: "Event Name", time: "08:00" },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm min-h-[315px]">
      <p className="text-sm font-semibold text-zinc-900">01–07 Jan 2022</p>

      <div className="mt-4 space-y-2">
        {rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl bg-emerald-100/70 px-4 py-2.5"
          >
            <span className="text-sm font-medium text-zinc-900">{r.name}</span>
            <span className="text-xs font-medium text-zinc-600">{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartPlaceholder() {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-900">
          Attendance Comparison Chart
        </p>
        <div className="flex items-center gap-6 text-xs">
          <button className="font-semibold text-[#2F52FF]">Daily</button>
          <button className="text-zinc-500">Weekly</button>
          <button className="text-zinc-500">Monthly</button>
        </div>
      </div>

      <div className="mt-6 h-[220px] rounded-xl border border-dashed border-zinc-200 bg-zinc-50/50 flex items-center justify-center text-zinc-400">
        Chart Placeholder
      </div>
    </div>
  );
}

function ListPlaceholder({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <div className="mt-6 space-y-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-[10px] w-full rounded-full bg-zinc-200/60" />
        ))}
      </div>
    </div>
  );
}

function AddReportCard() {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-semibold text-zinc-900">
          Add
          <br />
          Report
        </p>
        <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#2F52FF]">
          <IconPlus />
        </div>
      </div>

      <div className="mt-6 space-y-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-[10px] w-full rounded-full bg-zinc-200/60" />
        ))}
      </div>
    </div>
  );
}

function ClassCard({ c }: { c: ClassItem }) {
  if (c.id === "join") {
    return (
      <div className="overflow-hidden rounded-[28px] border border-zinc-100 bg-white shadow-sm">
        <div className="h-[130px] bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xs font-semibold text-blue-700/80">Teacher</p>
            <p className="mt-1 text-lg font-semibold text-blue-800">Create New Class</p>
            <p className="mt-1 text-xs text-blue-700/70">Set time & location boundary</p>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm font-semibold text-zinc-900">Create a class for today</p>
          <p className="mt-2 text-xs text-zinc-600">
            Set schedule, room, and the location radius so students can check-in only
            at the right place.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="h-10 rounded-xl border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-50">
              Set Location
            </button>
            <button className="h-10 rounded-xl bg-[#2F52FF] text-xs font-semibold text-white shadow-sm hover:opacity-95">
              Create Class
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-zinc-400">
            Tip: Add QR/Class code after creating.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-[28px] border border-zinc-100 bg-white shadow-sm">
      <div className="h-[130px] bg-zinc-200" />

      <div className="p-5">
        <p className="text-sm font-semibold text-zinc-900">{c.title}</p>
        <p className="mt-2 text-xs text-zinc-500">
          {c.time} • {c.location}
        </p>

        <p className="mt-3 text-xs text-zinc-400">+{c.students} students</p>

        <button className="mt-4 w-full rounded-xl bg-[#2A6F65] py-2.5 text-xs font-semibold text-white hover:bg-[#245F57]">
          Class Detail
        </button>
      </div>
    </div>
  );
}

function timeToMinutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

type EventItem = {
  id: string;
  title: string;
  start: string; // "08:00"
  end: string; // "10:00"
  track?: string;
  color: string; // tailwind bg class
};

function CalendarView() {
  const [dateLabel, setDateLabel] = useState("01 January 2022");
  const [view, setView] = useState<"Day" | "Week" | "Month">("Day");

  const events: EventItem[] = useMemo(
    () => [
      {
        id: "e1",
        title: "ICT",
        start: "08:00",
        end: "10:00",
        color: "bg-emerald-200",
      },
      {
        id: "e2",
        title: "Math",
        start: "10:00",
        end: "11:00",
        color: "bg-rose-200",
      },
      {
        id: "e3",
        title: "Networks",
        start: "12:00",
        end: "14:00",
        color: "bg-indigo-200",
      },
      {
        id: "e4",
        title: "Java",
        start: "14:00",
        end: "16:00",
        color: "bg-purple-200",
      },
      {
        id: "e5",
        title: "Project",
        start: "16:00",
        end: "18:00",
        color: "bg-amber-200",
      },
    ],
    []
  );

  // timeline (07:00 -> 18:00), 30-min rows
  const startMin = 7 * 60;
  const endMin = 18 * 60;
  const step = 30;

  const rows = useMemo(() => {
    const out: { label: string; min: number }[] = [];
    for (let m = startMin; m <= endMin; m += step) {
      const hh = String(Math.floor(m / 60)).padStart(2, "0");
      const mm = String(m % 60).padStart(2, "0");
      out.push({ label: `${hh}:${mm}`, min: m });
    }
    return out;
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
      {/* Left mini calendar / filters (inside content area) */}
      <aside className="rounded-2xl border border-zinc-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-zinc-900">January</p>
          <div className="flex gap-2 text-zinc-400">
            <button className="h-7 w-7 rounded-lg border border-zinc-200 hover:bg-zinc-50">
              ‹
            </button>
            <button className="h-7 w-7 rounded-lg border border-zinc-200 hover:bg-zinc-50">
              ›
            </button>
          </div>
        </div>

        {/* Simple mini month grid (static look) */}
        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-zinc-400">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const active = day === 1;
            return (
              <button
                key={day}
                className={`h-8 rounded-lg border text-xs ${
                  active
                    ? "border-[#2F52FF] bg-[#2F52FF] text-white"
                    : "border-transparent text-zinc-700 hover:bg-zinc-50"
                }`}
                onClick={() =>
                  setDateLabel(`${String(day).padStart(2, "0")} January 2022`)
                }
              >
                {day}
              </button>
            );
          })}
        </div>

        <div className="mt-4 border-t pt-4">
          <p className="text-xs font-semibold text-zinc-700">Today</p>
          <div className="mt-2 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Upcoming</span>
              <span className="text-zinc-400">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Homework</span>
              <span className="text-zinc-400">2</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Exams</span>
              <span className="text-zinc-400">1</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main calendar schedule */}
      <section className="rounded-2xl border border-zinc-200 bg-white">
        {/* Header row like your screenshot */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-zinc-900">{dateLabel}</p>

            <select
              value={view}
              onChange={(e) => setView(e.target.value as any)}
              className="h-9 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 outline-none hover:bg-zinc-50"
            >
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-9 rounded-full border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50">
              Filter
            </button>
            <button className="h-9 rounded-full bg-[#2F52FF] px-4 text-sm font-semibold text-white shadow hover:opacity-95">
              Add new
            </button>
          </div>
        </div>

        {/* Timeline grid */}
        <div className="relative">
          {/* left time labels + right grid */}
          <div className="grid grid-cols-[90px_1fr]">
            {/* Time column */}
            <div className="border-r bg-white">
              {rows.map((r) => (
                <div
                  key={r.min}
                  className="flex h-12 items-start justify-end pr-3 pt-3 text-xs text-zinc-400"
                >
                  {r.label}
                </div>
              ))}
            </div>

            {/* Grid column */}
            <div className="relative">
              {/* horizontal lines */}
              {rows.map((r) => (
                <div key={r.min} className="h-12 border-b border-zinc-100" />
              ))}

              {/* Events overlay */}
              <div className="pointer-events-none absolute inset-0">
                {events.map((ev) => {
                  const top =
                    ((timeToMinutes(ev.start) - startMin) / step) * 48; // 48px per 30 min row
                  const height =
                    ((timeToMinutes(ev.end) - timeToMinutes(ev.start)) / step) *
                    48;

                  return (
                    <div
                      key={ev.id}
                      className={`absolute left-6 right-6 rounded-xl ${ev.color} px-4 py-3 shadow-sm`}
                      style={{ top, height }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-zinc-900">
                          {ev.title}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {ev.start} – {ev.end}
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-zinc-600">
                        {view === "Day" ? "Today schedule" : "Schedule"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default function ClassPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard");

  const titleMap: Record<TabKey, string> = {
    dashboard: "My Dashboard",
    today: "Today Class",
    calendar: "Calendar",
    attendance: "Attendance",
  };

  // sample classes (you can add more here)
  const classes: ClassItem[] = useMemo(
    () => [
      {
        id: "join",
        title: "Join Class",
        teacher: "Set up new class with location boundaries",
        time: "Use class code or QR",
        location: "Right place & right time required",
        students: 0,
      },
      {
        id: "2",
        title: "Cryptography",
        teacher: "Raja Piran",
        time: "10:30 - 12:00",
        location: "Room B-105",
        students: 34,
      },
      {
        id: "3",
        title: "Statistic",
        teacher: "Mr. Senghak",
        time: "13:00 - 14:30",
        location: "Room C-301",
        students: 42,
      },
      {
        id: "4",
        title: "Advance Python",
        teacher: "Mr. Sokleng",
        time: "15:00 - 16:30",
        location: "Lab 2",
        students: 40,
      },
      {
        id: "5",
        title: "Web Development",
        teacher: "Mr. Chanthan",
        time: "08:00 - 09:30",
        location: "Room A-201",
        students: 28,
      },
      {
        id: "6",
        title: "Database",
        teacher: "Mr. Sothyroth",
        time: "10:00 - 11:30",
        location: "Room D-101",
        students: 30,
      },
      {
        id: "7",
        title: "Networking",
        teacher: "Mr. Sethu",
        time: "13:30 - 15:00",
        location: "Lab 1",
        students: 26,
      },
      {
        id: "8",
        title: "UI/UX",
        teacher: "Ms. Lina",
        time: "15:30 - 17:00",
        location: "Room C-110",
        students: 22,
      },
    ],
    []
  );

  return (
    <div className="flex min-h-screen bg-[#fbfbfb]">
      {/* LEFT MENU */}
      <aside className="w-[270px] border-r border-zinc-100 bg-white px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-zinc-100">
            <Image
              src="/profile-logo.png"
              alt="profile"
              fill
              sizes="48px"
              className="object-cover scale-[1.15]"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Vy Seoul</p>
            <p className="text-xs text-zinc-400">Teacher</p>
          </div>
        </div>

        <nav className="mt-10 space-y-2">
          {(
            [
              ["dashboard", "Dashboard", <IconGrid key="i" />],
              ["today", "Today Class", <IconClock key="i" />],
              ["calendar", "Calendar", <IconCalendar key="i" />],
              ["attendance", "Attendance", <IconBar key="i" />],
            ] as const
          ).map(([key, label, icon]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition
                ${
                  activeTab === key
                    ? "bg-[#2F52FF] text-white shadow"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
            >
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  activeTab === key
                    ? "bg-white/15 text-white"
                    : "bg-zinc-100 text-zinc-700"
                }`}
              >
                {icon}
              </span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1">
        <div className="w-full px-8 py-6">
          {/* HEADER */}
          <div className="relative flex items-center justify-between">
            {/* Left: KIT logo */}
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-24 overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src="/kit-logo.png"
                  alt="KIT"
                  fill
                  sizes="96px"
                  className="object-contain scale-[1.08]"
                  priority
                />
              </div>
            </div>

            {/* Center: Page title */}
            <h1 className="absolute left-1/2 -translate-x-1/2 text-[30px] font-semibold text-[#E2A774]">
              {titleMap[activeTab]}
            </h1>

            {/* Right: Search */}
            <input
              placeholder="Find Class"
              className="h-10 w-[260px] rounded-full border border-zinc-300 bg-white px-4 text-sm font-medium text-zinc-900 placeholder:text-zinc-500 outline-none focus:ring-2 focus:ring-[#2F52FF]/30"
            />
          </div>

          <div className="mt-6 h-px bg-zinc-200" />

          {/* SWITCHING CONTENT — ONE PAGE ONLY */}
          {activeTab === "dashboard" && (
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                {/* Row 1: left mini schedule + right stats */}
                <div className="lg:col-span-4">
                  <MiniSchedule />
                </div>

                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                      title="New"
                      value={<span className="text-4xl">Create</span>}
                      label="Create new class"
                      sub="2 new class"
                      rightIcon={<IconPlus />}
                    />
                    <StatCard
                      title="Total"
                      value={<span className="text-4xl">100</span>}
                      label="Total Student"
                      sub="2 new students added!"
                      rightIcon={<IconBar />}
                    />
                    <StatCard
                      title="On Time"
                      value={<span className="text-4xl">70</span>}
                      label="On-time check-in"
                      sub="-10% less than yesterday"
                      rightIcon={<IconClock />}
                    />
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                      title="Absent"
                      value={<span className="text-4xl">62</span>}
                      label="Absent students"
                      sub="+3% increase than yesterday"
                      rightIcon={<IconClock />}
                    />
                    <StatCard
                      title="Early"
                      value={<span className="text-4xl">6</span>}
                      label="Early departures"
                      sub="-10% less than yesterday"
                      rightIcon={<IconCalendar />}
                    />
                    <StatCard
                      title="Time-off"
                      value={<span className="text-4xl">42</span>}
                      label="Approved time-off"
                      sub="+2% increase than yesterday"
                      rightIcon={<IconCalendar />}
                    />
                  </div>
                </div>

                {/* Row 2: chart + wider lists */}
                <div className="lg:col-span-6">
                  <ChartPlaceholder />
                </div>
                <div className="lg:col-span-3">
                  <ListPlaceholder title="Today Class :" />
                </div>
                <div className="lg:col-span-3">
                  <ListPlaceholder title="Non-active Student :" />
                </div>
              </div>
            </div>
          )}

          {activeTab === "today" && (
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {classes.map((c) => (
                  <ClassCard key={c.id} c={c} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="mt-10">
              <CalendarView />
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="mt-10">
              <AttendanceView />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
function StatusPill({ status }: { status: "In Progress" | "Approved" | "Rejected" }) {
  const styles: Record<string, string> = {
    "In Progress": "bg-indigo-50 text-indigo-700 ring-indigo-200",
    Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold ring-1 ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}

function AttendanceView() {
  const absenceRequests = [
    {
      id: "r1",
      student: "Sreymom",
      course: "Machine Learning",
      reason: "Sick",
      days: "1 day",
      date: "Mon",
      status: "In Progress" as const,
    },
    {
      id: "r2",
      student: "Sokleng",
      course: "Cryptography",
      reason: "Family",
      days: "1 day",
      date: "Tue",
      status: "In Progress" as const,
    },
    {
      id: "r3",
      student: "Lina",
      course: "Statistic",
      reason: "Personal",
      days: "2 days",
      date: "Wed",
      status: "Approved" as const,
    },
  ];

  const checkIns = [
    { id: "c1", student: "Sreymom", time: "08:02", status: "On time" },
    { id: "c2", student: "Sokleng", time: "08:11", status: "Late" },
    { id: "c3", student: "Lina", time: "—", status: "Absent" },
    { id: "c4", student: "Chanthan", time: "08:00", status: "On time" },
  ];

  return (
    <div className="space-y-6">
      {/* TOP: teacher profile / class quick info (FULL WIDTH) */}
      <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-zinc-100">
              <Image
                src="/profile-logo.png"
                alt="profile"
                fill
                sizes="64px"
                className="object-cover scale-[1.12]"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">Vy Seoul | Teacher</p>
              <p className="mt-1 text-xs text-zinc-400">Department: Software Engineering</p>
              <p className="text-xs text-zinc-400">Course: Machine Learning</p>
              <p className="text-xs text-zinc-400">Room: KIT Campus</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
              <p className="text-[11px] font-semibold text-zinc-600">Students</p>
              <p className="mt-1 text-xl font-semibold text-zinc-900">34</p>
            </div>
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
              <p className="text-[11px] font-semibold text-zinc-600">Session</p>
              <p className="mt-1 text-xl font-semibold text-zinc-900">08:00</p>
            </div>

            <button
              type="button"
              className="h-10 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
            >
              Class Detail
            </button>
            <button
              type="button"
              className="h-10 rounded-xl bg-[#2F52FF] px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95"
            >
              Start Check-in
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-zinc-400">
          Tip: Set location boundary before starting check-in.
        </p>
      </div>

      {/* BELOW: main content (MAP + HEADER + TABLES) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Map */}
        <div className="lg:col-span-5">
          <div className="relative h-[190px] overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100 shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,82,255,0.18),transparent_45%),radial-gradient(circle_at_80%_60%,rgba(42,111,101,0.18),transparent_50%)]" />
            <div className="relative z-10 flex h-full items-center justify-center text-sm font-semibold text-zinc-500">
              Map Preview (Location Boundary)
            </div>
          </div>
        </div>

        {/* Right: class header */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-500">Attendance</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#E2A774]">
                  Machine Learning
                </h2>
                <p className="mt-2 text-sm text-zinc-600">
                  Manage check-ins and approve absence requests.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="h-10 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  Edit Location
                </button>
                <button
                  type="button"
                  className="h-10 rounded-xl bg-[#2F52FF] px-4 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: check-ins + absence requests */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-zinc-900">Today Check-ins</p>
              <button
                type="button"
                className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
              >
                Export
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-zinc-500">
                    <th className="py-3 pr-4 font-semibold">Student</th>
                    <th className="py-3 pr-4 font-semibold">Check-in</th>
                    <th className="py-3 pr-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {checkIns.map((r) => (
                    <tr key={r.id} className="border-t border-zinc-100">
                      <td className="py-3 pr-4 text-zinc-900 font-medium">{r.student}</td>
                      <td className="py-3 pr-4 text-zinc-700">{r.time}</td>
                      <td className="py-3 text-zinc-700">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-zinc-900">Absence Requests</p>
            <p className="mt-1 text-xs text-zinc-400">Approve or reject student requests.</p>

            <div className="mt-5 space-y-4">
              {absenceRequests.map((r) => (
                <div key={r.id} className="rounded-2xl border border-zinc-100 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">
                        {r.student} · {r.course}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {r.date} · {r.days} · {r.reason}
                      </p>
                    </div>
                    <StatusPill status={r.status} />
                  </div>

                  <div className="mt-4 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      className="h-9 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-semibold text-zinc-700 hover:bg-zinc-50"
                    >
                      Reject
                    </button>
                    <button
                      type="button"
                      className="h-9 rounded-xl bg-[#2F52FF] px-4 text-xs font-semibold text-white shadow-sm hover:opacity-95"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}