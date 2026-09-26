"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
const stats = [
  {
    title: "Predicted Demand",
    value: "1,240",
    unit: "meals",
    change: "+8.4%",
    label: "vs last week",
    icon: "◈",
    style: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Production",
    value: "1,180",
    unit: "meals",
    change: "95%",
    label: "of planned",
    icon: "▣",
    style: "bg-blue-50 text-blue-700",
  },
  {
    title: "Surplus Recovered",
    value: "86",
    unit: "kg",
    change: "-18%",
    label: "food waste",
    icon: "↗",
    style: "bg-orange-50 text-orange-700",
  },
  {
    title: "Value Recovered",
    value: "₹4,280",
    unit: "",
    change: "+14%",
    label: "this month",
    icon: "₹",
    style: "bg-violet-50 text-violet-700",
  },
];

const surplus = [
  {
    food: "Vegetable Rice",
    category: "Prepared Meal",
    quantity: "24 kg",
    time: "Prepared 1h ago",
    status: "Available",
    statusStyle: "bg-emerald-50 text-emerald-700",
  },
  {
    food: "Dal Tadka",
    category: "Prepared Meal",
    quantity: "12 kg",
    time: "Prepared 2h ago",
    status: "Matched",
    statusStyle: "bg-blue-50 text-blue-700",
  },
  {
    food: "Chapati",
    category: "Bakery",
    quantity: "50 pcs",
    time: "Prepared 3h ago",
    status: "Pickup pending",
    statusStyle: "bg-orange-50 text-orange-700",
  },
];

