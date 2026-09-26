"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type PickupStatus =
  | "Ready for Pickup"
  | "Pickup Started"
  | "Food Collected"
  | "Completed";

type Pickup = {
  id: number;
  food: string;
  quantity: number;
  unit: string;
  donor: string;
  location: string;
  latitude: number;
  longitude: number;
  distance: number;
  pickupDeadline: string;
  status: PickupStatus;
  amount: number;
  image: string;
};

const initialPickups: Pickup[] = [
  {
    id: 1,
    food: "Vegetable Rice",
    quantity: 5,
    unit: "kg",
    donor: "Donor Kitchen",
    location: "Vijayanagar, Mysuru",
    latitude: 12.3096,
    longitude: 76.6497,
    distance: 1.2,
    pickupDeadline: "7:00 PM",
    status: "Ready for Pickup",
    amount: 100,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    food: "Dal Tadka",
    quantity: 4,
    unit: "kg",
    donor: "Central Institution Kitchen",
    location: "Kuvempunagar, Mysuru",
    latitude: 12.2856,
    longitude: 76.6287,
    distance: 1.6,
    pickupDeadline: "7:30 PM",
    status: "Ready for Pickup",
    amount: 60,
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1000&q=80",
  },
];

export default function ReceiverPickup() {
  const router = useRouter();

  const [pickups, setPickups] =
    useState<Pickup[]>(initialPickups);

  const [selectedPickup, setSelectedPickup] =
    useState<Pickup | null>(initialPickups[0]);

  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [currentDistance, setCurrentDistance] =
    useState<number | null>(null);

  const [locationChecking, setLocationChecking] =
    useState(false);

  const [locationMessage, setLocationMessage] =
    useState("");

  const [locationVerified, setLocationVerified] =
    useState(false);

  const [showCompletedMessage, setShowCompletedMessage] =
    useState(false);

  /* --------------------------------
     HAVERSINE DISTANCE
  -------------------------------- */

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
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
  };

  /* --------------------------------
     GOOGLE MAPS NAVIGATION
  -------------------------------- */

  const openDirections = (pickup: Pickup) => {
    const destination = `${pickup.latitude},${pickup.longitude}`;

    const url =
      `https://www.google.com/maps/dir/?api=1` +
      `&destination=${encodeURIComponent(destination)}` +
      `&travelmode=driving`;

    window.open(url, "_blank");
  };

  /* --------------------------------
     VERIFY RECEIVER LOCATION
  -------------------------------- */

  const verifyLocation = () => {
    if (!selectedPickup) return;

    if (!navigator.geolocation) {
      setLocationMessage(
        "Location services are not supported by this browser."
      );
      return;
    }

    setLocationChecking(true);
    setLocationMessage("");
    setLocationVerified(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCurrentLocation({
          latitude,
          longitude,
        });

        const distance = calculateDistance(
          latitude,
          longitude,
          selectedPickup.latitude,
          selectedPickup.longitude
        );

        setCurrentDistance(distance);

        setLocationChecking(false);

        /*
          Prototype pickup radius:
          Receiver must be within 100 metres
          of the donor location.
        */

        if (distance <= 0.1) {
          setLocationVerified(true);

          setLocationMessage(
            "Location verified. You are at the pickup location."
          );
        } else {
          setLocationVerified(false);

          setLocationMessage(
            `You are approximately ${(distance * 1000).toFixed(
              0
            )} metres away. Please reach the pickup location.`
          );
        }
      },
      (error) => {
        setLocationChecking(false);

        if (error.code === 1) {
          setLocationMessage(
            "Location permission was denied. Please allow location access and try again."
          );
        } else if (error.code === 2) {
          setLocationMessage(
            "Your current location could not be determined."
          );
        } else {
          setLocationMessage(
            "Unable to verify your location. Please try again."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  /* --------------------------------
     START PICKUP
  -------------------------------- */

  const startPickup = () => {
    if (!selectedPickup) return;

    const updated = pickups.map((pickup) =>
      pickup.id === selectedPickup.id
        ? {
            ...pickup,
            status: "Pickup Started" as PickupStatus,
          }
        : pickup
    );

    setPickups(updated);

    const updatedSelected = updated.find(
      (pickup) => pickup.id === selectedPickup.id
    );

    if (updatedSelected) {
      setSelectedPickup(updatedSelected);
    }

    setLocationMessage(
      "Pickup started. Navigate to the donor location."
    );
  };

  /* --------------------------------
     COMPLETE PICKUP
  -------------------------------- */

  const completePickup = () => {
    if (!selectedPickup || !locationVerified) return;

    const updated = pickups.map((pickup) =>
      pickup.id === selectedPickup.id
        ? {
            ...pickup,
            status: "Completed" as PickupStatus,
          }
        : pickup
    );

    setPickups(updated);

    const updatedSelected = updated.find(
      (pickup) => pickup.id === selectedPickup.id
    );

    if (updatedSelected) {
      setSelectedPickup(updatedSelected);
    }

    setShowCompletedMessage(true);

    setLocationMessage(
      "Pickup completed successfully."
    );
  };

  /* --------------------------------
     SELECT PICKUP
  -------------------------------- */

  const selectPickup = (pickup: Pickup) => {
    setSelectedPickup(pickup);
    setCurrentLocation(null);
    setCurrentDistance(null);
    setLocationVerified(false);
    setLocationMessage("");
    setShowCompletedMessage(false);
  };

  const readyCount = pickups.filter(
    (pickup) =>
      pickup.status === "Ready for Pickup"
  ).length;

  const completedCount = pickups.filter(
    (pickup) =>
      pickup.status === "Completed"
  ).length;

  return (
    <div className="min-h-screen bg-[#f5f7f4] text-[#1f2933]">

      {/* SIDEBAR */}

      <aside className="fixed left-0 top-0 hidden h-screen w-[240px] border-r border-[#dce4dc] bg-white lg:block">

        <div className="border-b border-[#e4e9e4] px-6 py-6">

          <div className="text-2xl font-bold tracking-tight text-[#236b45]">
            AAHAR
          </div>

          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-gray-500">
            Receiver Portal
          </div>

        </div>

        <nav className="space-y-1 px-3 py-5">

          <button
            onClick={() =>
              router.push("/receiver")
            }
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-[#f0f5f0]"
          >
            <span className="text-lg">⌂</span>
            Dashboard
          </button>

          <button
            onClick={() =>
              router.push("/receiver/marketplace")
            }
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-[#f0f5f0]"
          >
            <span className="text-lg">◇</span>
            Marketplace
          </button>

          <button
            onClick={() =>
              router.push("/receiver/requests")
            }
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-[#f0f5f0]"
          >
            <span className="text-lg">▣</span>
            My Requests
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl bg-[#e8f3eb] px-4 py-3 text-sm font-semibold text-[#236b45]"
          >
            <span className="text-lg">↔</span>
            Pickup Status
          </button>

        </nav>

        <div className="absolute bottom-5 left-3 right-3">

          <button
            onClick={() =>
              router.push("/signin?role=receiver")
            }
            className="w-full rounded-xl px-4 py-3 text-left text-sm text-gray-500 hover:bg-gray-100"
          >
            ← Sign out
          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="lg:ml-[240px]">

        {/* HEADER */}

        <header className="border-b border-[#dce4dc] bg-white px-6 py-5">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <h1 className="text-2xl font-bold text-[#1f2933]">
                Pickup Status
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Navigate to the donor and complete your pickup.
              </p>

            </div>

            <button
              onClick={() =>
                router.push("/receiver/requests")
              }
              className="rounded-xl border border-[#dce4dc] bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ← My Requests
            </button>

          </div>

        </header>

        <div className="p-6">

          {/* SUMMARY */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <SummaryCard
              title="Ready for Pickup"
              value={readyCount}
              green
            />

            <SummaryCard
              title="Completed"
              value={completedCount}
            />

            <SummaryCard
              title="Active Pickup"
              value={
                selectedPickup &&
                selectedPickup.status !== "Completed"
                  ? 1
                  : 0
              }
            />

            <SummaryCard
              title="Verification Radius"
              value={100}
              suffix="m"
            />

          </div>

          <div className="mt-7 grid gap-6 xl:grid-cols-[330px_1fr]">

            {/* PICKUP LIST */}

            <section className="rounded-2xl border border-[#dce4dc] bg-white p-5 shadow-sm">

              <h2 className="font-bold text-[#1f2933]">
                Your Pickups
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Select a pickup to view details.
              </p>

              <div className="mt-5 space-y-3">

                {pickups.map((pickup) => (

                  <button
                    key={pickup.id}
                    onClick={() =>
                      selectPickup(pickup)
                    }
                    className={`w-full rounded-xl border p-3 text-left transition ${
                      selectedPickup?.id === pickup.id
                        ? "border-[#236b45] bg-[#f0f7f1]"
                        : "border-[#e1e7e1] hover:bg-gray-50"
                    }`}
                  >

                    <div className="flex gap-3">

                      <img
                        src={pickup.image}
                        alt={pickup.food}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">

                        <div className="truncate text-sm font-semibold">
                          {pickup.food}
                        </div>

                        <div className="mt-1 text-xs text-gray-500">
                          {pickup.quantity} {pickup.unit}
                        </div>

                        <div className="mt-2">

                          <StatusBadge
                            status={pickup.status}
                          />

                        </div>

                      </div>

                    </div>

                  </button>

                ))}

              </div>

            </section>

            {/* PICKUP DETAILS */}

            {selectedPickup && (

              <section className="overflow-hidden rounded-2xl border border-[#dce4dc] bg-white shadow-sm">

                {/* IMAGE */}

                <div className="relative h-60">

                  <img
                    src={selectedPickup.image}
                    alt={selectedPickup.food}
                    className="h-full w-full object-cover"
                  />

                  <div className="absolute left-5 top-5">

                    <StatusBadge
                      status={selectedPickup.status}
                      large
                    />

                  </div>

                </div>

                <div className="p-6">

                  {/* TITLE */}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <h2 className="text-2xl font-bold text-[#1f2933]">
                        {selectedPickup.food}
                      </h2>

                      <p className="mt-1 text-sm text-gray-500">
                        Pickup from {selectedPickup.donor}
                      </p>

                    </div>

                    <div className="text-left sm:text-right">

                      <div className="text-xl font-bold text-[#236b45]">
                        ₹{selectedPickup.amount}
                      </div>

                      <div className="text-xs text-gray-500">
                        {selectedPickup.quantity}{" "}
                        {selectedPickup.unit}
                      </div>

                    </div>

                  </div>

                  {/* LOCATION */}

                  <div className="mt-6 rounded-2xl border border-[#dce4dc] bg-[#f8faf7] p-5">

                    <div className="flex items-start gap-4">

                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#e8f3eb] text-xl text-[#236b45]">
                        ⌖
                      </div>

                      <div className="flex-1">

                        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Pickup Location
                        </div>

                        <div className="mt-1 font-semibold text-[#1f2933]">
                          {selectedPickup.location}
                        </div>

                        <div className="mt-1 text-sm text-gray-500">
                          Approximately{" "}
                          {selectedPickup.distance.toFixed(1)} km
                          from your previous location
                        </div>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        openDirections(selectedPickup)
                      }
                      disabled={
                        selectedPickup.status ===
                        "Completed"
                      }
                      className="mt-5 w-full rounded-xl bg-[#236b45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1d5b3a] disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      ⌖ Navigate to Pickup
                    </button>

                  </div>

                  {/* LOCATION VERIFICATION */}

                  {selectedPickup.status !==
                    "Completed" && (

                    <div className="mt-5 rounded-2xl border border-[#dce4dc] bg-white p-5">

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                          <h3 className="font-semibold text-[#1f2933]">
                            Location Verification
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            Verify that you have reached
                            the donor location.
                          </p>

                        </div>

                        <span className="w-fit rounded-full bg-[#f1f4f1] px-3 py-1 text-xs font-semibold text-gray-600">
                          Radius: 100 m
                        </span>

                      </div>

                      <button
                        onClick={verifyLocation}
                        disabled={locationChecking}
                        className="mt-4 w-full rounded-xl border border-[#236b45] bg-white px-5 py-3 text-sm font-semibold text-[#236b45] hover:bg-[#f0f7f1] disabled:cursor-wait disabled:opacity-60"
                      >
                        {locationChecking
                          ? "Checking Location..."
                          : "◎ Verify My Location"}
                      </button>

                      {/* LOCATION RESULT */}

                      {currentDistance !== null && (

                        <div
                          className={`mt-4 rounded-xl p-4 ${
                            locationVerified
                              ? "bg-[#e8f3eb]"
                              : "bg-[#fff6df]"
                          }`}
                        >

                          <div className="flex items-start gap-3">

                            <div className="text-lg">
                              {locationVerified
                                ? "✓"
                                : "!"}
                            </div>

                            <div>

                              <div
                                className={`text-sm font-semibold ${
                                  locationVerified
                                    ? "text-[#236b45]"
                                    : "text-[#87691c]"
                                }`}
                              >
                                {locationVerified
                                  ? "Location Verified"
                                  : "Not at Pickup Location"}
                              </div>

                              <div className="mt-1 text-xs text-gray-600">
                                Current distance:{" "}
                                {currentDistance <
                                1
                                  ? `${(
                                      currentDistance *
                                      1000
                                    ).toFixed(
                                      0
                                    )} metres`
                                  : `${currentDistance.toFixed(
                                      2
                                    )} km`}
                              </div>

                            </div>

                          </div>

                        </div>

                      )}

                      {locationMessage && (
                        <p className="mt-3 text-xs leading-5 text-gray-500">
                          {locationMessage}
                        </p>
                      )}

                    </div>

                  )}

                  {/* ACTION */}

                  <div className="mt-5">

                    {selectedPickup.status ===
                      "Ready for Pickup" && (

                      <button
                        onClick={startPickup}
                        className="w-full rounded-xl bg-[#1f2933] px-5 py-3 text-sm font-semibold text-white hover:bg-[#111827]"
                      >
                        Start Pickup
                      </button>

                    )}

                    {selectedPickup.status ===
                      "Pickup Started" && (

                      <div>

                        <div className="mb-3 rounded-xl bg-[#eef4fb] p-4 text-sm text-[#35658a]">
                          Pickup started. Reach the donor
                          location and verify your
                          location to complete the
                          pickup.
                        </div>

                      </div>

                    )}

                    {selectedPickup.status !==
                      "Completed" && locationVerified && (

                      <button
                        onClick={completePickup}
                        className="mt-3 w-full rounded-xl bg-[#236b45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1d5b3a]"
                      >
                        ✓ Complete Pickup
                      </button>

                    )}

                    {selectedPickup.status ===
                      "Completed" && (

                      <div className="rounded-2xl border border-[#b9d8c1] bg-[#e8f3eb] p-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#236b45] text-xl text-white">
                            ✓
                          </div>

                          <div>

                            <div className="font-bold text-[#236b45]">
                              Pickup Completed
                            </div>

                            <div className="mt-1 text-xs text-gray-600">
                              Food has been successfully
                              collected.
                            </div>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>

                  {/* COMPLETION MESSAGE */}

                  {showCompletedMessage &&
                    selectedPickup.status ===
                      "Completed" && (

                    <div className="mt-5 rounded-xl bg-[#f0f7f1] p-4 text-center">

                      <div className="text-sm font-semibold text-[#236b45]">
                        Pickup successfully completed.
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        Your pickup status has been updated.
                      </p>

                    </div>

                  )}

                  {/* TIMELINE */}

                  <div className="mt-8">

                    <h3 className="font-semibold text-[#1f2933]">
                      Pickup Timeline
                    </h3>

                    <div className="mt-5">

                      <TimelineStep
                        title="Request Submitted"
                        description="Food request was submitted."
                        active={true}
                      />

                      <TimelineStep
                        title="Ready for Pickup"
                        description="Donor has prepared the food for collection."
                        active={true}
                      />

                      <TimelineStep
                        title="Pickup Started"
                        description={
                          selectedPickup.status ===
                            "Pickup Started" ||
                          selectedPickup.status ===
                            "Food Collected" ||
                          selectedPickup.status ===
                            "Completed"
                            ? "Receiver has started the pickup."
                            : "Waiting for pickup to start."
                        }
                        active={
                          selectedPickup.status ===
                            "Pickup Started" ||
                          selectedPickup.status ===
                            "Food Collected" ||
                          selectedPickup.status ===
                            "Completed"
                        }
                      />

                      <TimelineStep
                        title="Food Collected"
                        description={
                          selectedPickup.status ===
                            "Completed"
                            ? "Food was collected successfully."
                            : "Waiting for location verification and collection."
                        }
                        active={
                          selectedPickup.status ===
                            "Completed"
                        }
                        last
                      />

                    </div>

                  </div>

                  {/* IMPORTANT NOTE */}

                  <div className="mt-7 rounded-xl bg-[#fff8e8] p-4 text-xs leading-5 text-[#745b1f]">
                    Location verification is used only to
                    confirm that the receiver is near the
                    registered pickup location. AAHAR does
                    not certify food safety.
                  </div>

                </div>

              </section>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

/* --------------------------------
   SUMMARY CARD
-------------------------------- */

function SummaryCard({
  title,
  value,
  suffix,
  green = false,
}: {
  title: string;
  value: number;
  suffix?: string;
  green?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-[#dce4dc] bg-white p-5 shadow-sm">

      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div
        className={`mt-2 text-3xl font-bold ${
          green
            ? "text-[#236b45]"
            : "text-[#1f2933]"
        }`}
      >
        {value}
        {suffix && (
          <span className="ml-1 text-base font-medium">
            {suffix}
          </span>
        )}
      </div>

    </div>
  );
}

/* --------------------------------
   STATUS BADGE
-------------------------------- */

function StatusBadge({
  status,
  large = false,
}: {
  status: PickupStatus;
  large?: boolean;
}) {
  let style = "";

  if (status === "Completed") {
    style = "bg-[#e8f3eb] text-[#236b45]";
  } else if (status === "Pickup Started") {
    style = "bg-[#eef4fb] text-[#35658a]";
  } else if (status === "Food Collected") {
    style = "bg-[#e8f3eb] text-[#236b45]";
  } else {
    style = "bg-[#fff6df] text-[#87691c]";
  }

  return (
    <span
      className={`inline-flex rounded-full font-semibold ${style} ${
        large
          ? "px-4 py-2 text-sm"
          : "px-2.5 py-1 text-[11px]"
      }`}
    >
      {status}
    </span>
  );
}

/* --------------------------------
   TIMELINE STEP
-------------------------------- */

function TimelineStep({
  title,
  description,
  active,
  last = false,
}: {
  title: string;
  description: string;
  active: boolean;
  last?: boolean;
}) {
  return (
    <div className="relative flex gap-4">

      {!last && (
        <div
          className={`absolute left-[9px] top-5 h-[calc(100%+20px)] w-px ${
            active
              ? "bg-[#236b45]"
              : "bg-[#dce4dc]"
          }`}
        />
      )}

      <div
        className={`relative z-10 mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-4 border-white ${
          active
            ? "bg-[#236b45]"
            : "bg-[#d5ddd6]"
        }`}
      />

      <div className="pb-6">

        <div
          className={`text-sm font-semibold ${
            active
              ? "text-[#1f2933]"
              : "text-gray-400"
          }`}
        >
          {title}
        </div>

        <div className="mt-1 text-xs leading-5 text-gray-500">
          {description}
        </div>

      </div>

    </div>
  );
}