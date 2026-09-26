"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", icon: "⌂", route: "/donor" },
  { name: "Demand Prediction", icon: "◈", route: "/donor/demand" },
  { name: "Production Planning", icon: "▤", route: "/donor/production" },
  { name: "Register Surplus", icon: "+", route: "/donor/surplus" },
  {
    name: "Surplus Management",
    icon: "◫",
    route: "/donor/surplus-management",
  },
  { name: "Marketplace", icon: "◇", route: "/donor/marketplace" },
  { name: "Transactions", icon: "↔", route: "/donor/transactions" },
  {
    name: "Organic Recovery",
    icon: "♻",
    route: "/donor/organic-recovery",
  },
  { name: "Impact & ESG", icon: "◒", route: "/donor/impact" },
];

const recoveryItems = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Prepared Meal",
    quantity: "8 kg",
    prepared: "2:15 PM",
    availableUntil: "7:00 PM",
    reason: "No suitable redistribution match",
    condition: "Recovery review",
  },
  {
    id: 2,
    food: "Mixed Vegetable Waste",
    category: "Food Preparation",
    quantity: "6 kg",
    prepared: "3:00 PM",
    availableUntil: "8:00 PM",
    reason: "Not suitable for redistribution",
    condition: "Recovery eligible",
  },
  {
    id: 3,
    food: "Cooked Rice",
    category: "Prepared Meal",
    quantity: "4 kg",
    prepared: "3:40 PM",
    availableUntil: "8:30 PM",
    reason: "Surplus window closing",
    condition: "Review required",
  },
];

const partners = [
  {
    name: "GreenCycle Organics",
    type: "Organic Recovery Partner",
    distance: "12.4 km",
    accepted: "Food scraps • Cooked food • Vegetable waste",
    pickup: "Today • 6:30 PM",
    status: "Available",
  },
  {
    name: "EcoHarvest Recovery",
    type: "Authorized Recovery Partner",
    distance: "18.7 km",
    accepted: "Organic kitchen waste • Food residue",
    pickup: "Today • 7:15 PM",
    status: "Available",
  },
  {
    name: "Urban BioCycle",
    type: "Organic Processing Partner",
    distance: "24.1 km",
    accepted: "Vegetable waste • Food scraps",
    pickup: "Tomorrow • 9:00 AM",
    status: "Available",
  },
];

const history = [
  {
    food: "Fruit & Vegetable Waste",
    quantity: "18 kg",
    partner: "GreenCycle Organics",
    date: "24 Sep 2026",
    status: "Recovered",
  },
  {
    food: "Cooked Food Waste",
    quantity: "11 kg",
    partner: "EcoHarvest Recovery",
    date: "21 Sep 2026",
    status: "Recovered",
  },
  {
    food: "Kitchen Organic Waste",
    quantity: "22 kg",
    partner: "GreenCycle Organics",
    date: "18 Sep 2026",
    status: "Recovered",
  },
];