export default function DonorDashboard() {
  const [active, setActive] = useState("Dashboard");
  const router = useRouter();

  const menu = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Demand Prediction", icon: "◈" },
    { name: "Production Planning", icon: "▤" },
    { name: "Register Surplus", icon: "+" },
    { name: "Surplus Management", icon: "◫" },
    { name: "Marketplace", icon: "◇" },
    { name: "Transactions", icon: "↔" },
    { name: "Organic Recovery", icon: "♻" },
    { name: "Impact & ESG", icon: "◒" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-900">

      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[250px] border-r border-slate-200 bg-white lg:block">

        {/* Logo */}
        <div className="flex h-[82px] items-center border-b border-slate-100 px-7">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-lg font-black text-white shadow-lg shadow-emerald-200">
              A
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">
                AAHAR
              </h1>

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Food Recovery
              </p>
            </div>

          </div>
        </div>

        {/* Profile */}
        <div className="mx-4 mt-5 rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
              DK
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">
                Donor Kitchen
              </p>

              <p className="truncate text-xs text-slate-400">
                Institutional Unit
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">

          <p className="mb-3 px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>

          <div className="space-y-1">

            {menu.map((item) => (
              <button
                key={item.name}
               onClick={() => {
  setActive(item.name);

  if (item.name === "Dashboard") router.push("/donor");

  if (item.name === "Demand Prediction")
    router.push("/donor/demand");

  if (item.name === "Production Planning")
    router.push("/donor/production");

  if (item.name === "Register Surplus")
   router.push("/donor/surplus");

  if (item.name === "Surplus Management")
    router.push("/donor/surplus-management");

  if (item.name === "Marketplace")
    router.push("/donor/marketplace");

  if (item.name === "Transactions")
    router.push("/donor/transactions");

  if (item.name === "Organic Recovery")
    router.push("/donor/organic-recovery");

  if (item.name === "Impact & ESG")
    router.push("/donor/impact");
}}

                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  active === item.name
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                    active === item.name
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {item.icon}
                </span>

                {item.name}
              </button>
            ))}

          </div>
        </nav>

        {/* Bottom */}
        <div className="absolute bottom-5 left-4 right-4">

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
              ⚙
            </span>
            Settings
          </button>

          <button
  onClick={() => router.push("/signin?role=donor")}
  className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
>
  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
    ↪
  </span>

  Sign out
</button>

        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:ml-[250px]">

        {/* TOP BAR */}
        <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur md:px-10">

          <div>
            <p className="text-xs font-semibold text-slate-400">
              DONOR / INSTITUTION
            </p>

            <h2 className="mt-1 text-xl font-black tracking-tight">
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              ♢
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </button>

            <div className="hidden h-9 w-px bg-slate-200 sm:block" />

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">
                Donor Kitchen
              </p>
              <p className="text-[11px] text-slate-400">
                Verified Institution
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-sm font-bold text-emerald-700">
              DK
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-[1500px] p-6 md:p-10">

          {/* WELCOME */}
          <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-7 text-white md:p-9">

            <div className="relative z-10 max-w-2xl">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                System operating normally
              </div>

              <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                Good morning, Donor Kitchen.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
                Your production is on track. AAHAR is helping you reduce
                overproduction and recover suitable surplus food.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <button
  onClick={() => router.push("/donor/surplus")}
  className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
>
                  + Register Surplus
                </button>

                <button className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                  View Prediction
                </button>

              </div>

            </div>

            {/* Decorative */}
            <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

            <div className="absolute right-10 top-10 hidden h-40 w-40 rounded-full border border-white/10 lg:block" />
            <div className="absolute right-20 top-20 hidden h-20 w-20 rounded-full bg-emerald-500/20 lg:block" />

          </section>

          {/* STATS */}
          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      {stat.title}
                    </p>

                    <div className="mt-3 flex items-end gap-1">
                      <span className="text-2xl font-black tracking-tight">
                        {stat.value}
                      </span>

                      <span className="mb-1 text-xs font-medium text-slate-400">
                        {stat.unit}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${stat.style}`}
                  >
                    {stat.icon}
                  </div>

                </div>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                    {stat.change}
                  </span>

                  <span className="text-[11px] text-slate-400">
                    {stat.label}
                  </span>
                </div>

              </div>
            ))}

          </section>

          {/* CHART + SURPLUS */}
          <section className="mt-7 grid gap-6 xl:grid-cols-[1.6fr_1fr]">

            {/* CHART */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <h3 className="font-bold">
                    Demand vs Production
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Last 7 days
                  </p>
                </div>

                <button className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500">
                  7 days ▾
                </button>

              </div>

              {/* Fake chart using CSS */}
              <div className="mt-8 h-[230px]">

                <div className="relative h-full">

                  {/* Grid */}
                  <div className="absolute inset-0 flex flex-col justify-between">

                    {[1, 2, 3, 4, 5].map((line) => (
                      <div
                        key={line}
                        className="border-t border-dashed border-slate-100"
                      />
                    ))}

                  </div>

                  {/* Bars */}
                  <div className="absolute inset-0 flex items-end justify-between gap-3 px-3">

                    {[
                      ["72%", "65%"],
                      ["80%", "73%"],
                      ["68%", "61%"],
                      ["91%", "84%"],
                      ["76%", "70%"],
                      ["88%", "80%"],
                      ["96%", "91%"],
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex h-full flex-1 items-end justify-center gap-1"
                      >

                        <div
                          className="w-3 rounded-t-md bg-emerald-500 transition hover:bg-emerald-600"
                          style={{ height: item[0] }}
                        />

                        <div
                          className="w-3 rounded-t-md bg-slate-200 transition hover:bg-slate-300"
                          style={{ height: item[1] }}
                        />

                      </div>
                    ))}

                  </div>

                </div>

              </div>

              <div className="mt-4 flex items-center gap-5 text-xs text-slate-400">

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                  Predicted demand
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-slate-200" />
                  Production
                </div>

              </div>

            </div>

            {/* SURPLUS STATUS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>
                  <h3 className="font-bold">
                    Surplus Overview
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Current recovery status
                  </p>
                </div>

                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                  This week
                </span>

              </div>

              <div className="mt-7 flex items-center justify-center">

                <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-emerald-500">

                  <div className="absolute inset-[-14px] rounded-full border-[14px] border-transparent border-r-orange-300 border-b-orange-300 rotate-45" />

                  <div className="text-center">
                    <p className="text-3xl font-black">
                      86kg
                    </p>
                    <p className="text-xs text-slate-400">
                      surplus
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-7 grid grid-cols-3 gap-2 text-center">

                <div>
                  <p className="text-lg font-black text-emerald-600">
                    48kg
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Redistributed
                  </p>
                </div>

                <div>
                  <p className="text-lg font-black text-blue-600">
                    26kg
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Sold
                  </p>
                </div>

                <div>
                  <p className="text-lg font-black text-orange-500">
                    12kg
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Recovery
                  </p>
                </div>

              </div>

            </div>

          </section>

          {/* BOTTOM */}
          <section className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

            {/* RECENT SURPLUS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold">
                    Recent Surplus
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Food currently moving through AAHAR
                  </p>
                </div>

                <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                  View all →
                </button>

              </div>

              <div className="mt-5 divide-y divide-slate-100">

                {surplus.map((item) => (
                  <div
                    key={item.food}
                    className="flex items-center justify-between gap-4 py-4"
                  >

                    <div className="flex min-w-0 items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-orange-50 text-xl">
                        🍲
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {item.food}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.category} · {item.time}
                        </p>
                      </div>

                    </div>

                    <div className="hidden text-right sm:block">
                      <p className="text-sm font-bold">
                        {item.quantity}
                      </p>

                      <span
                        className={`mt-1 inline-block rounded-md px-2 py-1 text-[10px] font-bold ${item.statusStyle}`}
                      >
                        {item.status}
                      </span>
                    </div>

                  </div>
                ))}

              </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="font-bold">
                Quick Actions
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Common donor operations
              </p>

              <div className="mt-5 grid gap-3">

                <button
  onClick={() => router.push("/donor/surplus")}
  className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
>

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                    +
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Register surplus
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Add available food
                    </p>
                  </div>

                  <span className="ml-auto text-slate-300 group-hover:text-emerald-500">
                    →
                  </span>

                </button>

                <button className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                    ◈
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      View AI prediction
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Check tomorrow's demand
                    </p>
                  </div>

                  <span className="ml-auto text-slate-300 group-hover:text-blue-500">
                    →
                  </span>

                </button>

                <button className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:border-violet-300 hover:bg-violet-50">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 font-bold text-violet-700">
                    ↗
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      View impact
                    </p>

                    <p className="mt-1 text-[11px] text-slate-400">
                      Track recovered value
                    </p>
                  </div>

                  <span className="ml-auto text-slate-300 group-hover:text-violet-500">
                    →
                  </span>

                </button>

              </div>

            </div>

          </section>

        </div>
      </main>

    </div>
  );
}
