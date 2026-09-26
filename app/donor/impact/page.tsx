"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const monthlyData = [
  { month: "Apr", food: 72, meals: 820 },
  { month: "May", food: 96, meals: 1080 },
  { month: "Jun", food: 118, meals: 1340 },
  { month: "Jul", food: 104, meals: 1210 },
  { month: "Aug", food: 132, meals: 1510 },
  { month: "Sep", food: 148, meals: 1680 },
];

export default function ImpactESG() {
  const router = useRouter();
  const [active, setActive] = useState("Impact & ESG");

  const menu = [
    ["Dashboard", "/donor"],
    ["Demand Prediction", "/donor/demand"],
    ["Production Planning", "/donor/production"],
    ["Register Surplus", "/donor/surplus"],
    ["Surplus Management", "/donor/surplus-management"],
    ["Marketplace", "/donor/marketplace"],
    ["Transactions", "/donor/transactions"],
    ["Impact & ESG", "/donor/impact"],
  ];

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
                Impact & ESG
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Measure the environmental and social value created by AAHAR.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Export Report
            </button>

          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1500px] p-6 md:p-10">

            {/* HERO */}
            <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-7 text-white md:p-9">

              <div className="relative z-10 max-w-3xl">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  SUSTAINABILITY DASHBOARD
                </div>

                <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                  Every recovered meal creates measurable impact.
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                  Track how your institution is reducing avoidable food waste,
                  recovering value and supporting food redistribution through
                  AAHAR.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <div className="rounded-xl border border-white/10 bg-white/10 px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Impact score
                    </p>

                    <p className="mt-1 text-xl font-black text-emerald-300">
                      84 / 100
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/10 px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                      Current streak
                    </p>

                    <p className="mt-1 text-xl font-black">
                      18 days
                    </p>
                  </div>

                </div>

              </div>

              <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

            </section>

            {/* IMPACT CARDS */}
            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <ImpactCard
                title="Food Waste Prevented"
                value="186 kg"
                change="+18%"
                subtitle="vs previous month"
                icon="◫"
              />

              <ImpactCard
                title="Meals Supported"
                value="2,940"
                change="+24%"
                subtitle="through redistribution"
                icon="♧"
              />

              <ImpactCard
                title="Value Recovered"
                value="₹4,280"
                change="+14%"
                subtitle="from surplus food"
                icon="₹"
              />

              <ImpactCard
                title="CO₂ Impact"
                value="312 kg"
                change="estimated"
                subtitle="avoided emissions"
                icon="↗"
              />

            </section>

            {/* CHART + ESG SCORE */}
            <section className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

              {/* TREND */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-start justify-between">

                  <div>
                    <h3 className="font-bold">
                      Food Recovery Trend
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      Recovered surplus over the last 6 months
                    </p>
                  </div>

                  <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                    +31% overall
                  </span>

                </div>

                <div className="mt-8 h-[250px]">

                  <div className="flex h-full items-end gap-4">

                    {monthlyData.map((item) => (

                      <div
                        key={item.month}
                        className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                      >

                        <div className="flex h-full w-full items-end justify-center">

                          <div
                            className="w-full max-w-12 rounded-t-xl bg-emerald-500 transition hover:bg-emerald-600"
                            style={{
                              height: `${(item.food / 160) * 100}%`,
                            }}
                          />

                        </div>

                        <span className="text-[10px] font-semibold text-slate-400">
                          {item.month}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                  Food recovered (kg)
                </div>

              </div>

              {/* ESG SCORE */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div>
                  <h3 className="font-bold">
                    ESG Progress
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Current sustainability performance
                  </p>
                </div>

                <div className="mt-7 flex justify-center">

                  <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-[15px] border-emerald-500">

                    <div className="absolute inset-[-15px] rounded-full border-[15px] border-transparent border-r-slate-100 border-b-slate-100 rotate-[-25deg]" />

                    <div className="text-center">

                      <p className="text-4xl font-black">
                        84
                      </p>

                      <p className="text-xs font-semibold text-slate-400">
                        ESG Score
                      </p>

                    </div>

                  </div>

                </div>

                <div className="mt-7 space-y-4">

                  <Progress
                    title="Food Recovery"
                    value="92%"
                    width="92%"
                  />

                  <Progress
                    title="Resource Efficiency"
                    value="78%"
                    width="78%"
                  />

                  <Progress
                    title="Social Impact"
                    value="83%"
                    width="83%"
                  />

                </div>

              </div>

            </section>

            {/* IMPACT BREAKDOWN */}
            <section className="mt-7 grid gap-6 lg:grid-cols-3">

              <ImpactBreakdown
                icon="🌱"
                title="Environmental"
                value="312 kg"
                label="Estimated CO₂ impact"
                text="Reduced food disposal helps lower the environmental burden associated with wasted food."
              />

              <ImpactBreakdown
                icon="♧"
                title="Social"
                value="2,940"
                label="Meals supported"
                text="Surplus food is redirected towards verified organizations and receivers."
              />

              <ImpactBreakdown
                icon="₹"
                title="Economic"
                value="₹4,280"
                label="Value recovered"
                text="Institutions recover value from suitable surplus instead of treating it entirely as waste."
              />

            </section>

            {/* MONTHLY REPORT */}
            <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                <div>
                  <h3 className="font-bold">
                    Sustainability Summary
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    September 2026 impact report
                  </p>
                </div>

                <span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                  On track
                </span>

              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">

                <SummaryRow
                  label="Surplus registered"
                  value="214 kg"
                />

                <SummaryRow
                  label="Successfully recovered"
                  value="186 kg"
                />

                <SummaryRow
                  label="Recovery rate"
                  value="86.9%"
                />

                <SummaryRow
                  label="Meals redistributed"
                  value="2,940"
                />

                <SummaryRow
                  label="Transactions completed"
                  value="19"
                />

                <SummaryRow
                  label="Value recovered"
                  value="₹4,280"
                />

              </div>

            </section>

            {/* NOTE */}
            <section className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

              <div className="flex gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                  ✓
                </div>

                <div>

                  <h4 className="font-bold text-emerald-900">
                    Impact data is continuously updated
                  </h4>

                  <p className="mt-1 max-w-4xl text-sm leading-6 text-emerald-800/70">
                    AAHAR aggregates completed surplus registrations,
                    redistribution activity and transactions to create an
                    institution-level sustainability view. Environmental
                    figures shown here are estimates for demonstration and
                    should be replaced with validated calculation factors
                    before production deployment.
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


/* IMPACT CARD */

function ImpactCard({
  title,
  value,
  change,
  subtitle,
  icon,
}: {
  title: string;
  value: string;
  change: string;
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

      <div className="mt-4 flex items-center gap-2">

        <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          {change}
        </span>

        <span className="text-[10px] text-slate-400">
          {subtitle}
        </span>

      </div>

    </div>
  );
}


/* PROGRESS */

function Progress({
  title,
  value,
  width,
}: {
  title: string;
  value: string;
  width: string;
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <p className="text-xs font-semibold text-slate-600">
          {title}
        </p>

        <p className="text-xs font-bold text-slate-700">
          {value}
        </p>

      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width }}
        />

      </div>

    </div>
  );
}


/* IMPACT BREAKDOWN */

function ImpactBreakdown({
  icon,
  title,
  value,
  label,
  text,
}: {
  icon: string;
  title: string;
  value: string;
  label: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
        {icon}
      </div>

      <h3 className="mt-5 font-black">
        {title}
      </h3>

      <p className="mt-3 text-2xl font-black text-emerald-600">
        {value}
      </p>

      <p className="mt-1 text-xs font-semibold text-slate-500">
        {label}
      </p>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


/* SUMMARY */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">

      <p className="text-xs font-semibold text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-black">
        {value}
      </p>

    </div>
  );
}