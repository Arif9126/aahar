"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", icon: "⌂", route: "/ngo" },
  { name: "Nearby Surplus", icon: "◇", route: "/ngo/surplus" },
  { name: "Smart Matches", icon: "✦", route: "/ngo/matches" },
  { name: "Requests", icon: "▣", route: "/ngo/requests" },
  { name: "Pickup Management", icon: "↔", route: "/ngo/pickups" },
  { name: "Impact & Distribution", icon: "◒", route: "/ngo/impact" },
];

const surplusData = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Prepared Meal",
    quantity: "12 kg",
    distance: "2.4 km",
    availableUntil: "7:00 PM",
    donor: "Donor Kitchen",
    freshness: "Good",
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Prepared Meal",
    quantity: "8 kg",
    distance: "3.7 km",
    availableUntil: "7:30 PM",
    donor: "Central Institution Kitchen",
    freshness: "Good",
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery / Bread",
    quantity: "40 pcs",
    distance: "5.1 km",
    availableUntil: "8:00 PM",
    donor: "Campus Dining Unit",
    freshness: "Good",
  },
];

const matches = [
  {
    food: "Vegetable Rice",
    quantity: "12 kg",
    donor: "Donor Kitchen",
    need: "10 kg",
    distance: "2.4 km",
    score: "94%",
  },
  {
    food: "Dal Tadka",
    quantity: "8 kg",
    donor: "Central Institution Kitchen",
    need: "8 kg",
    distance: "3.7 km",
    score: "91%",
  },
  {
    food: "Chapati",
    quantity: "40 pcs",
    donor: "Campus Dining Unit",
    need: "35 pcs",
    distance: "5.1 km",
    score: "87%",
  },
];

