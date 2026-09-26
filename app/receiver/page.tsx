"use client";

import { useRouter } from "next/navigation";

const menu = [
  {
    name: "Dashboard",
    icon: "⌂",
    route: "/receiver",
  },
  {
    name: "Marketplace",
    icon: "◇",
    route: "/receiver/marketplace",
  },
  {
    name: "My Requests",
    icon: "▣",
    route: "/receiver/requests",
  },
  {
    name: "Pickup Status",
    icon: "↔",
    route: "/receiver/pickup",
  },
];

const availableFood = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Rice & Meals",
    quantity: "12 kg",
    donor: "Donor Kitchen",
    distance: "1.2 km",
    availableUntil: "7:00 PM",
    price: "₹20/kg",
    status: "Available",
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Curries",
    quantity: "8 kg",
    donor: "Central Institution Kitchen",
    distance: "1.6 km",
    availableUntil: "7:30 PM",
    price: "₹15/kg",
    status: "Available",
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery & Bread",
    quantity: "40 pcs",
    donor: "Campus Dining Unit",
    distance: "1.8 km",
    availableUntil: "8:00 PM",
    price: "₹2/pc",
    status: "Available",
  },
  {
    id: 4,
    food: "Curd Rice",
    category: "Rice & Meals",
    quantity: "10 kg",
    donor: "University Food Unit",
    distance: "1.9 km",
    availableUntil: "6:45 PM",
    price: "₹15/kg",
    status: "Available",
  },
];

const recentRequests = [
  {
    food: "Vegetable Rice",
    quantity: "5 kg",
    donor: "Donor Kitchen",
    status: "Ready for Pickup",
    date: "Today",
  },
  {
    food: "Dal Tadka",
    quantity: "4 kg",
    donor: "Central Institution Kitchen",
    status: "Requested",
    date: "Today",
  },
  {
    food: "Chapati",
    quantity: "20 pcs",
    donor: "Campus Dining Unit",
    status: "Completed",
    date: "Yesterday",
  },
];

