"use client";

import { useRouter } from "next/navigation";

const menu = [
  {
    name: "Dashboard",
    icon: "⌂",
    route: "/ngo",
  },
  {
    name: "Nearby Surplus",
    icon: "◇",
    route: "/ngo/surplus",
  },
  {
    name: "Smart Matches",
    icon: "✦",
    route: "/ngo/matches",
  },
  {
    name: "Requests",
    icon: "▣",
    route: "/ngo/requests",
  },
  {
    name: "Pickup Management",
    icon: "↔",
    route: "/ngo/pickups",
  },
  {
    name: "Impact & Distribution",
    icon: "◒",
    route: "/ngo/impact",
  },
];

const monthlyData = [
  {
    month: "Apr",
    value: 62,
  },
  {
    month: "May",
    value: 78,
  },
  {
    month: "Jun",
    value: 91,
  },
  {
    month: "Jul",
    value: 108,
  },
  {
    month: "Aug",
    value: 124,
  },
  {
    month: "Sep",
    value: 142,
  },
];

const categoryData = [
  {
    name: "Rice & Meals",
    value: 46,
    percentage: 46,
  },
  {
    name: "Curries",
    value: 24,
    percentage: 24,
  },
  {
    name: "Bakery & Bread",
    value: 18,
    percentage: 18,
  },
  {
    name: "Fruits & Vegetables",
    value: 12,
    percentage: 12,
  },
];

const distributions = [
  {
    id: 1,
    food: "Vegetable Rice",
    quantity: "12 kg",
    beneficiaries: 48,
    donor: "Donor Kitchen",
    location: "Vijayanagar, Mysuru",
    date: "Today",
    status: "Delivered",
  },
  {
    id: 2,
    food: "Dal Tadka",
    quantity: "8 kg",
    beneficiaries: 32,
    donor: "Central Institution Kitchen",
    location: "Kuvempunagar, Mysuru",
    date: "Today",
    status: "Delivered",
  },
  {
    id: 3,
    food: "Chapati",
    quantity: "40 pcs",
    beneficiaries: 20,
    donor: "Campus Dining Unit",
    location: "Hebbal, Mysuru",
    date: "Yesterday",
    status: "Delivered",
  },
  {
    id: 4,
    food: "Curd Rice",
    quantity: "10 kg",
    beneficiaries: 40,
    donor: "University Food Unit",
    location: "Saraswathipuram, Mysuru",
    date: "Yesterday",
    status: "Delivered",
  },
];

