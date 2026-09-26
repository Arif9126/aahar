"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const surplusItems = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Cooked Meal",
    quantity: "24 kg",
    prepared: "12:30 PM",
    available: "4:30 PM",
    status: "Available",
    match: "3 NGOs nearby",
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Cooked Meal",
    quantity: "12 kg",
    prepared: "11:45 AM",
    available: "3:30 PM",
    status: "Matched",
    match: "Hope Foundation",
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery",
    quantity: "50 pcs",
    prepared: "12:00 PM",
    available: "5:00 PM",
    status: "Pickup Pending",
    match: "Anna Seva Trust",
  },
  {
    id: 4,
    food: "Curd Rice",
    category: "Cooked Meal",
    quantity: "8 kg",
    prepared: "1:00 PM",
    available: "4:00 PM",
    status: "Available",
    match: "2 NGOs nearby",
  },
];

export default function SurplusManagement() {
  const router = useRouter();
  const [active, setActive] = useState("Surplus Management");
  const [filter, setFilter] = useState("All");

  const menu = [
    ["Dashboard", "/donor"],
    ["Demand Prediction", "/donor/demand"],
    ["Production Planning", "/donor/production"],
    ["Register Surplus", "/donor/surplus"],
    ["Surplus Management", "/donor/surplus-management"],
    ["Marketplace", "#"],
    ["Transactions", "#"],
    ["Impact & ESG", "#"],
  ];

  const filteredItems =
    filter === "All"
      ? surplusItems
      : surplusItems.filter((item) => item.status === filter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
          <div className="border-b border-slate-200 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-black text-white">
                A
              </div>

              <div>
                <h1 className="text-lg font-black tracking-tight">
                  AAHAR
                </h1>
                <p className="text-xs text-slate-500">
                  Donor Portal
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-5">
            {menu.map(([name, path]) => (
              <button
                key={name}
                onClick={() => {
                  setActive(name);

                  if (path !== "#") {
                    router.push(path);
                  }
                }}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  active === name
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-sm">
                  {name === "Dashboard" && "⌂"}
                  {name === "Demand Prediction" && "◈"}
                  {name === "Production Planning" && "▤"}
                  {name === "Register Surplus" && "+"}
                  {name === "Surplus Management" && "◫"}
                  {name === "Marketplace" && "◇"}
                  {name === "Transactions" && "↔"}
                  {name === "Impact & ESG" && "◒"}
                </span>

                {name}
              </button>
            ))}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-2xl bg-slate-900 p-4 text-white">
              <p className="text-xs text-slate-400">
                Today's recovery
              </p>

              <p className="mt-1 text-2xl font-black">86 kg</p>

              <p className="mt-1 text-xs text-emerald-400">
                Food saved from waste
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1">
          {/* TOP BAR */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                Donor Portal
              </p>

              <h2 className="mt-1 text-2xl font-black tracking-tight">
                Surplus Management
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track, match and manage your registered food surplus.
              </p>
            </div>

            <button
              onClick={() => router.push("/donor/surplus")}
              className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600"
            >
              + Register Surplus
            </button>
          </header>

          <div className="space-y-8 p-6 lg:p-10">
            {/* SUMMARY CARDS */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SummaryCard
                title="Total Surplus"
                value="86 kg"
                subtitle="Registered today"
                icon="◫"
              />

              <SummaryCard
                title="Available"
                value="32 kg"
                subtitle="Waiting for matching"
                icon="◉"
              />

              <SummaryCard
                title="Matched"
                value="34 kg"
                subtitle="Organization assigned"
                icon="✓"
              />

              <SummaryCard
                title="Pickup Pending"
                value="20 kg"
                subtitle="Awaiting collection"
                icon="↗"
              />
            </section>

            {/* SMART MATCHING BANNER */}
            <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm lg:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-3 inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                    SMART MATCHING
                  </div>

                  <h3 className="text-xl font-black">
                    5 potential matches found
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    AAHAR has identified nearby verified organizations
                    based on food type, quantity, availability window
                    and location.
                  </p>
                </div>

                <button
                  onClick={() => setFilter("Available")}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                >
                  View Matches
                </button>
              </div>
            </section>

            {/* FILTERS */}
            <section>
              <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-black">
                    Registered Surplus
                  </h3>

                  <p className="text-sm text-slate-500">
                    Manage all food surplus entries.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    "All",
                    "Available",
                    "Matched",
                    "Pickup Pending",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                        filter === item
                          ? "bg-emerald-500 text-white"
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABLE */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px]">
                    <thead className="border-b border-slate-200 bg-slate-50">
                      <tr>
                        <TableHead>Food Item</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Prepared</TableHead>
                        <TableHead>Available Until</TableHead>
                        <TableHead>Matching</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredItems.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >
                          <td className="px-5 py-5">
                            <p className="font-bold text-slate-900">
                              {item.food}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {item.category}
                            </p>
                          </td>

                          <td className="px-5 py-5 text-sm font-bold">
                            {item.quantity}
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-600">
                            {item.prepared}
                          </td>

                          <td className="px-5 py-5 text-sm text-slate-600">
                            {item.available}
                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm font-semibold text-slate-700">
                              {item.match}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <StatusBadge status={item.status} />
                          </td>

                          <td className="px-5 py-5">
                            <button
                              onClick={() =>
                                alert(
                                  `${item.food} selected for management`
                                )
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredItems.length === 0 && (
                  <div className="p-12 text-center">
                    <p className="font-bold text-slate-700">
                      No surplus items found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try another filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* PROCESS */}
            <section>
              <h3 className="text-lg font-black">
                Surplus Lifecycle
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                How AAHAR moves surplus food towards recovery.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-4">
                <ProcessCard
                  number="01"
                  title="Register"
                  text="Institution records available surplus food."
                />

                <ProcessCard
                  number="02"
                  title="Assess"
                  text="Food condition and availability information is recorded."
                />

                <ProcessCard
                  number="03"
                  title="Match"
                  text="AAHAR identifies suitable verified organizations or receivers."
                />

                <ProcessCard
                  number="04"
                  title="Recover"
                  text="Pickup, redistribution and impact are tracked."
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-black tracking-tight">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs font-medium text-slate-500">
        {subtitle}
      </p>
    </div>
  );
}

function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Available:
      "bg-emerald-50 text-emerald-700 border-emerald-200",
    Matched:
      "bg-blue-50 text-blue-700 border-blue-200",
    "Pickup Pending":
      "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[status] || "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function ProcessCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-xs font-black text-emerald-700">
          {number}
        </span>

        <h4 className="font-black">{title}</h4>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        {text}
      </p>
    </div>
  );
}