export default function ReceiverDashboard() {
  const router = useRouter();

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
                  RC
                </div>

                <div>

                  <p className="text-xs font-semibold">
                    Receiver
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#a9b8a9]">
                    Food Recipient
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
                    item.route === "/receiver";

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

            {/* LOCATION */}

            <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">

              <div className="flex items-center gap-2">

                <span>⌖</span>

                <div>

                  <p className="text-[10px] text-[#829082]">
                    Current Area
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
                    "/signin?role=receiver"
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
                Receiver Portal
              </p>

              <p className="mt-1 text-xs text-[#667066]">
                Discover and access available surplus food
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-lg border border-[#d8e5d4] bg-[#f0f6ed] px-3 py-2 text-[10px] text-[#477044]">
                ⌖ Mysuru
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcebd7] text-xs font-bold text-[#31522f]">
                RC
              </div>

            </div>

          </header>

          {/* =====================================================
              CONTENT
          ====================================================== */}

          <div className="mx-auto max-w-[1350px] px-6 py-7">

            {/* WELCOME */}

            <div className="rounded-2xl bg-[#315d31] p-6 text-white">

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div>

                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c5dcc0]">
                    Welcome to AAHAR
                  </p>

                  <h1 className="mt-2 text-[28px] font-bold">
                    Find food that deserves a purpose.
                  </h1>

                  <p className="mt-2 max-w-[620px] text-[11px] leading-5 text-[#d1dfce]">
                    Discover available surplus food from
                    verified institutional kitchens and
                    food-processing units near you.
                  </p>

                </div>

                <button
                  onClick={() =>
                    router.push(
                      "/receiver/marketplace"
                    )
                  }
                  className="rounded-xl bg-white px-5 py-3 text-[11px] font-semibold text-[#315d31] hover:bg-[#f1f5ef]"
                >
                  Browse Marketplace →
                </button>

              </div>

            </div>

            {/* =====================================================
                STAT CARDS
            ====================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

              {/* AVAILABLE */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f2e5] text-[#477044]">
                    ◇
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Nearby
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  24
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Food listings available
                </p>

              </div>

              {/* REQUESTS */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8eef6] text-[#4f6f91]">
                    ▣
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Active
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  3
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Active requests
                </p>

              </div>

              {/* READY */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff4dc] text-[#956b1c]">
                    ◷
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Pickup
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  1
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Ready for pickup
                </p>

              </div>

              {/* COMPLETED */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-center justify-between">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf0ea] text-[#5d695b]">
                    ✓
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Completed
                  </span>

                </div>

                <p className="mt-5 text-[28px] font-bold">
                  17
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Previous requests
                </p>

              </div>

            </div>

            {/* =====================================================
                NEARBY FOOD
            ====================================================== */}

            <div className="mt-7 flex items-end justify-between">

              <div>

                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                  Nearby Availability
                </p>

                <h2 className="mt-1 text-[16px] font-bold">
                  Available food near you
                </h2>

                <p className="mt-1 text-[10px] text-[#899189]">
                  Surplus food currently available within your
                  service area
                </p>

              </div>

              <button
                onClick={() =>
                  router.push(
                    "/receiver/marketplace"
                  )
                }
                className="text-[10px] font-semibold text-[#477044] hover:underline"
              >
                View Marketplace →
              </button>

            </div>

            {/* FOOD CARDS */}

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

              {availableFood.map((food) => (

                <div
                  key={food.id}
                  className="rounded-2xl border border-[#e1e5dc] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#cbd7c7] hover:shadow-[0_6px_20px_rgba(54,90,50,0.07)]"
                >

                  {/* IMAGE AREA */}

                  <div className="flex h-[115px] items-center justify-center rounded-xl bg-[#eef3e9]">

                    <div className="text-center">

                      <div className="text-3xl">
                        {food.id === 1
                          ? "🍚"
                          : food.id === 2
                          ? "🥘"
                          : food.id === 3
                          ? "🫓"
                          : "🥣"}
                      </div>

                      <p className="mt-2 text-[9px] font-medium text-[#758174]">
                        Surplus food
                      </p>

                    </div>

                  </div>

                  {/* FOOD INFO */}

                  <div className="mt-4">

                    <div className="flex items-start justify-between gap-2">

                      <div>

                        <h3 className="text-[13px] font-bold">
                          {food.food}
                        </h3>

                        <p className="mt-0.5 text-[9px] text-[#899189]">
                          {food.category}
                        </p>

                      </div>

                      <span className="rounded-full bg-[#e8f2e5] px-2 py-1 text-[8px] font-semibold text-[#477044]">
                        {food.status}
                      </span>

                    </div>

                    <div className="mt-4 space-y-2">

                      <div className="flex justify-between">

                        <span className="text-[9px] text-[#8a9289]">
                          Quantity
                        </span>

                        <span className="text-[10px] font-semibold">
                          {food.quantity}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-[9px] text-[#8a9289]">
                          Distance
                        </span>

                        <span className="text-[10px] font-semibold text-[#315d31]">
                          {food.distance}
                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span className="text-[9px] text-[#8a9289]">
                          Available until
                        </span>

                        <span className="text-[10px] font-semibold">
                          {food.availableUntil}
                        </span>

                      </div>

                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#edf0eb] pt-3">

                      <span className="text-[11px] font-bold text-[#315d31]">
                        {food.price}
                      </span>

                      <button
                        onClick={() =>
                          router.push(
                            `/receiver/marketplace?food=${food.id}`
                          )
                        }
                        className="rounded-lg bg-[#315d31] px-3 py-2 text-[9px] font-semibold text-white hover:bg-[#274d28]"
                      >
                        View Food
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* =====================================================
                ACTIVE REQUEST + QUICK ACTIONS
            ====================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_0.65fr]">

              {/* ACTIVE REQUEST */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                      Current Activity
                    </p>

                    <h2 className="mt-1 text-[15px] font-bold">
                      Active Requests
                    </h2>

                  </div>

                  <button
                    onClick={() =>
                      router.push(
                        "/receiver/requests"
                      )
                    }
                    className="text-[10px] font-semibold text-[#477044] hover:underline"
                  >
                    View All
                  </button>

                </div>

                <div className="mt-4 space-y-2">

                  {recentRequests.map(
                    (request, index) => (

                      <div
                        key={index}
                        className="flex flex-col justify-between gap-3 rounded-xl bg-[#f7f9f5] p-3 sm:flex-row sm:items-center"
                      >

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2e5] text-sm">
                            {index === 0
                              ? "🍚"
                              : index === 1
                              ? "🥘"
                              : "🫓"}
                          </div>

                          <div>

                            <p className="text-[11px] font-semibold">
                              {request.food}
                            </p>

                            <p className="mt-0.5 text-[9px] text-[#899189]">
                              {request.quantity} •{" "}
                              {request.donor}
                            </p>

                          </div>

                        </div>

                        <div className="flex items-center gap-3">

                          <span className="text-[9px] text-[#929a92]">
                            {request.date}
                          </span>

                          <span
                            className={`rounded-full px-2.5 py-1 text-[8px] font-semibold ${
                              request.status ===
                              "Completed"
                                ? "bg-[#e8f2e5] text-[#477044]"
                                : request.status ===
                                  "Ready for Pickup"
                                ? "bg-[#fff4dc] text-[#956b1c]"
                                : "bg-[#e8eef6] text-[#4f6f91]"
                            }`}
                          >
                            {request.status}
                          </span>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* QUICK ACTIONS */}

              <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                  Quick Actions
                </p>

                <h2 className="mt-1 text-[15px] font-bold">
                  What would you like to do?
                </h2>

                <div className="mt-5 space-y-2">

                  <button
                    onClick={() =>
                      router.push(
                        "/receiver/marketplace"
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-xl border border-[#dce5d8] bg-[#f5f8f3] p-3 text-left hover:bg-[#edf4ea]"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e1efdd] text-[#477044]">
                      ◇
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold">
                        Browse Marketplace
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#899189]">
                        Find available surplus food
                      </p>

                    </div>

                  </button>

                  <button
                    onClick={() =>
                      router.push(
                        "/receiver/requests"
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-xl border border-[#e1e5dc] bg-white p-3 text-left hover:bg-[#f7f9f5]"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8eef6] text-[#4f6f91]">
                      ▣
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold">
                        My Requests
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#899189]">
                        Track your food requests
                      </p>

                    </div>

                  </button>

                  <button
                    onClick={() =>
                      router.push(
                        "/receiver/pickup"
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-xl border border-[#e1e5dc] bg-white p-3 text-left hover:bg-[#f7f9f5]"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff4dc] text-[#956b1c]">
                      ⌖
                    </div>

                    <div>

                      <p className="text-[10px] font-semibold">
                        Pickup Status
                      </p>

                      <p className="mt-0.5 text-[9px] text-[#899189]">
                        Check your pickup details
                      </p>

                    </div>

                  </button>

                </div>

              </div>

            </div>

            {/* =====================================================
                AAHAR IMPACT
            ====================================================== */}

            <div className="mt-6 rounded-2xl border border-[#d9e5d5] bg-[#edf5ea] p-5">

              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

                <div>

                  <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6e896a]">
                    Your Contribution
                  </p>

                  <h2 className="mt-1 text-[17px] font-bold text-[#31522f]">
                    Every request helps reduce food waste
                  </h2>

                  <p className="mt-1 max-w-[620px] text-[10px] leading-5 text-[#687968]">
                    By accessing surplus food through AAHAR,
                    you help keep edible food in circulation
                    instead of sending it to waste.
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

                  <div className="rounded-xl bg-white/80 px-4 py-3 text-center">

                    <p className="text-[18px] font-bold text-[#315d31]">
                      86
                    </p>

                    <p className="mt-1 text-[9px] text-[#71806f]">
                      kg food accessed
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/80 px-4 py-3 text-center">

                    <p className="text-[18px] font-bold text-[#315d31]">
                      344
                    </p>

                    <p className="mt-1 text-[9px] text-[#71806f]">
                      meals supported
                    </p>

                  </div>

                  <div className="rounded-xl bg-white/80 px-4 py-3 text-center">

                    <p className="text-[18px] font-bold text-[#315d31]">
                      17
                    </p>

                    <p className="mt-1 text-[9px] text-[#71806f]">
                      completed requests
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* FOOTNOTE */}

            <div className="mt-7 border-t border-[#e0e5dd] pt-4">

              <p className="text-[9px] leading-4 text-[#929a92]">
                Receiver dashboard figures are prototype
                demonstration data. In the connected version,
                listings, requests, pickup status and impact
                metrics will be synchronized through Firebase.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}