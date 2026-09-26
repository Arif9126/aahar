"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const transactions = [
  {
    id: "AAH-1024",
    food: "Vegetable Rice",
    receiver: "Green Hope NGO",
    type: "Donation",
    quantity: "24 kg",
    amount: "₹0",
    date: "26 Sep 2026",
    status: "Completed",
  },
  {
    id: "AAH-1023",
    food: "Dal Tadka",
    receiver: "Hope Foundation",
    type: "Donation",
    quantity: "12 kg",
    amount: "₹0",
    date: "26 Sep 2026",
    status: "Pickup Pending",
  },
  {
    id: "AAH-1022",
    food: "Chapati",
    receiver: "Mysuru Community Store",
    type: "Sale",
    quantity: "50 pcs",
    amount: "₹100",
    date: "25 Sep 2026",
    status: "Completed",
  },
  {
    id: "AAH-1021",
    food: "Curd Rice",
    receiver: "Anna Seva Trust",
    type: "Donation",
    quantity: "8 kg",
    amount: "₹0",
    date: "25 Sep 2026",
    status: "Completed",
  },
  {
    id: "AAH-1020",
    food: "Vegetable Curry",
    receiver: "Local Food Hub",
    type: "Sale",
    quantity: "15 kg",
    amount: "₹375",
    date: "24 Sep 2026",
    status: "Completed",
  },
];

