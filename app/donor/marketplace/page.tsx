"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const foodListings = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Prepared Meal",
    quantity: "24 kg",
    price: "₹25/kg",
    type: "Sale",
    availableUntil: "4:30 PM",
    location: "Mysuru",
    interest: "3 interested",
    status: "Available",
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Prepared Meal",
    quantity: "12 kg",
    price: "Free",
    type: "Donation",
    availableUntil: "3:30 PM",
    location: "Mysuru",
    interest: "Hope Foundation",
    status: "Reserved",
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery",
    quantity: "50 pcs",
    price: "₹2/pc",
    type: "Sale",
    availableUntil: "5:00 PM",
    location: "Mysuru",
    interest: "Anna Seva Trust",
    status: "Pickup Pending",
  },
  {
    id: 4,
    food: "Curd Rice",
    category: "Prepared Meal",
    quantity: "8 kg",
    price: "Free",
    type: "Donation",
    availableUntil: "4:00 PM",
    location: "Mysuru",
    interest: "2 interested",
    status: "Available",
  },
];

export default function Marketplace() {
  const router = useRouter();

  const [active, setActive] = useState("Marketplace");
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const menu = [
    ["Dashboard", "/donor"],
    ["Demand Prediction", "/donor/demand"],
    ["Production Planning", "/donor/production"],
    ["Register Surplus", "/donor/surplus"],
    ["Surplus Management", "/donor/surplus-management"],
    ["Marketplace", "/donor/marketplace"],
    ["Transactions", "#"],
    ["Impact & ESG", "#"],
  ];

  const filteredListings = foodListings.filter((item) => {
    const matchesFilter =
      filter === "All" || item.type === filter;

    const matchesSearch =
      item.food.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f6f8f7] text-slate-900">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
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
        <main className="lg:ml-[250px] flex-1">

          {/* TOP BAR */}
          <header className="sticky top-0 z-20 flex min-h-[82px] items-center justify-between border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur md:px-10">

            <div>
              <p className="text-xs font-semibold text-emerald-600">
                DONOR / INSTITUTION
              </p>

              <h2 className="mt-1 text-xl font-black tracking-tight">
                Marketplace
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                List surplus food for sale or verified redistribution.
              </p>
            </div>

            <button
              onClick={() => router.push("/donor/surplus")}
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
            >
              + List Surplus
            </button>

          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1500px] p-6 md:p-10">

            {/* HERO */}
            <section className="relative overflow-hidden rounded-[28px] bg-slate-950 p-7 text-white md:p-9">

              <div className="relative z-10 max-w-2xl">

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  LIVE MARKETPLACE
                </div>

                <h1 className="text-3xl font-black tracking-tight md:text-4xl">
                  Give surplus food a second purpose.
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
                  Connect suitable surplus food with verified organizations
                  and receivers through AAHAR's food recovery marketplace.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">

                  <button
                    onClick={() => router.push("/donor/surplus")}
                    className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-400"
                  >
                    + List Surplus Food
                  </button>

                  <button
                    onClick={() => setFilter("Donation")}
                    className="rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    View Donations
                  </button>

                </div>

              </div>

              <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

            </section>

            {/* STATS */}
            <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              <StatCard
                title="Active Listings"
                value="4"
                subtitle="Currently available"
                icon="◇"
              />

              <StatCard
                title="Food Listed"
                value="44 kg"
                subtitle="Across all listings"
                icon="◫"
              />

              <StatCard
                title="Interested"
                value="7"
                subtitle="Organizations & receivers"
                icon="◎"
              />

              <StatCard
                title="Value Created"
                value="₹1,240"
                subtitle="This month"
                icon="₹"
              />

            </section>

            {/* SEARCH + FILTER */}
            <section className="mt-7">

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                <div>
                  <h3 className="text-lg font-black">
                    Food Marketplace
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Browse your active surplus listings.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                  <div className="relative">

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search food..."
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm outline-none transition focus:border-emerald-400 sm:w-64"
                    />

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                      ⌕
                    </span>

                  </div>

                  <div className="flex gap-2">

                    {["All", "Sale", "Donation"].map((item) => (

                      <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`rounded-xl px-4 py-3 text-xs font-bold transition ${
                          filter === item
                            ? "bg-emerald-600 text-white"
                            : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>

              </div>

            </section>

            {/* LISTINGS */}
            <section className="mt-5">

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {filteredListings.map((item) => (

                  <FoodCard
                    key={item.id}
                    item={item}
                  />

                ))}

              </div>

              {filteredListings.length === 0 && (

                <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                  <p className="font-bold text-slate-700">
                    No listings found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try another search or filter.
                  </p>

                </div>

              )}

            </section>

            {/* HOW MARKETPLACE WORKS */}
            <section className="mt-10">

              <div>
                <h3 className="text-lg font-black">
                  How Marketplace Works
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  From surplus registration to recovery.
                </p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-4">

                <StepCard
                  number="01"
                  title="List"
                  text="Register suitable surplus food with quantity and availability."
                />

                <StepCard
                  number="02"
                  title="Discover"
                  text="Verified organizations and receivers discover available food."
                />

                <StepCard
                  number="03"
                  title="Request"
                  text="Interested receivers can request or reserve suitable listings."
                />

                <StepCard
                  number="04"
                  title="Recover"
                  text="Pickup and transaction details are tracked through AAHAR."
                />

              </div>

            </section>

          </div>

        </main>

      </div>
    </div>
  );
}


/* STAT CARD */

function StatCard({
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


/* FOOD CARD */

function FoodCard({
  item,
}: {
  item: {
    food: string;
    category: string;
    quantity: string;
    price: string;
    type: string;
    availableUntil: string;
    location: string;
    interest: string;
    status: string;
  };
}) {
  const [requested, setRequested] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      {/* IMAGE AREA */}
      <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-orange-50">

        <div className="text-6xl">
          🍲
        </div>

        <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-emerald-700 shadow-sm">
          {item.type}
        </div>

        <div className="absolute right-4 top-4 rounded-full bg-slate-900 px-3 py-1.5 text-[10px] font-bold text-white">
          {item.status}
        </div>

      </div>

      {/* DETAILS */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h4 className="text-base font-black">
              {item.food}
            </h4>

            <p className="mt-1 text-xs text-slate-400">
              {item.category}
            </p>

          </div>

          <p className="text-sm font-black text-emerald-600">
            {item.price}
          </p>

        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">

          <Info
            label="Quantity"
            value={item.quantity}
          />

          <Info
            label="Available until"
            value={item.availableUntil}
          />

          <Info
            label="Location"
            value={item.location}
          />

          <Info
            label="Interest"
            value={item.interest}
          />

        </div>

        <button
          onClick={() => setRequested(!requested)}
          className={`mt-5 w-full rounded-xl px-4 py-3 text-sm font-bold transition ${
            requested
              ? "bg-blue-50 text-blue-700"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {requested ? "Request Sent ✓" : "View / Request"}
        </button>

      </div>

    </div>
  );
}


/* INFO */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">

      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 truncate text-xs font-bold text-slate-700">
        {value}
      </p>

    </div>
  );
}


/* STEP CARD */

function StepCard({
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

        <h4 className="font-black">
          {title}
        </h4>

      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}