"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RequestItem = {
  id: number;
  food: string;
  quantity: string;
  donor: string;
  distance: string;
  requestedOn: string;
  status: "Pending" | "Approved" | "Pickup Ready" | "Completed";
  pickupTime: string;
};

const initialRequests: RequestItem[] = [
  {
    id: 1,
    food: "Vegetable Rice",
    quantity: "10 kg",
    donor: "Donor Kitchen",
    distance: "2.4 km",
    requestedOn: "Today, 2:10 PM",
    status: "Approved",
    pickupTime: "Today, 5:30 PM",
  },
  {
    id: 2,
    food: "Dal Tadka",
    quantity: "8 kg",
    donor: "Central Institution Kitchen",
    distance: "3.7 km",
    requestedOn: "Today, 1:45 PM",
    status: "Pickup Ready",
    pickupTime: "Today, 6:00 PM",
  },
  {
    id: 3,
    food: "Chapati",
    quantity: "35 pcs",
    donor: "Campus Dining Unit",
    distance: "5.1 km",
    requestedOn: "Today, 12:30 PM",
    status: "Pending",
    pickupTime: "Awaiting confirmation",
  },
  {
    id: 4,
    food: "Curd Rice",
    quantity: "8 kg",
    donor: "University Food Unit",
    distance: "4.3 km",
    requestedOn: "Yesterday, 6:20 PM",
    status: "Completed",
    pickupTime: "Yesterday, 7:00 PM",
  },
];

const menu = [
  { name: "Dashboard", icon: "⌂", route: "/ngo" },
  { name: "Nearby Surplus", icon: "◇", route: "/ngo/surplus" },
  { name: "Smart Matches", icon: "✦", route: "/ngo/matches" },
  { name: "Requests", icon: "▣", route: "/ngo/requests" },
  { name: "Pickup Management", icon: "↔", route: "/ngo/pickups" },
  { name: "Impact & Distribution", icon: "◒", route: "/ngo/impact" },
];