export default function OrganicRecoveryPage() {
  const router = useRouter();

  const [active, setActive] = useState("Organic Recovery");
  const [selectedItem, setSelectedItem] = useState(recoveryItems[0]);
  const [selectedPartner, setSelectedPartner] = useState(partners[0]);
  const [pickupTime, setPickupTime] = useState("6:30 PM");
  const [scheduled, setScheduled] = useState(false);

  const handleMenuClick = (item: (typeof menu)[number]) => {
    setActive(item.name);
    router.push(item.route);
  };

  const handleSchedule = () => {
    setScheduled(true);
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

            {menu.map((item) => (

              <button
                key={item.name}
                onClick={() => handleMenuClick(item)}
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


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="lg:ml-[250px]">

        {/* TOP BAR */}

        <header className="sticky top-0 z-20 flex h-[82px] items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur md:px-10">

          <div>

            <p className="text-xs font-semibold text-slate-400">
              DONOR / INSTITUTION
            </p>

            <h2 className="mt-1 text-xl font-black tracking-tight">
              Organic Recovery
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


        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}

        <div className="mx-auto max-w-[1500px] p-6 md:p-10">


          {/* INTRO */}

          <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-7">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

              <div>

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">

                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  Responsible Recovery

                </div>

                <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                  Recover surplus that cannot be redistributed.
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  When surplus food has no suitable redistribution match,
                  AAHAR helps connect the material with an appropriate
                  authorized recovery partner.
                </p>

              </div>


              <div className="rounded-2xl bg-emerald-50 px-5 py-4 md:min-w-[190px]">

                <p className="text-xs font-semibold text-emerald-700">
                  Recovery this month
                </p>

                <p className="mt-1 text-3xl font-black text-emerald-700">
                  146 kg
                </p>

                <p className="mt-1 text-[11px] text-emerald-600">
                  Successfully recovered
                </p>

              </div>

            </div>

          </section>


          {/* =====================================================
              SUMMARY CARDS
          ===================================================== */}

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Unmatched Surplus
              </p>

              <p className="mt-3 text-2xl font-black">
                24 kg
              </p>

              <p className="mt-2 text-[11px] text-slate-400">
                Awaiting recovery decision
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Recovery Ready
              </p>

              <p className="mt-3 text-2xl font-black text-emerald-600">
                18 kg
              </p>

              <p className="mt-2 text-[11px] text-slate-400">
                Eligible for partner review
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Pickup Scheduled
              </p>

              <p className="mt-3 text-2xl font-black text-blue-600">
                12 kg
              </p>

              <p className="mt-2 text-[11px] text-slate-400">
                Partner pickup pending
              </p>

            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <p className="text-xs font-semibold text-slate-400">
                Recovery Requests
              </p>

              <p className="mt-3 text-2xl font-black text-violet-600">
                14
              </p>

              <p className="mt-2 text-[11px] text-slate-400">
                Created this month
              </p>

            </div>

          </section>


          {/* =====================================================
              SURPLUS + PARTNERS
          ===================================================== */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">


            {/* SURPLUS REQUIRING RECOVERY */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-start justify-between">

                <div>

                  <h3 className="font-bold">
                    Surplus Requiring Recovery
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Items without a suitable redistribution match
                  </p>

                </div>

                <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600">
                  3 items
                </span>

              </div>


              <div className="mt-5 space-y-3">

                {recoveryItems.map((item) => (

                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setScheduled(false);
                    }}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedItem.id === item.id
                        ? "border-emerald-300 bg-emerald-50/50"
                        : "border-slate-200 hover:border-emerald-200 hover:bg-slate-50"
                    }`}
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xl">
                          🍲
                        </div>

                        <div className="min-w-0">

                          <p className="truncate text-sm font-bold">
                            {item.food}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {item.category} · Prepared {item.prepared}
                          </p>

                        </div>

                      </div>


                      <div className="text-right">

                        <p className="text-sm font-black">
                          {item.quantity}
                        </p>

                        <span className="mt-1 inline-block rounded-md bg-orange-50 px-2 py-1 text-[10px] font-bold text-orange-600">
                          {item.condition}
                        </span>

                      </div>

                    </div>


                    <div className="mt-3 border-t border-slate-100 pt-3">

                      <p className="text-[11px] text-slate-500">
                        {item.reason}
                      </p>

                    </div>

                  </button>

                ))}

              </div>

            </div>


            {/* SELECTED ITEM */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="font-bold">
                    Recovery Assessment
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Selected surplus
                  </p>

                </div>

                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                  Review
                </span>

              </div>


              <div className="mt-5 rounded-xl bg-slate-50 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    🍚
                  </div>

                  <div>

                    <p className="font-bold">
                      {selectedItem.food}
                    </p>

                    <p className="text-xs text-slate-400">
                      {selectedItem.quantity} · {selectedItem.category}
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-5 space-y-3">

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                  <span className="text-xs text-slate-400">
                    Redistribution status
                  </span>

                  <span className="text-xs font-bold text-orange-600">
                    No suitable match
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-slate-100 pb-3">

                  <span className="text-xs text-slate-400">
                    Quantity
                  </span>

                  <span className="text-xs font-bold">
                    {selectedItem.quantity}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-xs text-slate-400">
                    Available until
                  </span>

                  <span className="text-xs font-bold">
                    {selectedItem.availableUntil}
                  </span>

                </div>

              </div>


              <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4">

                <p className="text-xs font-bold text-amber-700">
                  Decision-support notice
                </p>

                <p className="mt-1 text-[11px] leading-5 text-amber-700/80">
                  Recovery eligibility shown by AAHAR is a workflow
                  recommendation and does not certify food safety or
                  suitability for a specific recovery use.
                </p>

              </div>

            </div>

          </section>


          {/* =====================================================
              RECOVERY PARTNERS
          ===================================================== */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

              <div>

                <h3 className="font-bold">
                  Available Recovery Partners
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Select an appropriate partner for the selected surplus
                </p>

              </div>

              <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                3 partners available
              </span>

            </div>


            <div className="mt-5 grid gap-4 lg:grid-cols-3">

              {partners.map((partner) => (

                <button
                  key={partner.name}
                  onClick={() => {
                    setSelectedPartner(partner);
                    setScheduled(false);
                  }}
                  className={`rounded-2xl border p-5 text-left transition ${
                    selectedPartner.name === partner.name
                      ? "border-emerald-400 bg-emerald-50/40 ring-1 ring-emerald-200"
                      : "border-slate-200 hover:border-emerald-200 hover:shadow-sm"
                  }`}
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl">
                      ♻
                    </div>

                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
                      {partner.status}
                    </span>

                  </div>


                  <h4 className="mt-4 text-sm font-bold">
                    {partner.name}
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    {partner.type}
                  </p>


                  <div className="mt-4 space-y-2">

                    <p className="text-xs text-slate-500">
                      📍 {partner.distance}
                    </p>

                    <p className="text-xs leading-5 text-slate-500">
                      ✓ {partner.accepted}
                    </p>

                    <p className="text-xs font-semibold text-slate-600">
                      Pickup: {partner.pickup}
                    </p>

                  </div>


                  <div className="mt-5 border-t border-slate-100 pt-4">

                    <span
                      className={`text-xs font-bold ${
                        selectedPartner.name === partner.name
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                    >
                      {selectedPartner.name === partner.name
                        ? "✓ Selected"
                        : "Select partner →"}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </section>


          {/* =====================================================
              SCHEDULE PICKUP
          ===================================================== */}

          <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.85fr]">


            {/* SCHEDULE */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <div>

                <h3 className="font-bold">
                  Schedule Recovery Pickup
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Create a recovery request for the selected partner
                </p>

              </div>


              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Food
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {selectedItem.food}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedItem.quantity}
                  </p>

                </div>


                <div className="rounded-xl bg-slate-50 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Recovery Partner
                  </p>

                  <p className="mt-2 text-sm font-bold">
                    {selectedPartner.name}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {selectedPartner.distance}
                  </p>

                </div>

              </div>


              <div className="mt-5">

                <label className="text-xs font-bold text-slate-600">
                  Preferred pickup time
                </label>

                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                >
                  <option>6:30 PM</option>
                  <option>7:00 PM</option>
                  <option>7:30 PM</option>
                  <option>8:00 PM</option>
                  <option>Tomorrow • 9:00 AM</option>
                </select>

              </div>


              <button
                onClick={handleSchedule}
                disabled={scheduled}
                className={`mt-5 w-full rounded-xl px-5 py-3 text-sm font-bold text-white transition ${
                  scheduled
                    ? "cursor-default bg-emerald-500"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {scheduled
                  ? "✓ Recovery Pickup Scheduled"
                  : "Schedule Recovery Pickup →"}
              </button>


              {scheduled && (

                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

                  <p className="text-xs font-bold text-emerald-700">
                    Recovery request created
                  </p>

                  <p className="mt-1 text-[11px] text-emerald-600">
                    {selectedItem.quantity} of {selectedItem.food} is
                    scheduled with {selectedPartner.name} for {pickupTime}.
                  </p>

                </div>

              )}

            </div>


            {/* TRACKING */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

              <h3 className="font-bold">
                Recovery Tracking
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Current recovery request
              </p>


              <div className="mt-7 space-y-6">

                <div className="flex gap-4">

                  <div className="relative">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                      ✓
                    </div>

                    <div className="absolute left-1/2 top-9 h-7 w-px -translate-x-1/2 bg-emerald-200" />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Recovery request created
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Surplus submitted for recovery
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="relative">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                      ✓
                    </div>

                    <div className="absolute left-1/2 top-9 h-7 w-px -translate-x-1/2 bg-emerald-200" />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Partner selected
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {selectedPartner.name}
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="relative">

                    <div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      scheduled
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-400"
                    }`}>
                      {scheduled ? "✓" : "3"}
                    </div>

                    <div className="absolute left-1/2 top-9 h-7 w-px -translate-x-1/2 bg-slate-200" />

                  </div>

                  <div>

                    <p className="text-sm font-bold">
                      Pickup scheduled
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {scheduled
                        ? `Pickup at ${pickupTime}`
                        : "Awaiting pickup scheduling"}
                    </p>

                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-400">
                    4
                  </div>

                  <div>

                    <p className="text-sm font-bold text-slate-400">
                      Recovery completed
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Awaiting partner confirmation
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>


          {/* =====================================================
              HISTORY
          ===================================================== */}

          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-bold">
                  Recovery History
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Previously completed recovery activities
                </p>

              </div>

              <button className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                View all →
              </button>

            </div>


            <div className="mt-5 overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b border-slate-100 text-left">

                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Food / Material
                    </th>

                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Quantity
                    </th>

                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Recovery Partner
                    </th>

                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Date
                    </th>

                    <th className="pb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {history.map((item) => (

                    <tr
                      key={`${item.food}-${item.date}`}
                      className="border-b border-slate-50 last:border-0"
                    >

                      <td className="py-4 text-sm font-semibold">
                        {item.food}
                      </td>

                      <td className="py-4 text-sm font-bold">
                        {item.quantity}
                      </td>

                      <td className="py-4 text-xs text-slate-500">
                        {item.partner}
                      </td>

                      <td className="py-4 text-xs text-slate-500">
                        {item.date}
                      </td>

                      <td className="py-4">

                        <span className="rounded-md bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-600">
                          ✓ {item.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>


          {/* =====================================================
              FOOT NOTE
          ===================================================== */}

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">

            <p className="text-[11px] leading-5 text-slate-500">
              <span className="font-bold text-slate-700">
                AAHAR Recovery Workflow:
              </span>{" "}
              Surplus that cannot be appropriately redistributed can be
              routed through the recovery workflow to an available partner.
              Actual recovery suitability and handling remain subject to
              the partner's accepted materials and applicable requirements.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}