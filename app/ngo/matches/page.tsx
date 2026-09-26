"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type Match = {
  id: number;
  food: string;
  category: string;
  quantity: string;
  required: string;
  donor: string;
  latitude: number;
  longitude: number;
  matchScore: number;
  availableUntil: string;
  freshness: string;
  reason: string;
  distance?: number;
};

const matches: Match[] = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Rice & Meals",
    quantity: "12 kg",
    required: "10 kg",
    donor: "Donor Kitchen",
    latitude: 12.3052,
    longitude: 76.6552,
    matchScore: 94,
    availableUntil: "7:00 PM",
    freshness: "Good",
    reason:
      "Quantity closely matches your requirement and the donor is nearby.",
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Curries",
    quantity: "8 kg",
    required: "8 kg",
    donor: "Central Institution Kitchen",
    latitude: 12.3021,
    longitude: 76.6394,
    matchScore: 91,
    availableUntil: "7:30 PM",
    freshness: "Good",
    reason:
      "Exact quantity match with suitable availability and short pickup distance.",
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery & Bread",
    quantity: "40 pcs",
    required: "35 pcs",
    donor: "Campus Dining Unit",
    latitude: 12.3174,
    longitude: 76.6498,
    matchScore: 87,
    availableUntil: "8:00 PM",
    freshness: "Good",
    reason:
      "Available quantity covers your requirement with a manageable pickup distance.",
  },
  {
    id: 4,
    food: "Curd Rice",
    category: "Rice & Meals",
    quantity: "10 kg",
    required: "8 kg",
    donor: "University Food Unit",
    latitude: 12.3149,
    longitude: 76.6368,
    matchScore: 84,
    availableUntil: "6:45 PM",
    freshness: "Good",
    reason:
      "Strong quantity match with good freshness and nearby availability.",
  },
  {
    id: 5,
    food: "Mixed Vegetable Curry",
    category: "Curries",
    quantity: "6 kg",
    required: "7 kg",
    donor: "Green Campus Kitchen",
    latitude: 12.329,
    longitude: 76.654,
    matchScore: 78,
    availableUntil: "7:15 PM",
    freshness: "Good",
    reason:
      "Partial quantity match; additional food may be required to fulfil demand.",
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

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export default function SmartMatchesPage() {
  const router = useRouter();

  const [userLocation, setUserLocation] =
    useState<Coordinates | null>(null);

  const [locationStatus, setLocationStatus] = useState(
    "Detecting your location..."
  );

  const [locationError, setLocationError] = useState(false);

  const [selectedMatch, setSelectedMatch] =
    useState<Match | null>(null);

  const [requested, setRequested] = useState<number[]>([]);

  /*
   * GET NGO LOCATION
   */
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported");
      setLocationError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationStatus("Location detected");
        setLocationError(false);
      },
      () => {
        setLocationStatus("Location permission denied");
        setLocationError(true);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, []);

  /*
   * CALCULATE REAL DISTANCES
   */
  const matchesWithDistance = useMemo(() => {
    if (!userLocation) {
      return [];
    }

    return matches
      .map((item) => ({
        ...item,
        distance: calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          item.latitude,
          item.longitude
        ),
      }))
      /*
       * IMPORTANT:
       * SMART MATCHES ONLY SHOW FOOD WITHIN 2 KM
       */
      .filter((item) => item.distance <= 2)
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  const requestFood = (id: number) => {
    setRequested((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f7f3] text-[#20251f]">
      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="w-[225px] shrink-0 bg-[#172019] text-white">
          <div className="flex h-full flex-col">

            <div className="border-b border-white/10 px-5 py-5">
              <div className="text-[22px] font-bold">
                AAHAR
              </div>

              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#a9b8a9]">
                Sustainable Food Network
              </div>
            </div>

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

            <nav className="mt-6 flex-1 px-3">

              <p className="px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#718071]">
                Workspace
              </p>

              <div className="space-y-1">

                {menu.map((item) => {
                  const active =
                    item.route === "/ngo/matches";

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

            <div className="border-t border-white/10 p-3">

              <button
                onClick={() =>
                  router.push("/signin?role=ngo")
                }
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[12px] text-[#b7c1b7] hover:bg-white/[0.06] hover:text-white"
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
                Smart food recommendations within your pickup range
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div
                className={`rounded-lg border px-3 py-2 text-[10px] ${
                  locationError
                    ? "border-[#ead9d2] bg-[#faf4f1] text-[#9a6656]"
                    : userLocation
                    ? "border-[#d8e5d4] bg-[#f0f6ed] text-[#477044]"
                    : "border-[#e2e6df] bg-[#fafbf9] text-[#687267]"
                }`}
              >
                {userLocation
                  ? "⌖ Location detected"
                  : "⌖ " + locationStatus}
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
                  Intelligent Matching
                </p>

                <h1 className="mt-1 text-[28px] font-bold tracking-tight">
                  Smart Matches
                </h1>

                <p className="mt-1 max-w-[680px] text-[12px] leading-5 text-[#697269]">
                  AAHAR recommends suitable surplus food available
                  within 2 km of your current location.
                </p>

              </div>

              {/* 2 KM RULE */}
              <div className="rounded-xl border border-[#dce5d8] bg-[#f0f6ed] px-4 py-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#477044]">
                    ⌖
                  </div>

                  <div>

                    <p className="text-[10px] text-[#71806f]">
                      Matching Radius
                    </p>

                    <p className="text-[18px] font-bold text-[#31522f]">
                      2 km
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* LOCATION STATUS */}
            <div className="mt-6 rounded-xl border border-[#dce5d8] bg-white px-4 py-3">

              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e8f2e5] text-[#477044]">
                    ⌖
                  </div>

                  <div>

                    <p className="text-[11px] font-semibold">
                      {userLocation
                        ? "Using your current location"
                        : locationStatus}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#858e85]">
                      Only surplus food within 2.0 km is shown here.
                    </p>

                  </div>

                </div>

                {locationError && (
                  <button
                    onClick={() =>
                      window.location.reload()
                    }
                    className="rounded-lg bg-[#315d31] px-3 py-2 text-[10px] font-semibold text-white"
                  >
                    Enable Location
                  </button>
                )}

              </div>

            </div>

            {/* MATCHING LOGIC */}
            <div className="mt-5 rounded-2xl border border-[#e1e5dc] bg-white p-5">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                <div className="shrink-0">

                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#789076]">
                    Matching Logic
                  </p>

                  <h2 className="mt-1 text-[16px] font-bold">
                    Nearby food recommendations
                  </h2>

                </div>

                <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">

                  <div className="rounded-xl bg-[#f5f7f3] p-3">

                    <div className="text-sm">
                      ⌖
                    </div>

                    <p className="mt-2 text-[10px] font-semibold">
                      Within 2 km
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#818981]">
                      Only nearby donors are considered.
                    </p>

                  </div>

                  <div className="rounded-xl bg-[#f5f7f3] p-3">

                    <div className="text-sm">
                      📦
                    </div>

                    <p className="mt-2 text-[10px] font-semibold">
                      Requirement Fit
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#818981]">
                      Quantity is compared with NGO demand.
                    </p>

                  </div>

                  <div className="rounded-xl bg-[#eaf3e7] p-3">

                    <div className="text-sm text-[#477044]">
                      ✦
                    </div>

                    <p className="mt-2 text-[10px] font-semibold">
                      Match Score
                    </p>

                    <p className="mt-1 text-[9px] leading-4 text-[#667566]">
                      Distance, quantity and availability.
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* RESULT HEADER */}
            <div className="mt-7 flex items-end justify-between">

              <div>

                <h2 className="text-[15px] font-bold">
                  Recommended Matches
                </h2>

                <p className="mt-0.5 text-[10px] text-[#899189]">
                  {userLocation
                    ? `${matchesWithDistance.length} matches found within 2 km`
                    : "Waiting for location..."}
                </p>

              </div>

              <div className="rounded-full bg-[#e8f2e5] px-3 py-1.5 text-[10px] font-semibold text-[#477044]">
                ≤ 2 km only
              </div>

            </div>

            {/* MATCH LIST */}
            <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_0.75fr]">

              <div className="space-y-3">

                {!userLocation ? (

                  <div className="rounded-2xl border border-[#e1e5dc] bg-white px-6 py-14 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#edf4ea] text-xl">
                      ⌖
                    </div>

                    <h3 className="mt-4 text-sm font-semibold">
                      Detecting your location
                    </h3>

                    <p className="mt-1 text-[11px] text-[#899189]">
                      Smart Matches will appear once your location
                      is available.
                    </p>

                  </div>

                ) : matchesWithDistance.length === 0 ? (

                  <div className="rounded-2xl border border-dashed border-[#d6ddd3] bg-white px-6 py-14 text-center">

                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3eb] text-xl">
                      ✦
                    </div>

                    <h3 className="mt-4 text-sm font-semibold">
                      No smart matches within 2 km
                    </h3>

                    <p className="mx-auto mt-1 max-w-[380px] text-[11px] leading-5 text-[#899189]">
                      There is currently no registered surplus
                      food within your 2 km matching radius.
                    </p>

                  </div>

                ) : (

                  matchesWithDistance.map((item) => {

                    const isRequested =
                      requested.includes(item.id);

                    const isSelected =
                      selectedMatch?.id === item.id;

                    return (

                      <div
                        key={item.id}
                        className={`rounded-2xl border bg-white p-4 transition ${
                          isSelected
                            ? "border-[#9ab895] shadow-[0_5px_20px_rgba(54,90,50,0.08)]"
                            : "border-[#e1e5dc] hover:border-[#cbd7c7]"
                        }`}
                      >

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                          {/* MATCH SCORE */}
                          <div className="flex h-[70px] w-[70px] shrink-0 flex-col items-center justify-center rounded-2xl bg-[#edf4ea]">

                            <span className="text-[19px] font-bold text-[#477044]">
                              {item.matchScore}%
                            </span>

                            <span className="text-[8px] font-semibold uppercase tracking-wide text-[#70806d]">
                              Match
                            </span>

                          </div>

                          {/* FOOD */}
                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-center gap-2">

                              <h3 className="text-[14px] font-bold">
                                {item.food}
                              </h3>

                              <span className="rounded-full bg-[#f0f3ed] px-2 py-0.5 text-[9px] text-[#667166]">
                                {item.category}
                              </span>

                            </div>

                            <p className="mt-1 text-[10px] text-[#7b847b]">
                              {item.donor}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">

                              <div>
                                <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                                  Available
                                </span>

                                <p className="text-[11px] font-semibold">
                                  {item.quantity}
                                </p>
                              </div>

                              <div>
                                <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                                  Needed
                                </span>

                                <p className="text-[11px] font-semibold">
                                  {item.required}
                                </p>
                              </div>

                              <div>
                                <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                                  Distance
                                </span>

                                <p className="text-[11px] font-semibold text-[#315d31]">
                                  {item.distance?.toFixed(2)} km
                                </p>
                              </div>

                              <div>
                                <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                                  Until
                                </span>

                                <p className="text-[11px] font-semibold">
                                  {item.availableUntil}
                                </p>
                              </div>

                            </div>

                          </div>

                          {/* ACTIONS */}
                          <div className="flex shrink-0 items-center gap-2">

                            <button
                              onClick={() =>
                                setSelectedMatch(item)
                              }
                              className="rounded-lg border border-[#dce2d9] px-3 py-2 text-[10px] font-semibold text-[#566056] hover:bg-[#f7f9f5]"
                            >
                              Details
                            </button>

                            <button
                              onClick={() =>
                                requestFood(item.id)
                              }
                              disabled={isRequested}
                              className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                                isRequested
                                  ? "bg-[#e8eee5] text-[#658060]"
                                  : "bg-[#315d31] text-white hover:bg-[#274d28]"
                              }`}
                            >
                              {isRequested
                                ? "Requested ✓"
                                : "Request"}
                            </button>

                          </div>

                        </div>

                      </div>
                    );
                  })
                )}

              </div>

              {/* DETAILS */}
              <div className="xl:sticky xl:top-5 xl:self-start">

                <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                  {selectedMatch ? (

                    <>

                      <div className="flex items-start justify-between">

                        <div>

                          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b9278]">
                            Match Analysis
                          </p>

                          <h2 className="mt-1 text-[20px] font-bold">
                            {selectedMatch.food}
                          </h2>

                        </div>

                        <button
                          onClick={() =>
                            setSelectedMatch(null)
                          }
                          className="text-lg text-[#8a9389]"
                        >
                          ×
                        </button>

                      </div>

                      {/* SCORE */}
                      <div className="mt-5 rounded-xl bg-[#f0f6ed] p-5 text-center">

                        <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#71806f]">
                          Match Score
                        </p>

                        <p className="mt-1 text-[38px] font-bold text-[#315d31]">
                          {selectedMatch.matchScore}%
                        </p>

                        <p className="text-[10px] text-[#71806f]">
                          Within 2 km matching radius
                        </p>

                      </div>

                      {/* DISTANCE */}
                      <div className="mt-5 rounded-xl border border-[#dce8d8] bg-[#fafcf9] p-4">

                        <div className="flex items-center justify-between">

                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f0e3] text-[#477044]">
                              ⌖
                            </div>

                            <div>

                              <p className="text-[10px] font-semibold">
                                Pickup Distance
                              </p>

                              <p className="mt-0.5 text-[10px] text-[#818981]">
                                From your current location
                              </p>

                            </div>

                          </div>

                          <p className="text-[16px] font-bold text-[#315d31]">
                            {selectedMatch.distance?.toFixed(2)} km
                          </p>

                        </div>

                      </div>

                      {/* FACTORS */}
                      <div className="mt-5">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7d887d]">
                          Match Factors
                        </p>

                        <div className="mt-3 space-y-3">

                          <div>

                            <div className="flex justify-between text-[10px]">

                              <span>
                                Quantity Fit
                              </span>

                              <span className="font-semibold">
                                {selectedMatch.required} /{" "}
                                {selectedMatch.quantity}
                              </span>

                            </div>

                            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                              <div
                                className="h-full rounded-full bg-[#6d9869]"
                                style={{
                                  width:
                                    selectedMatch.matchScore >= 90
                                      ? "95%"
                                      : "80%",
                                }}
                              />

                            </div>

                          </div>

                          <div>

                            <div className="flex justify-between text-[10px]">

                              <span>
                                Distance
                              </span>

                              <span className="font-semibold">
                                {selectedMatch.distance?.toFixed(2)} km
                              </span>

                            </div>

                            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                              <div
                                className="h-full rounded-full bg-[#6d9869]"
                                style={{
                                  width: `${Math.max(
                                    10,
                                    100 -
                                      ((selectedMatch.distance ??
                                        2) /
                                        2) *
                                        100
                                  )}%`,
                                }}
                              />

                            </div>

                          </div>

                          <div>

                            <div className="flex justify-between text-[10px]">

                              <span>
                                Availability
                              </span>

                              <span className="font-semibold">
                                {selectedMatch.availableUntil}
                              </span>

                            </div>

                            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#e7ebe4]">

                              <div className="h-full w-[88%] rounded-full bg-[#6d9869]" />

                            </div>

                          </div>

                        </div>

                      </div>

                      {/* REASON */}
                      <div className="mt-5 rounded-xl border border-[#e2e8df] bg-[#fafbf9] p-4">

                        <p className="text-[10px] font-semibold">
                          Why this is recommended
                        </p>

                        <p className="mt-2 text-[10px] leading-5 text-[#727b72]">
                          {selectedMatch.reason}
                        </p>

                      </div>

                      {/* REQUEST */}
                      <button
                        onClick={() =>
                          requestFood(selectedMatch.id)
                        }
                        disabled={requested.includes(
                          selectedMatch.id
                        )}
                        className={`mt-5 w-full rounded-xl py-3 text-[11px] font-semibold ${
                          requested.includes(
                            selectedMatch.id
                          )
                            ? "bg-[#e8eee5] text-[#648060]"
                            : "bg-[#315d31] text-white hover:bg-[#274d28]"
                        }`}
                      >
                        {requested.includes(
                          selectedMatch.id
                        )
                          ? "Request Submitted ✓"
                          : "Request Matched Food"}
                      </button>

                    </>

                  ) : (

                    <div className="flex min-h-[460px] flex-col items-center justify-center text-center">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ea] text-xl">
                        ✦
                      </div>

                      <h3 className="mt-4 text-[14px] font-semibold">
                        Select a match
                      </h3>

                      <p className="mt-2 max-w-[260px] text-[10px] leading-5 text-[#899189]">
                        Select a recommendation to see its
                        distance, quantity fit and match details.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* FOOTNOTE */}
            <div className="mt-7 border-t border-[#e0e5dd] pt-4">

              <p className="text-[9px] leading-4 text-[#929a92]">
                Smart Matches uses the NGO's browser location and
                only considers registered surplus locations within
                a strict 2 km radius. Matching also considers
                quantity and availability. Current recommendations
                use prototype rule-based scoring.
              </p>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}