export default function RequestsPage() {
  const router = useRouter();

  const [requests, setRequests] =
    useState<RequestItem[]>(initialRequests);

  const [filter, setFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] =
    useState<RequestItem | null>(null);

  const filteredRequests = requests.filter((item) => {
    if (filter === "Active") {
      return (
        item.status === "Pending" ||
        item.status === "Approved" ||
        item.status === "Pickup Ready"
      );
    }

    if (filter === "Pending") {
      return item.status === "Pending";
    }

    if (filter === "Pickup Ready") {
      return item.status === "Pickup Ready";
    }

    if (filter === "Completed") {
      return item.status === "Completed";
    }

    return true;
  });

  const cancelRequest = (id: number) => {
    setRequests((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setSelectedRequest(null);
  };

  const getStatusStyle = (status: RequestItem["status"]) => {
    if (status === "Pending") {
      return "bg-[#fff5df] text-[#967034]";
    }

    if (status === "Approved") {
      return "bg-[#eaf3e7] text-[#477044]";
    }

    if (status === "Pickup Ready") {
      return "bg-[#e7f1f5] text-[#426c7c]";
    }

    return "bg-[#eeeeeb] text-[#687068]";
  };

  return (
    <div className="min-h-screen bg-[#f6f7f3] text-[#20251f]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="w-[225px] shrink-0 bg-[#172019] text-white">
          <div className="flex h-full flex-col">

            {/* LOGO */}
            <div className="border-b border-white/10 px-5 py-5">
              <div className="text-[22px] font-bold tracking-tight">
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

            {/* MENU */}
            <nav className="mt-6 flex-1 px-3">

              <p className="px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#718071]">
                Workspace
              </p>

              <div className="space-y-1">

                {menu.map((item) => {
                  const active =
                    item.route === "/ngo/requests";

                  return (
                    <button
                      key={item.name}
                      onClick={() =>
                        router.push(item.route)
                      }
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] transition ${
                        active
                          ? "bg-[#d7e8d2] font-semibold text-[#172019]"
                          : "text-[#c1cbc1] hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span className="w-4 text-center text-[14px]">
                        {item.icon}
                      </span>

                      <span>{item.name}</span>
                    </button>
                  );
                })}

              </div>
            </nav>

            {/* LOCATION */}
            <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-white/[0.04] p-3">

              <div className="flex items-center gap-2">

                <span className="text-sm">
                  ⌖
                </span>

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
                  router.push("/signin?role=ngo")
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#b7c1b7] transition hover:bg-white/[0.06] hover:text-white"
              >
                <span>↪</span>
                Sign out
              </button>

            </div>

          </div>
        </aside>

        {/* MAIN */}
        <main className="min-w-0 flex-1">

          {/* TOP BAR */}
          <header className="flex h-[68px] items-center justify-between border-b border-[#e1e5dc] bg-white px-7">

            <div>

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#879186]">
                NGO / Verified Organization
              </p>

              <p className="mt-1 text-xs text-[#667066]">
                Track your food requests and donor responses
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-lg border border-[#d8e5d4] bg-[#f0f6ed] px-3 py-2 text-[10px] text-[#477044]">
                {requests.length} Total Requests
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcebd7] text-xs font-bold text-[#31522f]">
                VO
              </div>

            </div>

          </header>

          {/* CONTENT */}
          <div className="mx-auto max-w-[1350px] px-6 py-7">

            {/* HEADER */}
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">

              <div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#789076]">
                  Request Management
                </p>

                <h1 className="mt-1 text-[28px] font-bold tracking-tight">
                  Food Requests
                </h1>

                <p className="mt-1 max-w-[650px] text-[12px] leading-5 text-[#697269]">
                  Manage food requests submitted to institutional
                  kitchens and track their confirmation and pickup status.
                </p>

              </div>

              {/* SUMMARY */}
              <div className="grid grid-cols-3 gap-2">

                <div className="rounded-xl border border-[#e1e5dc] bg-white px-4 py-3">

                  <p className="text-[9px] uppercase tracking-wide text-[#899189]">
                    Active
                  </p>

                  <p className="mt-1 text-[19px] font-bold text-[#315d31]">
                    {
                      requests.filter(
                        (r) =>
                          r.status !== "Completed"
                      ).length
                    }
                  </p>

                </div>

                <div className="rounded-xl border border-[#e1e5dc] bg-white px-4 py-3">

                  <p className="text-[9px] uppercase tracking-wide text-[#899189]">
                    Ready
                  </p>

                  <p className="mt-1 text-[19px] font-bold text-[#426c7c]">
                    {
                      requests.filter(
                        (r) =>
                          r.status === "Pickup Ready"
                      ).length
                    }
                  </p>

                </div>

                <div className="rounded-xl border border-[#e1e5dc] bg-white px-4 py-3">

                  <p className="text-[9px] uppercase tracking-wide text-[#899189]">
                    Completed
                  </p>

                  <p className="mt-1 text-[19px] font-bold text-[#687068]">
                    {
                      requests.filter(
                        (r) =>
                          r.status === "Completed"
                      ).length
                    }
                  </p>

                </div>

              </div>

            </div>

            {/* STATUS FLOW */}
            <div className="mt-6 rounded-2xl border border-[#e1e5dc] bg-white p-5">

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">

                <div className="flex items-center gap-3 rounded-xl bg-[#fff9ed] p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fff0c9] text-sm">
                    1
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold">
                      Request Sent
                    </p>

                    <p className="text-[9px] text-[#8a8d85]">
                      Awaiting donor
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#f0f6ed] p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dcebd7] text-sm text-[#477044]">
                    2
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold">
                      Approved
                    </p>

                    <p className="text-[9px] text-[#8a8d85]">
                      Donor confirmed
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#eff6f8] p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d9eaf0] text-sm text-[#426c7c]">
                    3
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold">
                      Pickup Ready
                    </p>

                    <p className="text-[9px] text-[#8a8d85]">
                      Collect food
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-[#f3f3f0] p-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6e6e1] text-sm text-[#687068]">
                    4
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold">
                      Completed
                    </p>

                    <p className="text-[9px] text-[#8a8d85]">
                      Food received
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* FILTERS */}
            <div className="mt-6 flex flex-wrap items-center gap-2">

              <span className="mr-2 text-[11px] font-semibold text-[#657065]">
                Show:
              </span>

              {[
                ["All", "All Requests"],
                ["Active", "Active"],
                ["Pending", "Pending"],
                ["Pickup Ready", "Pickup Ready"],
                ["Completed", "Completed"],
              ].map(([value, label]) => (

                <button
                  key={value}
                  onClick={() => setFilter(value)}
                  className={`rounded-full px-3 py-1.5 text-[10px] font-semibold transition ${
                    filter === value
                      ? "bg-[#315d31] text-white"
                      : "border border-[#dfe4dc] bg-white text-[#657065] hover:bg-[#f2f5f0]"
                  }`}
                >
                  {label}
                </button>

              ))}

            </div>

            {/* REQUEST LIST */}
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_0.75fr]">

              {/* LIST */}
              <div className="space-y-3">

                {filteredRequests.map((item) => (

                  <div
                    key={item.id}
                    className={`rounded-2xl border bg-white p-4 transition ${
                      selectedRequest?.id === item.id
                        ? "border-[#9ab895] shadow-[0_5px_20px_rgba(54,90,50,0.08)]"
                        : "border-[#e1e5dc] hover:border-[#cbd7c7]"
                    }`}
                  >

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                      {/* FOOD ICON */}
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#edf4ea] text-xl">
                        🍲
                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1">

                        <div className="flex flex-wrap items-center gap-2">

                          <h3 className="text-[14px] font-bold">
                            {item.food}
                          </h3>

                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${getStatusStyle(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <p className="mt-1 text-[10px] text-[#7b847b]">
                          {item.donor}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">

                          <div>
                            <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Quantity
                            </span>

                            <p className="text-[11px] font-semibold">
                              {item.quantity}
                            </p>
                          </div>

                          <div>
                            <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Distance
                            </span>

                            <p className="text-[11px] font-semibold">
                              {item.distance}
                            </p>
                          </div>

                          <div>
                            <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                              Requested
                            </span>

                            <p className="text-[11px] font-semibold">
                              {item.requestedOn}
                            </p>
                          </div>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="flex shrink-0 items-center gap-2">

                        <button
                          onClick={() =>
                            setSelectedRequest(item)
                          }
                          className="rounded-lg border border-[#dce2d9] px-3 py-2 text-[10px] font-semibold text-[#566056] hover:bg-[#f7f9f5]"
                        >
                          View Details
                        </button>

                        {item.status === "Pending" && (
                          <button
                            onClick={() =>
                              cancelRequest(item.id)
                            }
                            className="rounded-lg border border-[#eadbd6] px-3 py-2 text-[10px] font-semibold text-[#976a5b] hover:bg-[#fbf5f2]"
                          >
                            Cancel
                          </button>
                        )}

                        {item.status === "Pickup Ready" && (
                          <button
                            onClick={() =>
                              router.push("/ngo/pickups")
                            }
                            className="rounded-lg bg-[#315d31] px-3 py-2 text-[10px] font-semibold text-white"
                          >
                            Pickup
                          </button>
                        )}

                      </div>

                    </div>

                  </div>

                ))}

                {filteredRequests.length === 0 && (

                  <div className="rounded-2xl border border-dashed border-[#d6ddd3] bg-white px-6 py-14 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3eb] text-xl">
                      ▣
                    </div>

                    <h3 className="mt-4 text-sm font-semibold">
                      No requests found
                    </h3>

                    <p className="mt-1 text-[11px] text-[#899189]">
                      There are no requests matching this filter.
                    </p>

                  </div>

                )}

              </div>

              {/* DETAILS PANEL */}
              <div className="xl:sticky xl:top-5 xl:self-start">

                <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                  {selectedRequest ? (

                    <>

                      <div className="flex items-start justify-between">

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b9278]">
                            Request Details
                          </p>

                          <h2 className="mt-1 text-[20px] font-bold">
                            {selectedRequest.food}
                          </h2>

                        </div>

                        <button
                          onClick={() =>
                            setSelectedRequest(null)
                          }
                          className="text-lg text-[#8a9389]"
                        >
                          ×
                        </button>

                      </div>

                      {/* STATUS */}
                      <div className="mt-5 rounded-xl bg-[#f1f6ee] p-4">

                        <div className="flex items-center justify-between">

                          <div>

                            <p className="text-[9px] uppercase tracking-wide text-[#7b8878]">
                              Current Status
                            </p>

                            <p className="mt-1 text-[15px] font-bold text-[#315d31]">
                              {selectedRequest.status}
                            </p>

                          </div>

                          <span
                            className={`rounded-full px-3 py-1.5 text-[9px] font-semibold ${getStatusStyle(
                              selectedRequest.status
                            )}`}
                          >
                            {selectedRequest.status}
                          </span>

                        </div>

                      </div>

                      {/* DETAILS */}
                      <div className="mt-5 grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-[#e7ebe4] p-3">

                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Donor
                          </p>

                          <p className="mt-1 text-[11px] font-semibold">
                            {selectedRequest.donor}
                          </p>

                        </div>

                        <div className="rounded-xl border border-[#e7ebe4] p-3">

                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Quantity
                          </p>

                          <p className="mt-1 text-[11px] font-semibold">
                            {selectedRequest.quantity}
                          </p>

                        </div>

                        <div className="rounded-xl border border-[#e7ebe4] p-3">

                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Distance
                          </p>

                          <p className="mt-1 text-[11px] font-semibold">
                            {selectedRequest.distance}
                          </p>

                        </div>

                        <div className="rounded-xl border border-[#e7ebe4] p-3">

                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Requested
                          </p>

                          <p className="mt-1 text-[11px] font-semibold">
                            {selectedRequest.requestedOn}
                          </p>

                        </div>

                      </div>

                      {/* PICKUP */}
                      <div className="mt-5 rounded-xl border border-[#e3e8e0] bg-[#fafbf9] p-4">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7d887d]">
                          Pickup Information
                        </p>

                        <div className="mt-3 flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f0e3] text-[#477044]">
                            ↔
                          </div>

                          <div>

                            <p className="text-[10px] font-semibold">
                              Pickup Time
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#818981]">
                              {selectedRequest.pickupTime}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* ACTION */}
                      {selectedRequest.status ===
                        "Pickup Ready" && (

                        <button
                          onClick={() =>
                            router.push("/ngo/pickups")
                          }
                          className="mt-5 w-full rounded-xl bg-[#315d31] py-3 text-[11px] font-semibold text-white hover:bg-[#274d28]"
                        >
                          Manage Pickup
                        </button>

                      )}

                      {selectedRequest.status ===
                        "Pending" && (

                        <button
                          onClick={() =>
                            cancelRequest(
                              selectedRequest.id
                            )
                          }
                          className="mt-5 w-full rounded-xl border border-[#eadbd6] py-3 text-[11px] font-semibold text-[#976a5b]"
                        >
                          Cancel Request
                        </button>

                      )}

                    </>

                  ) : (

                    <div className="flex min-h-[400px] flex-col items-center justify-center text-center">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ea] text-xl">
                        ▣
                      </div>

                      <h3 className="mt-4 text-[14px] font-semibold">
                        Select a request
                      </h3>

                      <p className="mt-2 max-w-[250px] text-[10px] leading-5 text-[#899189]">
                        Select any request to view its status,
                        donor information and pickup details.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* FOOTNOTE */}
            <div className="mt-7 border-t border-[#e0e5dd] pt-4">

              <p className="text-[9px] leading-4 text-[#929a92]">
                Request statuses shown here are prototype data. In
                the integrated version, status changes will be synced
                between NGO, donor and pickup workflows through the
                backend.
              </p>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}