export default function NGODashboard() {
  const router = useRouter();

  const [active, setActive] = useState("Dashboard");
  const [requestedFood, setRequestedFood] = useState<number | null>(null);

  const handleNavigation = (item: (typeof menu)[number]) => {
    setActive(item.name);
    router.push(item.route);
  };

  const handleRequest = (id: number) => {
    setRequestedFood(id);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-900">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[250px] border-r border-slate-200 bg-white lg:block">

        {/* LOGO */}

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


        {/* NGO PROFILE */}

        <div className="mx-4 mt-5 rounded-2xl bg-slate-50 p-4">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
              GF
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-bold">
                Green Foundation
              </p>

              <p className="truncate text-xs text-slate-400">
                Verified Organization
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

            {menu.map((item) => (

              <button
                key={item.name}
                onClick={() => handleNavigation(item)}
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


        {/* BOTTOM */}

        <div className="absolute bottom-5 left-4 right-4">

          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 hover:bg-slate-50">

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
              ⚙
            </span>

            Settings

          </button>


          <button
            onClick={() => router.push("/signin?role=ngo")}
            className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >

            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50">
              ↪
            </span>

            Sign out

          </button>

        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="lg:ml-[250px]">

        {/* TOP BAR */}

        <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur md:px-10">

          <div>

            <p className="text-xs font-semibold text-slate-400">
              NGO / VERIFIED ORGANIZATION
            </p>

            <h2 className="mt-1 text-xl font-black tracking-tight">
              Dashboard
            </h2>

          </div>


          <div className="flex items-center gap-3">

            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500">
              ♢

              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />

            </button>


            <div className="hidden h-9 w-px bg-slate-200 sm:block" />


            <div className="hidden text-right sm:block">

              <p className="text-sm font-bold">
                Green Foundation
              </p>

              <p className="text-[11px] text-slate-400">
                Verified Organization
              </p>

            </div>


            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
              GF
            </div>

          </div>

        </header>


        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-[1500px] p-6 md:p-10">


          {/* HERO */}

          <section className="relative overflow-hidden rounded-[24px] bg-[#06141a] p-7 text-white shadow-sm md:p-8">

            <div className="absolute right-[-30px] top-[-60px] h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

                Verified organization

              </div>


              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                Good morning, Green Foundation.
              </h1>


              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
                Find suitable surplus food nearby, coordinate pickups and
                distribute recovered food to the communities you serve.
              </p>


              <div className="mt-6 flex flex-wrap gap-3">

                <button
                  onClick={() => router.push("/ngo/surplus")}
                  className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                >
                  Find surplus →
                </button>


                <button
                  onClick={() => router.push("/ngo/matches")}
                  className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  View smart matches
                </button>

              </div>

            </div>

          </section>


          {/* =====================================================
              STAT CARDS
          ===================================================== */}

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Available Surplus
              </p>

              <p className="mt-3 text-2xl font-black">
                42
                <span className="ml-1 text-sm font-semibold text-slate-400">
                  kg
                </span>
              </p>

              <p className="mt-2 text-[11px] text-emerald-600">
                Within your service area
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Smart Matches
              </p>

              <p className="mt-3 text-2xl font-black">
                8
              </p>

              <p className="mt-2 text-[11px] text-emerald-600">
                High-suitability matches
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Active Requests
              </p>

              <p className="mt-3 text-2xl font-black text-blue-600">
                5
              </p>

              <p className="mt-2 text-[11px] text-slate-400">
                Awaiting donor response
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Food Received
              </p>

              <p className="mt-3 text-2xl font-black text-violet-600">
                186
                <span className="ml-1 text-sm font-semibold text-slate-400">
                  kg
                </span>
              </p>

              <p className="mt-2 text-[11px] text-emerald-600">
                This month
              </p>

            </div>

          </section>


          {/* =====================================================
              MAIN GRID
          ===================================================== */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">


            {/* NEARBY SURPLUS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-bold">
                    Nearby Available Surplus
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Suitable surplus within your service area
                  </p>

                </div>


                <button
                  onClick={() => router.push("/ngo/surplus")}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                >
                  View all →
                </button>

              </div>


              <div className="mt-5 space-y-3">

                {surplusData.map((item) => (

                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-slate-50"
                  >

                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                          🍚
                        </div>

                        <div>

                          <p className="text-sm font-bold">
                            {item.food}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {item.category} · {item.donor}
                          </p>

                        </div>

                      </div>


                      <div className="flex flex-wrap items-center gap-5">

                        <div>

                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Quantity
                          </p>

                          <p className="mt-1 text-xs font-bold">
                            {item.quantity}
                          </p>

                        </div>


                        <div>

                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Distance
                          </p>

                          <p className="mt-1 text-xs font-bold text-blue-600">
                            {item.distance}
                          </p>

                        </div>


                        <div>

                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Until
                          </p>

                          <p className="mt-1 text-xs font-bold">
                            {item.availableUntil}
                          </p>

                        </div>


                        <button
                          onClick={() =>
                            handleRequest(item.id)
                          }
                          className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
                            requestedFood === item.id
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          {requestedFood === item.id
                            ? "✓ Requested"
                            : "Request"}
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>


            {/* SMART MATCHES */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-bold">
                    Smart Matches
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Based on food need and proximity
                  </p>

                </div>

                <span className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600">
                  8 matches
                </span>

              </div>


              <div className="mt-5 space-y-3">

                {matches.map((match) => (

                  <div
                    key={match.food}
                    className="rounded-xl bg-slate-50 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm font-bold">
                          {match.food}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {match.donor}
                        </p>

                      </div>


                      <span className="rounded-md bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700">
                        {match.score}
                      </span>

                    </div>


                    <div className="mt-3 flex items-center justify-between text-[11px]">

                      <span className="text-slate-400">
                        Need:{" "}
                        <b className="text-slate-700">
                          {match.need}
                        </b>
                      </span>

                      <span className="text-blue-600">
                        {match.distance}
                      </span>

                    </div>

                  </div>

                ))}

              </div>


              <button
                onClick={() => router.push("/ngo/matches")}
                className="mt-4 w-full rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 transition hover:border-emerald-300 hover:text-emerald-600"
              >
                View all matches
              </button>

            </div>

          </section>


          {/* =====================================================
              DISTRIBUTION OVERVIEW
          ===================================================== */}

          <section className="mt-6 grid gap-6 md:grid-cols-3">


            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                ♻
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-400">
                Food Redistributed
              </p>

              <p className="mt-1 text-2xl font-black">
                186 kg
              </p>

              <p className="mt-2 text-[11px] text-emerald-600">
                +18% compared with last month
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                ♙
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-400">
                People Served
              </p>

              <p className="mt-1 text-2xl font-black">
                742
              </p>

              <p className="mt-2 text-[11px] text-emerald-600">
                Through recovered food
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                ₹
              </div>

              <p className="mt-4 text-xs font-semibold text-slate-400">
                Value Recovered
              </p>

              <p className="mt-1 text-2xl font-black">
                ₹9,420
              </p>

              <p className="mt-2 text-[11px] text-slate-400">
                Estimated recovered value
              </p>

            </div>

          </section>


          {/* =====================================================
              LOCATION PREVIEW
          ===================================================== */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

              <div>

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    📍
                  </div>

                  <div>

                    <h3 className="font-bold">
                      Service Area
                    </h3>

                    <p className="text-xs text-slate-400">
                      Location-aware matching
                    </p>

                  </div>

                </div>

              </div>


              <div className="rounded-xl bg-slate-50 px-5 py-3">

                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Current service area
                </p>

                <p className="mt-1 text-sm font-bold">
                  Mysuru
                </p>

              </div>


              <div className="max-w-md text-xs leading-5 text-slate-500">

                AAHAR can use location data to identify nearby surplus,
                improve matching and support practical pickup coordination.

              </div>

            </div>

          </section>


          {/* =====================================================
              FOOTNOTE
          ===================================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <p className="text-[11px] leading-5 text-slate-500">

              <span className="font-bold text-slate-700">
                AAHAR Smart Matching:
              </span>{" "}
              Match suitability can consider food type, quantity,
              recipient requirements, availability window and proximity.
              Location values shown in this prototype are currently sample
              values and can later be connected to the Location API.

            </p>

          </div>

        </div>

      </main>

    </div>
  );
}