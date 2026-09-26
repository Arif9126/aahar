"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Coordinates = {
  latitude: number;
  longitude: number;
};

type SurplusItem = {
  id: number;
  food: string;
  category: string;
  quantity: string;
  availableUntil: string;
  donor: string;
  freshness: string;
  quality: string;
  description: string;
  latitude: number;
  longitude: number;
  distance?: number;
};

const surplusData: SurplusItem[] = [
  {
    id: 1,
    food: "Vegetable Rice",
    category: "Rice & Meals",
    quantity: "12 kg",
    availableUntil: "7:00 PM",
    donor: "Donor Kitchen",
    freshness: "Good",
    quality: "Suitable",
    description:
      "Freshly prepared vegetable rice available for redistribution. Best suited for immediate distribution.",
    latitude: 12.3052,
    longitude: 76.6552,
  },
  {
    id: 2,
    food: "Dal Tadka",
    category: "Curries",
    quantity: "8 kg",
    availableUntil: "7:30 PM",
    donor: "Central Institution Kitchen",
    freshness: "Good",
    quality: "Suitable",
    description:
      "Prepared dal available in surplus. Suitable for nearby community distribution.",
    latitude: 12.3021,
    longitude: 76.6394,
  },
  {
    id: 3,
    food: "Chapati",
    category: "Bakery & Bread",
    quantity: "40 pcs",
    availableUntil: "8:00 PM",
    donor: "Campus Dining Unit",
    freshness: "Good",
    quality: "Suitable",
    description:
      "Fresh chapatis available for pickup. Recommended for same-day redistribution.",
    latitude: 12.3174,
    longitude: 76.6498,
  },
  {
    id: 4,
    food: "Curd Rice",
    category: "Rice & Meals",
    quantity: "10 kg",
    availableUntil: "6:45 PM",
    donor: "University Food Unit",
    freshness: "Good",
    quality: "Suitable",
    description:
      "Curd rice prepared for institutional meals with remaining surplus available.",
    latitude: 12.3149,
    longitude: 76.6368,
  },
  {
    id: 5,
    food: "Mixed Vegetable Curry",
    category: "Curries",
    quantity: "6 kg",
    availableUntil: "7:15 PM",
    donor: "Green Campus Kitchen",
    freshness: "Good",
    quality: "Suitable",
    description:
      "Vegetable curry available for redistribution to verified organizations.",
    latitude: 12.329,
    longitude: 76.654,
  },
  {
    id: 6,
    food: "Idli",
    category: "Breakfast",
    quantity: "75 pcs",
    availableUntil: "6:30 PM",
    donor: "Community Food Centre",
    freshness: "Good",
    quality: "Suitable",
    description:
      "Surplus idlis available for immediate pickup and community distribution.",
    latitude: 12.292,
    longitude: 76.648,
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

export default function NearbySurplusPage() {
  const router = useRouter();

  const [userLocation, setUserLocation] =
    useState<Coordinates | null>(null);

  const [locationStatus, setLocationStatus] = useState(
    "Detecting your location..."
  );

  const [locationError, setLocationError] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [distance, setDistance] = useState("10");
  const [availability, setAvailability] = useState("All");
  const [sort, setSort] = useState("Nearest");

  const [selectedItem, setSelectedItem] =
    useState<SurplusItem | null>(null);

  const [requested, setRequested] = useState<number[]>([]);

  /* GET USER LOCATION */
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("Location is not supported");
      setLocationError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setUserLocation(coordinates);
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

  const categories = [
    "All",
    "Rice & Meals",
    "Curries",
    "Bakery & Bread",
    "Breakfast",
  ];

  /*
    CALCULATE REAL DISTANCES
  */
  const dataWithDistance = useMemo(() => {
    if (!userLocation) {
      return surplusData.map((item) => ({
        ...item,
        distance: undefined,
      }));
    }

    return surplusData.map((item) => ({
      ...item,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        item.latitude,
        item.longitude
      ),
    }));
  }, [userLocation]);

  /*
    FILTER + SORT
  */
  const filteredData = useMemo(() => {
    let data = dataWithDistance.filter((item) => {
      const matchesSearch =
        item.food.toLowerCase().includes(search.toLowerCase()) ||
        item.donor.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesDistance =
        item.distance === undefined ||
        item.distance <= Number(distance);

      const matchesAvailability =
        availability === "All" ||
        (availability === "Before 7 PM"
          ? item.availableUntil <= "7:00 PM"
          : availability === "Before 8 PM"
          ? item.availableUntil <= "8:00 PM"
          : true);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDistance &&
        matchesAvailability
      );
    });

    if (sort === "Nearest") {
      data.sort(
        (a, b) =>
          (a.distance ?? 999) - (b.distance ?? 999)
      );
    }

    if (sort === "Quantity") {
      data.sort((a, b) => {
        const aQty = parseInt(a.quantity);
        const bQty = parseInt(b.quantity);

        return bQty - aQty;
      });
    }

    return data;
  }, [
    dataWithDistance,
    search,
    category,
    distance,
    availability,
    sort,
  ]);

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
                    item.route === "/ngo/surplus";

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
                Find and request available food surplus nearby
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* LOCATION STATUS */}
              <div
                className={`rounded-lg border px-3 py-2 text-[10px] ${
                  locationError
                    ? "border-[#ead9d2] bg-[#faf4f1] text-[#9a6656]"
                    : userLocation
                    ? "border-[#d8e5d4] bg-[#f0f6ed] text-[#477044]"
                    : "border-[#e2e6df] bg-[#fafbf9] text-[#687267]"
                }`}
              >
                {userLocation ? "⌖ Location detected" : "⌖ " + locationStatus}
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
                  Food Discovery
                </p>

                <h1 className="mt-1 text-[28px] font-bold tracking-tight">
                  Nearby Surplus
                </h1>

                <p className="mt-1 max-w-[650px] text-[12px] leading-5 text-[#697269]">
                  Discover available surplus food from institutional
                  kitchens and food units near your current location.
                </p>
              </div>

              <div className="rounded-xl border border-[#dce5d8] bg-[#f0f6ed] px-4 py-3">

                <div className="flex items-center gap-2">

                  <span className="text-[#477044]">
                    ⌖
                  </span>

                  <div>
                    <p className="text-[10px] text-[#71806f]">
                      Location
                    </p>

                    <p className="text-[12px] font-semibold text-[#31522f]">
                      {userLocation
                        ? "Current Location"
                        : "Mysuru, Karnataka"}
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* FILTERS */}
            <div className="mt-6 rounded-2xl border border-[#e1e5dc] bg-white p-4">

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_0.8fr_1fr_0.9fr]">

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-[#7b857b]">
                    Search
                  </label>

                  <div className="flex h-10 items-center rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-3">

                    <span className="mr-2 text-sm text-[#849084]">
                      ⌕
                    </span>

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                      placeholder="Search food or donor..."
                      className="w-full bg-transparent text-[12px] outline-none"
                    />

                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-[#7b857b]">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-3 text-[12px] outline-none"
                  >
                    {categories.map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-[#7b857b]">
                    Distance
                  </label>

                  <select
                    value={distance}
                    onChange={(e) =>
                      setDistance(e.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-3 text-[12px] outline-none"
                  >
                    <option value="5">
                      Within 5 km
                    </option>

                    <option value="10">
                      Within 10 km
                    </option>

                    <option value="20">
                      Within 20 km
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-[#7b857b]">
                    Availability
                  </label>

                  <select
                    value={availability}
                    onChange={(e) =>
                      setAvailability(e.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-3 text-[12px] outline-none"
                  >
                    <option>All</option>
                    <option>Before 7 PM</option>
                    <option>Before 8 PM</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wide text-[#7b857b]">
                    Sort By
                  </label>

                  <select
                    value={sort}
                    onChange={(e) =>
                      setSort(e.target.value)
                    }
                    className="h-10 w-full rounded-lg border border-[#dfe4dc] bg-[#fafbf9] px-3 text-[12px] outline-none"
                  >
                    <option>Nearest</option>
                    <option>Quantity</option>
                  </select>
                </div>

              </div>
            </div>

            {/* LOCATION MESSAGE */}
            <div className="mt-4 rounded-xl border border-[#e4e8df] bg-[#fbfcfa] px-4 py-3">

              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#e5f0e2] text-xs text-[#477044]">
                    ⌖
                  </div>

                  <div>

                    <p className="text-[11px] font-semibold">
                      {userLocation
                        ? "Using your current location"
                        : locationStatus}
                    </p>

                    <p className="text-[10px] text-[#858e85]">
                      {userLocation
                        ? "Distances below are calculated from your browser location."
                        : "Allow location access to calculate real distances."}
                    </p>

                  </div>
                </div>

                {locationError && (
                  <button
                    onClick={() => window.location.reload()}
                    className="rounded-lg bg-[#315d31] px-3 py-2 text-[10px] font-semibold text-white"
                  >
                    Enable Location
                  </button>
                )}

              </div>
            </div>

            {/* RESULTS */}
            <div className="mt-7 flex items-center justify-between">

              <div>
                <h2 className="text-[15px] font-bold">
                  Available Surplus
                </h2>

                <p className="mt-0.5 text-[10px] text-[#899189]">
                  {filteredData.length} food listings found
                </p>
              </div>

              <div className="rounded-full bg-[#e8f2e5] px-3 py-1.5 text-[10px] font-semibold text-[#477044]">
                {filteredData.length} Available
              </div>

            </div>

            {/* GRID */}
            <div className="mt-4 grid grid-cols-1 gap-5 xl:grid-cols-[1.55fr_0.75fr]">

              {/* LIST */}
              <div className="space-y-3">

                {filteredData.map((item) => {

                  const isRequested =
                    requested.includes(item.id);

                  const isSelected =
                    selectedItem?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border bg-white p-4 transition ${
                        isSelected
                          ? "border-[#9ab895] shadow-[0_5px_20px_rgba(54,90,50,0.08)]"
                          : "border-[#e1e5dc]"
                      }`}
                    >

                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#edf4ea] text-xl">
                          🍲
                        </div>

                        <div className="min-w-0 flex-1">

                          <div className="flex flex-wrap items-center gap-2">

                            <h3 className="text-[14px] font-bold">
                              {item.food}
                            </h3>

                            <span className="rounded-full bg-[#edf4ea] px-2 py-0.5 text-[9px] font-semibold text-[#4b7048]">
                              {item.quality}
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
                                {item.distance !== undefined
                                  ? `${item.distance.toFixed(1)} km`
                                  : "Calculating..."}
                              </p>
                            </div>

                            <div>
                              <span className="text-[9px] uppercase tracking-wide text-[#969e96]">
                                Available Until
                              </span>

                              <p className="text-[11px] font-semibold">
                                {item.availableUntil}
                              </p>
                            </div>

                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">

                          <button
                            onClick={() =>
                              setSelectedItem(item)
                            }
                            className="rounded-lg border border-[#dce2d9] px-3 py-2 text-[10px] font-semibold text-[#566056]"
                          >
                            View Details
                          </button>

                          <button
                            onClick={() =>
                              requestFood(item.id)
                            }
                            disabled={isRequested}
                            className={`rounded-lg px-3 py-2 text-[10px] font-semibold ${
                              isRequested
                                ? "bg-[#e8eee5] text-[#658060]"
                                : "bg-[#315d31] text-white"
                            }`}
                          >
                            {isRequested
                              ? "Requested ✓"
                              : "Request Food"}
                          </button>

                        </div>

                      </div>
                    </div>
                  );
                })}

              </div>

              {/* DETAILS */}
              <div className="xl:sticky xl:top-5 xl:self-start">

                <div className="rounded-2xl border border-[#e1e5dc] bg-white p-5">

                  {selectedItem ? (
                    <>
                      <div className="flex items-start justify-between">

                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-[#7b9278]">
                            Food Details
                          </p>

                          <h2 className="mt-1 text-[20px] font-bold">
                            {selectedItem.food}
                          </h2>
                        </div>

                        <button
                          onClick={() =>
                            setSelectedItem(null)
                          }
                          className="text-lg text-[#8a9389]"
                        >
                          ×
                        </button>

                      </div>

                      <div className="mt-5 rounded-xl bg-[#f1f6ee] p-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl">
                            🍲
                          </div>

                          <div>
                            <p className="text-[11px] font-semibold">
                              {selectedItem.category}
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#738073]">
                              From {selectedItem.donor}
                            </p>
                          </div>

                        </div>

                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3">

                        <div className="rounded-xl border border-[#e7ebe4] p-3">
                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Quantity
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            {selectedItem.quantity}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#e7ebe4] p-3">
                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Distance
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            {selectedItem.distance !== undefined
                              ? `${selectedItem.distance.toFixed(1)} km`
                              : "Calculating..."}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#e7ebe4] p-3">
                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Freshness
                          </p>

                          <p className="mt-1 text-sm font-bold text-[#477044]">
                            {selectedItem.freshness}
                          </p>
                        </div>

                        <div className="rounded-xl border border-[#e7ebe4] p-3">
                          <p className="text-[9px] uppercase tracking-wide text-[#8b948b]">
                            Available Until
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            {selectedItem.availableUntil}
                          </p>
                        </div>

                      </div>

                      <div className="mt-5">

                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#7d887d]">
                          Description
                        </p>

                        <p className="mt-2 text-[11px] leading-5 text-[#697269]">
                          {selectedItem.description}
                        </p>

                      </div>

                      <div className="mt-5 rounded-xl border border-[#e3e8e0] bg-[#fafbf9] p-3">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f0e3] text-[#477044]">
                            ⌖
                          </div>

                          <div>
                            <p className="text-[10px] font-semibold">
                              Pickup Location
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#818981]">
                              {selectedItem.distance !== undefined
                                ? `${selectedItem.distance.toFixed(
                                    1
                                  )} km from you`
                                : "Calculating distance..."}
                            </p>
                          </div>

                        </div>
                      </div>

                      <button
                        onClick={() =>
                          requestFood(selectedItem.id)
                        }
                        disabled={requested.includes(
                          selectedItem.id
                        )}
                        className={`mt-5 w-full rounded-xl py-3 text-[11px] font-semibold ${
                          requested.includes(
                            selectedItem.id
                          )
                            ? "bg-[#e8eee5] text-[#648060]"
                            : "bg-[#315d31] text-white"
                        }`}
                      >
                        {requested.includes(
                          selectedItem.id
                        )
                          ? "Food Request Submitted ✓"
                          : "Request This Food"}
                      </button>

                    </>
                  ) : (
                    <div className="flex min-h-[390px] flex-col items-center justify-center text-center">

                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ea] text-xl">
                        ◇
                      </div>

                      <h3 className="mt-4 text-[14px] font-semibold">
                        Select a food listing
                      </h3>

                      <p className="mt-2 max-w-[250px] text-[10px] leading-5 text-[#899189]">
                        Select a listing to view detailed food,
                        quantity, pickup and distance information.
                      </p>

                    </div>
                  )}

                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-[#e0e5dd] pt-4">

              <p className="text-[9px] leading-4 text-[#929a92]">
                AAHAR uses your browser's location permission to
                calculate approximate distances between the NGO and
                registered surplus locations. Precise coordinates are
                not displayed to other users. Production deployment
                can replace the prototype coordinates with Firebase
                donor locations and a dedicated mapping service.
              </p>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}