export default function Transactions() {
  const router = useRouter();

  const [active, setActive] = useState("Transactions");
  const [filter, setFilter] = useState("All");

  const menu = [
    ["Dashboard", "/donor"],
    ["Demand Prediction", "/donor/demand"],
    ["Production Planning", "/donor/production"],
    ["Register Surplus", "/donor/surplus"],
    ["Surplus Management", "/donor/surplus-management"],
    ["Marketplace", "/donor/marketplace"],
    ["Transactions", "/donor/transactions"],
    ["Impact & ESG", "#"],
  ];

  const filteredTransactions =
    filter === "All"
      ? transactions
      : transactions.filter((item) => item.status === filter);

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-900">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[250px] border-r border-slate-200 bg-white lg:block">

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

          {/* PROFILE */}
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

          {/* NAVIGATION */}
          <nav className="mt-6 px-3">

            <p className="mb-3 px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Workspace
            </p>

            <div className="space-y-1">

              {menu.map(([name, path]) => (
                <button
                  key={name}
                  onClick={() => {
                    setActive(name);

                    if (path !== "#") {
                      router.push(path);
                    }
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    active === name
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >

                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-sm ${
                      active === name
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
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

            </div>
          </nav>

          {/* BOTTOM */}
          <div className="absolute bottom-5 left-4 right-4">

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
                ⚙
              </span>
              Settings
            </button>

            <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
                ↪
              </span>
              Sign out
            </button>

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 lg:ml-[250px]">

          {/* HEADER */}
          <header className="sticky top-0 z-20 flex min-h-[82px] items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur md:px-10">

            <div>
              <p className="text-xs font-semibold text-emerald-600">
                DONOR / INSTITUTION
              </p>

              <h2 className="mt-1 text-xl font-black tracking-tight">
                Transactions
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Track sales, donations and completed food recovery.
              </p>
            </div>

            <button
              onClick={() => router.push("/donor/marketplace")}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              View Marketplace
            </button>

          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1500px] p-6 md:p-10">

            {/* SUMMARY */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <SummaryCard
                title="Total Transactions"
                value="24"
                subtitle="This month"
                icon="↔"
              />

              <SummaryCard
                title="Completed"
                value="19"
                subtitle="Successfully recovered"
                icon="✓"
              />

              <SummaryCard
                title="Pending"
                value="5"
                subtitle="Awaiting action"
                icon="◷"
              />

              <SummaryCard
                title="Value Recovered"
                value="₹4,280"
                subtitle="This month"
                icon="₹"
              />

            </section>

            {/* TRANSACTION OVERVIEW */}
            <section className="mt-7 grid gap-6 xl:grid-cols-[1.4fr_1fr]">

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div>
                  <h3 className="font-bold">
                    Transaction Overview
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Food recovery activity this month
                  </p>
                </div>

                <div className="mt-8 h-52">

                  <div className="relative flex h-full items-end justify-between gap-3">

                    {[45, 62, 51, 76, 68, 84, 72, 91].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex h-full flex-1 items-end justify-center"
                        >
                          <div
                            className="w-full max-w-10 rounded-t-lg bg-emerald-500 transition hover:bg-emerald-600"
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      )
                    )}

                  </div>

                </div>

                <div className="mt-4 flex justify-between text-[10px] text-slate-400">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>

              </div>

              {/* BREAKDOWN */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <h3 className="font-bold">
                  Recovery Breakdown
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Transaction type
                </p>

                <div className="mt-7 space-y-5">

                  <Breakdown
                    title="Donations"
                    value="62%"
                    amount="15 transactions"
                    width="62%"
                    style="bg-emerald-500"
                  />

                  <Breakdown
                    title="Surplus Sales"
                    value="38%"
                    amount="9 transactions"
                    width="38%"
                    style="bg-blue-500"
                  />

                </div>

                <div className="mt-7 rounded-xl bg-slate-50 p-4">

                  <p className="text-xs font-semibold text-slate-500">
                    Total food recovered
                  </p>

                  <p className="mt-1 text-2xl font-black">
                    186 kg
                  </p>

                </div>

              </div>

            </section>

            {/* TRANSACTION HISTORY */}
            <section className="mt-7">

              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                <div>
                  <h3 className="text-lg font-black">
                    Transaction History
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Detailed record of your food recovery transactions.
                  </p>
                </div>

                <div className="flex gap-2">

                  {["All", "Completed", "Pickup Pending"].map(
                    (item) => (
                      <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                          filter === item
                            ? "bg-emerald-600 text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* TABLE */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[950px]">

                    <thead className="border-b border-slate-200 bg-slate-50">

                      <tr>
                        <TableHead>ID</TableHead>
                        <TableHead>Food Item</TableHead>
                        <TableHead>Receiver</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </tr>

                    </thead>

                    <tbody>

                      {filteredTransactions.map((transaction) => (

                        <tr
                          key={transaction.id}
                          className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                        >

                          <td className="px-5 py-5">
                            <span className="text-xs font-black text-slate-500">
                              {transaction.id}
                            </span>
                          </td>

                          <td className="px-5 py-5">

                            <p className="text-sm font-bold">
                              {transaction.food}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                              Food recovery
                            </p>

                          </td>

                          <td className="px-5 py-5">
                            <p className="text-sm font-semibold text-slate-700">
                              {transaction.receiver}
                            </p>
                          </td>

                          <td className="px-5 py-5">
                            <TypeBadge type={transaction.type} />
                          </td>

                          <td className="px-5 py-5 text-sm font-bold">
                            {transaction.quantity}
                          </td>

                          <td className="px-5 py-5 text-sm font-bold">
                            {transaction.amount}
                          </td>

                          <td className="px-5 py-5 text-xs text-slate-500">
                            {transaction.date}
                          </td>

                          <td className="px-5 py-5">
                            <StatusBadge
                              status={transaction.status}
                            />
                          </td>

                          <td className="px-5 py-5">

                            <button
                              onClick={() =>
                                alert(
                                  `Transaction ${transaction.id}\n\n${transaction.food}\n${transaction.quantity}\n${transaction.receiver}`
                                )
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                            >
                              View
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

                {filteredTransactions.length === 0 && (

                  <div className="p-12 text-center">

                    <p className="font-bold text-slate-700">
                      No transactions found
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Try another filter.
                    </p>

                  </div>

                )}

              </div>

            </section>

            {/* FOOTNOTE */}
            <section className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                  ✓
                </div>

                <div>

                  <h4 className="font-bold text-emerald-900">
                    Transparent recovery tracking
                  </h4>

                  <p className="mt-1 max-w-3xl text-sm leading-6 text-emerald-800/70">
                    Every completed transaction contributes to AAHAR's
                    food recovery and impact records, helping institutions
                    understand the value created from surplus food.
                  </p>

                </div>

              </div>

            </section>

          </div>

        </main>

      </div>
    </div>
  );
}


/* SUMMARY CARD */

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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-semibold text-slate-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-black tracking-tight">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-700">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-[11px] text-slate-400">
        {subtitle}
      </p>

    </div>
  );
}


/* TABLE HEAD */

function TableHead({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-500">
      {children}
    </th>
  );
}


/* TYPE BADGE */

function TypeBadge({
  type,
}: {
  type: string;
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold ${
        type === "Donation"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-blue-200 bg-blue-50 text-blue-700"
      }`}
    >
      {type}
    </span>
  );
}


/* STATUS BADGE */

function StatusBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<string, string> = {
    Completed:
      "border-emerald-200 bg-emerald-50 text-emerald-700",

    "Pickup Pending":
      "border-orange-200 bg-orange-50 text-orange-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold ${
        styles[status] ||
        "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}


/* BREAKDOWN */

function Breakdown({
  title,
  value,
  amount,
  width,
  style,
}: {
  title: string;
  value: string;
  amount: string;
  width: string;
  style: string;
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-bold">
            {title}
          </p>

          <p className="mt-1 text-[10px] text-slate-400">
            {amount}
          </p>
        </div>

        <span className="text-sm font-black">
          {value}
        </span>

      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className={`h-full rounded-full ${style}`}
          style={{ width }}
        />

      </div>

    </div>
  );
}