export default function ImpactPage() {
  const router = useRouter();

  const totalFood = 142;
  const mealsServed = 568;
  const beneficiaries = 214;
  const completedDeliveries = 38;
  const wastePrevented = 142;

  return (
    <div className="min-h-screen bg-[#f6f7f3] text-[#20251f]">

      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <aside className="w-[225px] shrink-0 bg-[#172019] text-white">

          <div className="flex h-full flex-col">

            {/* LOGO */}

            <div className="border-b border-white/10 px-5 py-5">

              <div className="text-[22px] font-bold">
                AAHAR
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#a9b8a9]">
                Sustainable Food Network
              </div>

            </div>

            {/* PROFILE */}

            <div className="mx-4 mt-5 rounded-xl bg-white/[0.06] p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c7dfc1] text-sm font-bold text-[#172019]">
                  VO
                </div>

                <div>

                  <p className="text-xs font-semibold">
                    Verified Organization
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#a9b8a9]">
                    NGO Partner
                  </p>

                </div>

              </div>

            </div>

            {/* NAVIGATION */}

            <nav className="mt-6 flex-1 px-3">

              <p className="px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#718071]">
                Workspace
              </p>

              <div className="space-y-1">

                {menu.map((item) => {

                  const active =
                    item.route === "/ngo/impact";

                  return (

                    <button
                      key={item.name}
                      onClick={() =>
                        router.push(item.route)
                      }
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] ${
                        active
                          ? "bg-[#d7e8d2] font-semibold text-[#172019]"
                          : "text-[#c1cbc1] hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >

                      <span className="w-4 text-center">
                        {item.icon}
                      </span>

                      {item.name}

                    </button>

                  );

                })}

              </div>

            </nav>

            {/* SERVICE AREA */}

            <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">

              <div className="flex items-center gap-2">

                <span>⌖</span>

                <div>

                  <p className="text-[10px] text-[#829082]">
                    Service Area
                  </p>

                  <p className="text-[11px] font-medium">
                    Mysuru
                  </p>

                </div>

              </div>

            </div>

            {/* SIGN OUT */}

            <div className="border-t border-white/10 p-3">

              <button
                onClick={() =>
                  router.push(
                    "/signin?role=ngo"
                  )
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#b7c1b7] hover:bg-white/[0.06] hover:text-white"
              >

                <span>↪</span>

                Sign out

              </button>

            </div>

          </div>

        </aside>

        {/* =====================================================
            MAIN
        ====================================================== */}

        <main className="min-w-0 flex-1">

          {/* TOP BAR */}

          <header className="flex h-[68px] items-center justify-between border-b border-[#e1e5dc] bg-white px-7">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#879186]">
                NGO / Verified Organization
              </p>

              <p className="mt-1 text-xs text-[#667066]">
                Track the social and environmental impact of
                your food redistribution activities
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-lg border border-[#d8e5d4] bg-[#f0f6ed] px-3 py-2 text-[10px] text-[#477044]">
                ◒ Impact Tracking
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcebd7] text-xs font-bold text-[#31522f]">
                VO
              </div>

            </div>

          </header>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div className="mx-auto max-w-[1350px] px-6 py-7">

            {/* PAGE HEADER */}

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789076]">
                  Social Impact
                </p>

                <h1 className="mt-1 text-[28px] font-bold tracking-tight">
                  Impact & Distribution
                </h1>

                <p className="mt-1 max-w-[680px] text-[12px] leading-5 text-[#697269]">
                  See how much surplus food your organization
                  has helped redistribute and how many people
                  have benefited.
                </p>

              </div>

              <div className="rounded-xl border border-[#dce5d8] bg-[#f0f6ed] px-4 py-3">

                <p className="text-[10px] text-[#71806f]">
                  Reporting Period
                </p>

                <p className="mt-1 text-[12px] font-bold text-[#31522f]">
                  April – September 2026
                </p>

              </div>

            </div>

            {/* =====================================================
                IMPACT STAT CARDS
            ====================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

              {/* FOOD */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2e5] text-[#477044]">
                    ◫
                  </div>

                  <span className="text-[9px] font-semibold uppercase tracking-wide text-[#7f897f]">
                    Food Saved
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  {totalFood}
                  <span className="ml-1 text-[13px] font-medium text-[#7c857c]">
                    kg
                  </span>
                </p>

                <p className="mt-1 text-[10px] text-[#858e85]">
                  Surplus food redistributed
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                  <div className="h-full w-[78%] rounded-full bg-[#6d9869]" />

                </div>

                <p className="mt-2 text-[9px] text-[#6c8069]">
                  +14.6% compared with previous period
                </p>

              </div>

              {/* MEALS */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0eee2] text-[#817649]">
                    ◉
                  </div>

                  <span className="text-[9px] font-semibold uppercase tracking-wide text-[#7f897f]">
                    Meals Served
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  {mealsServed}
                </p>

                <p className="mt-1 text-[10px] text-[#858e85]">
                  Estimated meals supported
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                  <div className="h-full w-[71%] rounded-full bg-[#9c9669]" />

                </div>

                <p className="mt-2 text-[9px] text-[#7e7958]">
                  Based on redistributed quantities
                </p>

              </div>

              {/* BENEFICIARIES */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8eef6] text-[#4f6f91]">
                    ◌
                  </div>

                  <span className="text-[9px] font-semibold uppercase tracking-wide text-[#7f897f]">
                    Beneficiaries
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  {beneficiaries}
                </p>

                <p className="mt-1 text-[10px] text-[#858e85]">
                  People reached through distribution
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                  <div className="h-full w-[64%] rounded-full bg-[#7192b2]" />

                </div>

                <p className="mt-2 text-[9px] text-[#667e98]">
                  Across verified distribution partners
                </p>

              </div>

              {/* DELIVERIES */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0ea] text-[#5d695b]">
                    ✓
                  </div>

                  <span className="text-[9px] font-semibold uppercase tracking-wide text-[#7f897f]">
                    Deliveries
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  {completedDeliveries}
                </p>

                <p className="mt-1 text-[10px] text-[#858e85]">
                  Completed redistribution tasks
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                  <div className="h-full w-[83%] rounded-full bg-[#7b8878]" />

                </div>

                <p className="mt-2 text-[9px] text-[#687267]">
                  Successful delivery completion
                </p>

              </div>

            </div>

            {/* =====================================================
                CHARTS
            ====================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_0.8fr]">

              {/* MONTHLY CHART */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                      Redistribution Trend
                    </p>

                    <h2 className="mt-1 text-[15px] font-bold">
                      Food redistributed by month
                    </h2>

                    <p className="mt-1 text-[10px] text-[#899189]">
                      Total kilograms redistributed through AAHAR
                    </p>

                  </div>

                  <div className="rounded-lg bg-[#f0f6ed] px-3 py-2">

                    <p className="text-[9px] text-[#71806f]">
                      September
                    </p>

                    <p className="text-[14px] font-bold text-[#315d31]">
                      142 kg
                    </p>

                  </div>

                </div>

                {/* BAR CHART */}

                <div className="mt-8 flex h-[230px] items-end justify-between gap-4 border-b border-[#e7ebe4] px-3">

                  {monthlyData.map((item) => {

                    const height =
                      (item.value / 150) * 100;

                    return (

                      <div
                        key={item.month}
                        className="flex h-full flex-1 flex-col items-center justify-end"
                      >

                        <div className="mb-2 text-[9px] font-semibold text-[#667166]">
                          {item.value}
                        </div>

                        <div
                          className="w-full max-w-[52px] rounded-t-lg bg-[#76a371]"
                          style={{
                            height: `${height}%`,
                          }}
                        />

                        <p className="mt-3 text-[9px] font-medium text-[#858e85]">
                          {item.month}
                        </p>

                      </div>

                    );

                  })}

                </div>

              </div>

              {/* CATEGORY */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                  Food Categories
                </p>

                <h2 className="mt-1 text-[15px] font-bold">
                  Redistribution mix
                </h2>

                <p className="mt-1 text-[10px] text-[#899189]">
                  Share of food redistributed
                </p>

                {/* DONUT-STYLE VISUAL */}

                <div className="mt-6 flex justify-center">

                  <div className="relative flex h-[150px] w-[150px] items-center justify-center rounded-full border-[22px] border-[#76a371]">

                    <div className="absolute inset-[-22px] rounded-full border-[22px] border-transparent border-r-[#9ca477] border-b-[#7192b2]" />

                    <div className="text-center">

                      <p className="text-[24px] font-bold">
                        142
                      </p>

                      <p className="text-[9px] text-[#858e85]">
                        Total kg
                      </p>

                    </div>

                  </div>

                </div>

                {/* CATEGORY LIST */}

                <div className="mt-6 space-y-3">

                  {categoryData.map((item) => (

                    <div key={item.name}>

                      <div className="flex items-center justify-between">

                        <span className="text-[10px] font-medium">
                          {item.name}
                        </span>

                        <span className="text-[10px] font-semibold text-[#5d695b]">
                          {item.percentage}%
                        </span>

                      </div>

                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#e8ebe6]">

                        <div
                          className="h-full rounded-full bg-[#76a371]"
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* =====================================================
                ENVIRONMENTAL IMPACT
            ====================================================== */}

            <div className="mt-6 rounded-2xl border border-[#d9e5d5] bg-[#edf5ea] p-5">

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6e896a]">
                    Environmental Impact
                  </p>

                  <h2 className="mt-1 text-[17px] font-bold text-[#31522f]">
                    Keeping surplus food in circulation
                  </h2>

                  <p className="mt-1 max-w-[600px] text-[10px] leading-5 text-[#687968]">
                    Every successful redistribution keeps edible
                    food in use and reduces avoidable organic
                    waste from institutional food operations.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                  <div className="rounded-xl bg-white/80 px-4 py-3 text-center">

                    <p className="text-[18px] font-bold text-[#315d31]">
                      {wastePrevented}
                    </p>

                    <p className="mt-1 text-[9px] text-[#71806f]">
                      kg food diverted
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/80 px-4 py-3 text-center">

                    <p className="text-[18px] font-bold text-[#315d31]">
                      568
                    </p>

                    <p className="mt-1 text-[9px] text-[#71806f]">
                      meals supported
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/80 px-4 py-3 text-center">

                    <p className="text-[18px] font-bold text-[#315d31]">
                      38
                    </p>

                    <p className="mt-1 text-[9px] text-[#71806f]">
                      successful pickups
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =====================================================
                RECENT DISTRIBUTIONS
            ====================================================== */}

            <div className="mt-7">

              <div className="flex items-end justify-between">

                <div>

                  <h2 className="text-[15px] font-bold">
                    Recent Distributions
                  </h2>

                  <p className="mt-0.5 text-[10px] text-[#899189]">
                    Completed food redistribution activities
                  </p>

                </div>

                <button
                  onClick={() =>
                    router.push("/ngo/pickups")
                  }
                  className="text-[10px] font-semibold text-[#477044] hover:underline"
                >
                  View Pickup Management →
                </button>

              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-[#e1e5dc] bg-white">

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[760px]">

                    <thead>

                      <tr className="border-b border-[#e6e9e4] bg-[#f8faf7]">

                        <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-[#858e85]">
                          Food
                        </th>

                        <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-[#858e85]">
                          Quantity
                        </th>

                        <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-[#858e85]">
                          Beneficiaries
                        </th>

                        <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-[#858e85]">
                          Donor
                        </th>

                        <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-[#858e85]">
                          Date
                        </th>

                        <th className="px-5 py-3 text-left text-[9px] font-semibold uppercase tracking-wide text-[#858e85]">
                          Status
                        </th>

                      </tr>

                    </thead>

                    <tbody>

                      {distributions.map(
                        (item) => (

                          <tr
                            key={item.id}
                            className="border-b border-[#edf0eb] last:border-0"
                          >

                            <td className="px-5 py-4">

                              <div>

                                <p className="text-[11px] font-semibold">
                                  {item.food}
                                </p>

                                <p className="mt-0.5 text-[9px] text-[#929a92]">
                                  {item.location}
                                </p>

                              </div>

                            </td>

                            <td className="px-5 py-4 text-[10px] font-semibold">
                              {item.quantity}
                            </td>

                            <td className="px-5 py-4">

                              <span className="text-[10px] font-semibold">
                                {item.beneficiaries}
                              </span>

                              <span className="ml-1 text-[9px] text-[#8a9289]">
                                people
                              </span>

                            </td>

                            <td className="px-5 py-4 text-[10px] text-[#667066]">
                              {item.donor}
                            </td>

                            <td className="px-5 py-4 text-[10px] text-[#667066]">
                              {item.date}
                            </td>

                            <td className="px-5 py-4">

                              <span className="rounded-full bg-[#e8f2e5] px-2.5 py-1 text-[9px] font-semibold text-[#477044]">
                                ✓ {item.status}
                              </span>

                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

            {/* =====================================================
                IMPACT SUMMARY
            ====================================================== */}

            <div className="mt-6 rounded-2xl border border-[#e1e5dc] bg-white p-5">

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                    Impact Summary
                  </p>

                  <h2 className="mt-1 text-[17px] font-bold">
                    Your contribution to AAHAR
                  </h2>

                  <p className="mt-2 max-w-[680px] text-[10px] leading-5 text-[#778077]">
                    Through verified food redistribution,
                    your organization has helped move surplus
                    food from institutional kitchens toward
                    people and organizations that can use it.
                  </p>

                </div>

                <div className="flex shrink-0 items-center gap-3 rounded-xl bg-[#f0f6ed] px-5 py-4">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#477044]">
                    ◒
                  </div>

                  <div>

                    <p className="text-[9px] text-[#71806f]">
                      AAHAR Impact Score
                    </p>

                    <p className="text-[22px] font-bold text-[#315d31]">
                      92
                      <span className="text-[11px] text-[#71806f]">
                        /100
                      </span>
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* FOOTNOTE */}

            <div className="mt-7 border-t border-[#e0e5dd] pt-4">

              <p className="text-[9px] leading-4 text-[#929a92]">
                Impact figures shown in this prototype are
                demonstration data. In the connected version,
                completed distributions, beneficiary counts and
                food quantities will be synchronized through
                Firebase and calculated from actual transactions.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}