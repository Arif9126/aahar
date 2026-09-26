"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PickupStatus =
  | "Pickup Ready"
  | "Pickup Started"
  | "Food Collected"
  | "Delivered";

type Pickup = {
  id: number;
  food: string;
  category: string;
  quantity: string;
  donor: string;
  location: string;
  latitude: number;
  longitude: number;
  distance: number;
  availableUntil: string;
  pickupTime: string;
  status: PickupStatus;
  contact: string;
};

const initialPickups: Pickup[] = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Rice & Meals",
    quantity: "12 kg",
    donor: "Donor Kitchen",
    location: "Vijayanagar, Mysuru",
    latitude: 12.3052,
    longitude: 76.6552,
    distance: 1.2,
    availableUntil: "7:00 PM",
    pickupTime: "Today, 6:15 PM",
    status: "Pickup Ready",
    contact: "+91 98765 43210",
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Curries",
    quantity: "8 kg",
    donor: "Central Institution Kitchen",
    location: "Kuvempunagar, Mysuru",
    latitude: 12.3021,
    longitude: 76.6394,
    distance: 1.6,
    availableUntil: "7:30 PM",
    pickupTime: "Today, 6:30 PM",
    status: "Pickup Started",
    contact: "+91 98765 12345",
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery & Bread",
    quantity: "40 pcs",
    donor: "Campus Dining Unit",
    location: "Hebbal, Mysuru",
    latitude: 12.3174,
    longitude: 76.6498,
    distance: 1.8,
    availableUntil: "8:00 PM",
    pickupTime: "Today, 7:00 PM",
    status: "Food Collected",
    contact: "+91 99887 66554",
  },
  {
    id: 4,
    food: "Curd Rice",
    category: "Rice & Meals",
    quantity: "10 kg",
    donor: "University Food Unit",
    location: "Saraswathipuram, Mysuru",
    latitude: 12.3149,
    longitude: 76.6368,
    distance: 1.9,
    availableUntil: "6:45 PM",
    pickupTime: "Today, 5:45 PM",
    status: "Delivered",
    contact: "+91 91234 56789",
  },
];

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

const statusOrder: PickupStatus[] = [
  "Pickup Ready",
  "Pickup Started",
  "Food Collected",
  "Delivered",
];

function getNextStatus(
  status: PickupStatus
): PickupStatus | null {
  const index = statusOrder.indexOf(status);

  if (
    index === -1 ||
    index === statusOrder.length - 1
  ) {
    return null;
  }

  return statusOrder[index + 1];
}

function getActionLabel(status: PickupStatus) {
  switch (status) {
    case "Pickup Ready":
      return "Start Pickup";

    case "Pickup Started":
      return "Mark Collected";

    case "Food Collected":
      return "Mark Delivered";

    case "Delivered":
      return "Completed";
  }
}

function getStatusClass(status: PickupStatus) {
  switch (status) {
    case "Pickup Ready":
      return "bg-[#fff5df] text-[#956b1c]";

    case "Pickup Started":
      return "bg-[#e8f0fb] text-[#496a91]";

    case "Food Collected":
      return "bg-[#e9f3e5] text-[#4d7548]";

    case "Delivered":
      return "bg-[#e7f2e8] text-[#37663c]";
  }
}

export default function PickupManagementPage() {
  const router = useRouter();

  const [pickups, setPickups] =
    useState<Pickup[]>(initialPickups);

  const [selectedPickup, setSelectedPickup] =
    useState<Pickup | null>(null);

  const [filter, setFilter] = useState<
    "All" | PickupStatus
  >("All");

  /*
   * OPEN GOOGLE MAPS DIRECTIONS
   *
   * The donor's latitude and longitude are used
   * as the destination.
   */
  const openDirections = (pickup: Pickup) => {
    const destination = `${pickup.latitude},${pickup.longitude}`;

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${encodeURIComponent(destination)}` +
      `&travelmode=driving`;

    window.open(url, "_blank");
  };

  /*
   * UPDATE PICKUP STATUS
   */
  const updatePickupStatus = (id: number) => {
    setPickups((current) =>
      current.map((pickup) => {
        if (pickup.id !== id) {
          return pickup;
        }

        const nextStatus = getNextStatus(
          pickup.status
        );

        if (!nextStatus) {
          return pickup;
        }

        const updatedPickup = {
          ...pickup,
          status: nextStatus,
        };

        setSelectedPickup((selected) =>
          selected?.id === id
            ? updatedPickup
            : selected
        );

        return updatedPickup;
      })
    );
  };

  /*
   * FILTER PICKUPS
   */
  const filteredPickups = useMemo(() => {
    if (filter === "All") {
      return pickups;
    }

    return pickups.filter(
      (pickup) => pickup.status === filter
    );
  }, [pickups, filter]);

  /*
   * SUMMARY COUNTS
   */
  const readyCount = pickups.filter(
    (item) => item.status === "Pickup Ready"
  ).length;

  const activeCount = pickups.filter(
    (item) =>
      item.status === "Pickup Started" ||
      item.status === "Food Collected"
  ).length;

  const completedCount = pickups.filter(
    (item) => item.status === "Delivered"
  ).length;

  const totalFood = pickups.reduce(
    (total, item) => {
      const number = parseFloat(item.quantity);

      return (
        total +
        (isNaN(number) ? 0 : number)
      );
    },
    0
  );

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
                    item.route === "/ngo/pickups";

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
                Manage your food pickups and deliveries
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-lg border border-[#d8e5d4] bg-[#f0f6ed] px-3 py-2 text-[10px] text-[#477044]">
                ⌖ Mysuru Service Area
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcebd7] text-xs font-bold text-[#31522f]">
                VO
              </div>

            </div>

          </header>

          {/* =====================================================
              PAGE CONTENT
          ====================================================== */}

          <div className="mx-auto max-w-[1350px] px-6 py-7">

            {/* PAGE HEADER */}

            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789076]">
                  Logistics
                </p>

                <h1 className="mt-1 text-[28px] font-bold tracking-tight">
                  Pickup Management
                </h1>

                <p className="mt-1 max-w-[650px] text-[12px] leading-5 text-[#697269]">
                  Track approved food requests from
                  pickup preparation through final
                  delivery.
                </p>

              </div>

              <div className="rounded-xl border border-[#dce5d8] bg-[#f0f6ed] px-4 py-3">

                <p className="text-[10px] text-[#71806f]">
                  Food Scheduled
                </p>

                <p className="mt-1 text-[18px] font-bold text-[#31522f]">
                  {totalFood.toFixed(0)} kg
                </p>

              </div>

            </div>

            {/* =====================================================
                SUMMARY CARDS
            ====================================================== */}

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">

              {/* READY */}

              <div className="rounded-xl border border-[#e1e5dc] bg-white p-4">

                <div className="flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff4dc] text-[#956b1c]">
                    ◷
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Ready
                  </span>

                </div>

                <p className="mt-4 text-[24px] font-bold">
                  {readyCount}
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Ready for pickup
                </p>

              </div>

              {/* ACTIVE */}

              <div className="rounded-xl border border-[#e1e5dc] bg-white p-4">

                <div className="flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e7eef8] text-[#496a91]">
                    ↔
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Active
                  </span>

                </div>

                <p className="mt-4 text-[24px] font-bold">
                  {activeCount}
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Active pickups
                </p>

              </div>

              {/* COMPLETED */}

              <div className="rounded-xl border border-[#e1e5dc] bg-white p-4">

                <div className="flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2e5] text-[#477044]">
                    ✓
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Completed
                  </span>

                </div>

                <p className="mt-4 text-[24px] font-bold">
                  {completedCount}
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Delivered successfully
                </p>

              </div>

              {/* TOTAL */}

              <div className="rounded-xl border border-[#e1e5dc] bg-white p-4">

                <div className="flex items-center justify-between">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf0ea] text-[#5d695b]">
                    ◫
                  </div>

                  <span className="text-[9px] uppercase tracking-wide text-[#929a92]">
                    Total
                  </span>

                </div>

                <p className="mt-4 text-[24px] font-bold">
                  {pickups.length}
                </p>

                <p className="text-[10px] text-[#858e85]">
                  Scheduled pickups
                </p>

              </div>

            </div>

            {/* =====================================================
                PICKUP SCHEDULE HEADER
            ====================================================== */}

            <div className="mt-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>

                <h2 className="text-[15px] font-bold">
                  Pickup Schedule
                </h2>

                <p className="mt-0.5 text-[10px] text-[#899189]">
                  Manage your active food collection
                  tasks
                </p>

              </div>

              {/* FILTERS */}

              <div className="flex flex-wrap gap-2">

                {(
                  [
                    "All",
                    "Pickup Ready",
                    "Pickup Started",
                    "Food Collected",
                    "Delivered",
                  ] as const
                ).map((item) => (

                  <button
                    key={item}
                    onClick={() =>
                      setFilter(item)
                    }
                    className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                      filter === item
                        ? "bg-[#315d31] text-white"
                        : "border border-[#dce2d9] bg-white text-[#667066]"
                    }`}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            {/* =====================================================
                PICKUPS + DETAILS
            ====================================================== */}

            <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_0.75fr]">

              {/* =================================================
                  PICKUP LIST
              ================================================== */}

              <div className="space-y-3">

                {filteredPickups.map((pickup) => {

                  const isSelected =
                    selectedPickup?.id === pickup.id;

                  const nextStatus =
                    getNextStatus(
                      pickup.status
                    );

                  return (

                    <div
                      key={pickup.id}
                      className={`rounded-2xl border bg-white p-5 ${
                        isSelected
                          ? "border-[#9ab895] shadow-[0_5px_20px_rgba(54,90,50,0.08)]"
                          : "border-[#e1e5dc]"
                      }`}
                    >

                      <div className="flex flex-col gap-4">

                        {/* TOP */}

                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">

                          <div className="flex items-start gap-3">

                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#edf4ea] text-[#477044]">
                              ▣
                            </div>

                            <div>

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="text-[14px] font-bold">
                                  {pickup.food}
                                </h3>

                                <span className="rounded-full bg-[#f0f3ed] px-2 py-0.5 text-[9px] text-[#667166]">
                                  {pickup.category}
                                </span>

                              </div>

                              <p className="mt-1 text-[10px] text-[#7b847b]">
                                {pickup.donor}
                              </p>

                            </div>

                          </div>

                          <span
                            className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${getStatusClass(
                              pickup.status
                            )}`}
                          >
                            {pickup.status}
                          </span>

                        </div>

                        {/* INFORMATION */}

                        <div className="grid grid-cols-2 gap-3 rounded-xl bg-[#f7f9f5] p-3 sm:grid-cols-4">

                          <div>

                            <p className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Quantity
                            </p>

                            <p className="mt-1 text-[11px] font-semibold">
                              {pickup.quantity}
                            </p>

                          </div>

                          <div>

                            <p className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Distance
                            </p>

                            <p className="mt-1 text-[11px] font-semibold text-[#315d31]">
                              {pickup.distance.toFixed(
                                1
                              )}{" "}
                              km
                            </p>

                          </div>

                          <div>

                            <p className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Pickup Time
                            </p>

                            <p className="mt-1 text-[11px] font-semibold">
                              {pickup.pickupTime}
                            </p>

                          </div>

                          <div>

                            <p className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Available Until
                            </p>

                            <p className="mt-1 text-[11px] font-semibold">
                              {pickup.availableUntil}
                            </p>

                          </div>

                        </div>

                        {/* LOCATION */}

                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                          <div className="flex items-center gap-2">

                            <span className="text-[#668064]">
                              ⌖
                            </span>

                            <div>

                              <p className="text-[10px] font-semibold">
                                {pickup.location}
                              </p>

                              <p className="mt-0.5 text-[9px] text-[#8a9289]">
                                Pickup location
                              </p>

                            </div>

                          </div>

                          {/* ACTION BUTTONS */}

                          <div className="flex flex-wrap gap-2">

                            {/* NAVIGATE */}

                            <button
                              onClick={() =>
                                openDirections(
                                  pickup
                                )
                              }
                              className="rounded-lg border border-[#cbdcc7] bg-[#f0f6ed] px-3 py-2 text-[10px] font-semibold text-[#315d31] hover:bg-[#e5f0e1]"
                            >
                              ⌖ Navigate
                            </button>

                            {/* DETAILS */}

                            <button
                              onClick={() =>
                                setSelectedPickup(
                                  pickup
                                )
                              }
                              className="rounded-lg border border-[#dce2d9] px-3 py-2 text-[10px] font-semibold text-[#566056] hover:bg-[#f7f9f5]"
                            >
                              View Details
                            </button>

                            {/* STATUS */}

                            {nextStatus && (

                              <button
                                onClick={() =>
                                  updatePickupStatus(
                                    pickup.id
                                  )
                                }
                                className="rounded-lg bg-[#315d31] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#274d28]"
                              >
                                {getActionLabel(
                                  pickup.status
                                )}
                              </button>

                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  );
                })}

                {/* EMPTY STATE */}

                {filteredPickups.length === 0 && (

                  <div className="rounded-2xl border border-dashed border-[#d6ddd3] bg-white px-6 py-14 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf4ea] text-xl">
                      ✓
                    </div>

                    <h3 className="mt-4 text-sm font-semibold">
                      No pickups in this category
                    </h3>

                    <p className="mt-1 text-[10px] text-[#899189]">
                      Pickup activities will appear
                      here as requests move through
                      the workflow.
                    </p>

                  </div>

                )}

              </div>

              {/* =================================================
                  DETAILS PANEL
              ================================================== */}

              <div className="xl:sticky xl:top-5 xl:self-start">

                <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                  {selectedPickup ? (

                    <>

                      {/* TITLE */}

                      <div className="flex items-start justify-between">

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b9278]">
                            Pickup Details
                          </p>

                          <h2 className="mt-1 text-[20px] font-bold">
                            {selectedPickup.food}
                          </h2>

                        </div>

                        <button
                          onClick={() =>
                            setSelectedPickup(
                              null
                            )
                          }
                          className="text-lg text-[#8a9389]"
                        >
                          ×
                        </button>

                      </div>

                      {/* STATUS */}

                      <div className="mt-5 rounded-xl bg-[#f5f8f3] p-4">

                        <p className="text-[9px] uppercase tracking-wide text-[#899389]">
                          Current Status
                        </p>

                        <div className="mt-2 flex items-center justify-between">

                          <span
                            className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${getStatusClass(
                              selectedPickup.status
                            )}`}
                          >
                            {selectedPickup.status}
                          </span>

                          <span className="text-[10px] text-[#7b847b]">
                            {selectedPickup.distance.toFixed(
                              1
                            )}{" "}
                            km
                          </span>

                        </div>

                      </div>

                      {/* PROGRESS */}

                      <div className="mt-6">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7d887d]">
                          Pickup Progress
                        </p>

                        <div className="mt-4 space-y-4">

                          {statusOrder.map(
                            (status, index) => {

                              const currentIndex =
                                statusOrder.indexOf(
                                  selectedPickup.status
                                );

                              const completed =
                                index <=
                                currentIndex;

                              return (

                                <div
                                  key={status}
                                  className="flex items-center gap-3"
                                >

                                  <div
                                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                                      completed
                                        ? "bg-[#315d31] text-white"
                                        : "bg-[#edf0eb] text-[#8b948a]"
                                    }`}
                                  >
                                    {completed
                                      ? "✓"
                                      : index + 1}
                                  </div>

                                  <div>

                                    <p
                                      className={`text-[10px] font-semibold ${
                                        completed
                                          ? "text-[#315d31]"
                                          : "text-[#899189]"
                                      }`}
                                    >
                                      {status}
                                    </p>

                                    <p className="text-[9px] text-[#a0a7a0]">

                                      {status ===
                                      "Pickup Ready"
                                        ? "Ready for collection"
                                        : status ===
                                          "Pickup Started"
                                        ? "On the way to donor"
                                        : status ===
                                          "Food Collected"
                                        ? "Food collected successfully"
                                        : "Delivered to recipient"}

                                    </p>

                                  </div>

                                </div>

                              );
                            }
                          )}

                        </div>

                      </div>

                      {/* PICKUP INFORMATION */}

                      <div className="mt-6 border-t border-[#e5e8e2] pt-5">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7d887d]">
                          Pickup Information
                        </p>

                        <div className="mt-3 space-y-3">

                          <div className="flex justify-between gap-4">

                            <span className="text-[10px] text-[#858e85]">
                              Donor
                            </span>

                            <span className="text-right text-[10px] font-semibold">
                              {selectedPickup.donor}
                            </span>

                          </div>

                          <div className="flex justify-between gap-4">

                            <span className="text-[10px] text-[#858e85]">
                              Quantity
                            </span>

                            <span className="text-[10px] font-semibold">
                              {selectedPickup.quantity}
                            </span>

                          </div>

                          <div className="flex justify-between gap-4">

                            <span className="text-[10px] text-[#858e85]">
                              Location
                            </span>

                            <span className="max-w-[180px] text-right text-[10px] font-semibold">
                              {selectedPickup.location}
                            </span>

                          </div>

                          <div className="flex justify-between gap-4">

                            <span className="text-[10px] text-[#858e85]">
                              Contact
                            </span>

                            <span className="text-[10px] font-semibold">
                              {selectedPickup.contact}
                            </span>

                          </div>

                          <div className="flex justify-between gap-4">

                            <span className="text-[10px] text-[#858e85]">
                              Pickup Time
                            </span>

                            <span className="text-[10px] font-semibold">
                              {selectedPickup.pickupTime}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* GET DIRECTIONS */}

                      <button
                        onClick={() =>
                          openDirections(
                            selectedPickup
                          )
                        }
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#cbdcc7] bg-[#f0f6ed] py-3 text-[11px] font-semibold text-[#315d31] hover:bg-[#e5f0e1]"
                      >
                        ⌖ Get Directions to Pickup
                      </button>

                      {/* STATUS ACTION */}

                      {getNextStatus(
                        selectedPickup.status
                      ) && (

                        <button
                          onClick={() =>
                            updatePickupStatus(
                              selectedPickup.id
                            )
                          }
                          className="mt-3 w-full rounded-xl bg-[#315d31] py-3 text-[11px] font-semibold text-white hover:bg-[#274d28]"
                        >
                          {getActionLabel(
                            selectedPickup.status
                          )}
                        </button>

                      )}

                      {/* COMPLETED */}

                      {selectedPickup.status ===
                        "Delivered" && (

                        <div className="mt-3 rounded-xl border border-[#d7e5d3] bg-[#f0f6ed] p-3 text-center">

                          <p className="text-[10px] font-semibold text-[#477044]">
                            Delivery Completed ✓
                          </p>

                          <p className="mt-1 text-[9px] text-[#71806f]">
                            This pickup has been successfully
                            completed.
                          </p>

                        </div>

                      )}

                    </>

                  ) : (

                    <div className="flex min-h-[520px] flex-col items-center justify-center text-center">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ea] text-xl">
                        ↔
                      </div>

                      <h3 className="mt-4 text-[14px] font-semibold">
                        Select a pickup
                      </h3>

                      <p className="mt-2 max-w-[260px] text-[10px] leading-5 text-[#899189]">
                        Select a pickup to view its
                        location, donor information,
                        navigation and delivery progress.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* FOOTNOTE */}

            <div className="mt-7 border-t border-[#e0e5dd] pt-4">

              <p className="text-[9px] leading-4 text-[#929a92]">
                Pickup Management currently uses prototype
                workflow data. In the connected version,
                approved requests will automatically create
                pickup tasks and status updates will be
                synchronized through Firebase.
              </p>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}