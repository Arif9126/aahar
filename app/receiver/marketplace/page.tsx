"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FoodItem = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  donor: string;
  location: string;
  distance: number;
  availableUntil: string;
  price: number;
  type: "Discounted" | "Free";
  description: string;
  image: string;
};

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: "Vegetable Rice",
    category: "Rice & Meals",
    quantity: 12,
    unit: "kg",
    donor: "Donor Kitchen",
    location: "Vijayanagar, Mysuru",
    distance: 1.2,
    availableUntil: "7:00 PM",
    price: 20,
    type: "Discounted",
    description:
      "Freshly prepared vegetable rice available for same-day consumption.",
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Dal Tadka",
    category: "Curry",
    quantity: 8,
    unit: "kg",
    donor: "Central Institution Kitchen",
    location: "Kuvempunagar, Mysuru",
    distance: 1.6,
    availableUntil: "7:30 PM",
    price: 15,
    type: "Discounted",
    description:
      "Prepared dal available from an institutional kitchen for redistribution.",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Chapati",
    category: "Bakery & Bread",
    quantity: 40,
    unit: "pcs",
    donor: "Campus Dining Unit",
    location: "VVCE Campus, Mysuru",
    distance: 1.8,
    availableUntil: "8:00 PM",
    price: 2,
    type: "Discounted",
    description:
      "Fresh chapatis available for quick pickup from the campus dining unit.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Curd Rice",
    category: "Rice & Meals",
    quantity: 10,
    unit: "kg",
    donor: "University Food Unit",
    location: "Saraswathipuram, Mysuru",
    distance: 1.9,
    availableUntil: "6:45 PM",
    price: 15,
    type: "Discounted",
    description:
      "Fresh curd rice available for redistribution before the listed time.",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Mixed Vegetable Curry",
    category: "Curry",
    quantity: 6,
    unit: "kg",
    donor: "Community Food Centre",
    location: "Hebbal, Mysuru",
    distance: 2.1,
    availableUntil: "7:15 PM",
    price: 0,
    type: "Free",
    description:
      "Surplus vegetable curry made available for verified receivers.",
    image:
      "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Lemon Rice",
    category: "Rice & Meals",
    quantity: 9,
    unit: "kg",
    donor: "Institutional Kitchen",
    location: "Lakshmipuram, Mysuru",
    distance: 2.4,
    availableUntil: "8:15 PM",
    price: 10,
    type: "Discounted",
    description:
      "Prepared lemon rice available at a reduced redistribution price.",
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80",
  },
];

export default function ReceiverMarketplace() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [maxDistance, setMaxDistance] = useState("All");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedFoodId = Number(params.get("food") || 0);

    if (selectedFoodId) {
      const food = foodItems.find((item) => item.id === selectedFoodId) || null;
      setSelectedFood(food);
    }
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [requested, setRequested] = useState<number[]>([]);

  const categories = [
    "All",
    ...Array.from(new Set(foodItems.map((item) => item.category))),
  ];

  const filteredFood = useMemo(() => {
    return foodItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.donor.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      const matchesType = type === "All" || item.type === type;

      const matchesDistance =
        maxDistance === "All" ||
        item.distance <= Number(maxDistance);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesType &&
        matchesDistance
      );
    });
  }, [search, category, type, maxDistance]);

  const requestFood = () => {
    if (!selectedFood) return;

    setRequested((prev) =>
      prev.includes(selectedFood.id) ? prev : [...prev, selectedFood.id]
    );

    setSelectedFood(null);

    alert(
      `Request submitted for ${quantity} ${selectedFood.unit} of ${selectedFood.name}.`
    );
  };

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
            onClick={() => router.push("/receiver")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-[#f0f5f0]"
          >
            <span className="text-lg">⌂</span>
            Dashboard
          </button>

          <button
            className="flex w-full items-center gap-3 rounded-xl bg-[#e8f3eb] px-4 py-3 text-sm font-semibold text-[#236b45]"
          >
            <span className="text-lg">◇</span>
            Marketplace
          </button>

          <button
            onClick={() => router.push("/receiver/requests")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-[#f0f5f0]"
          >
            <span className="text-lg">▣</span>
            My Requests
          </button>

          <button
            onClick={() => router.push("/receiver/pickup")}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-600 hover:bg-[#f0f5f0]"
          >
            <span className="text-lg">↔</span>
            Pickup Status
          </button>
        </nav>

        <div className="absolute bottom-5 left-3 right-3">
          <button
            onClick={() => router.push("/signin?role=receiver")}
            className="w-full rounded-xl px-4 py-3 text-left text-sm text-gray-500 hover:bg-gray-100"
          >
            ← Sign out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="lg:ml-[240px]">
        {/* HEADER */}
        <header className="sticky top-0 z-20 border-b border-[#dce4dc] bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1f2933]">
                Food Marketplace
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Discover surplus food available near you.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.push("/receiver/requests")}
                className="rounded-xl border border-[#dce4dc] bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                My Requests
              </button>

              <button
                onClick={() => router.push("/receiver/pickup")}
                className="rounded-xl bg-[#236b45] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1d5b3a]"
              >
                Pickup Status
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* SEARCH + FILTERS */}
          <section className="rounded-2xl border border-[#dce4dc] bg-white p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.7fr_1fr_1fr_1fr]">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Search Food
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">
                    ⌕
                  </span>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search food or donor..."
                    className="w-full rounded-xl border border-[#dce4dc] bg-[#fafcf9] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#236b45]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-[#dce4dc] bg-[#fafcf9] px-4 py-3 text-sm outline-none"
                >
                  {categories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Listing Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-xl border border-[#dce4dc] bg-[#fafcf9] px-4 py-3 text-sm outline-none"
                >
                  <option>All</option>
                  <option>Discounted</option>
                  <option>Free</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Distance
                </label>

                <select
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(e.target.value)}
                  className="w-full rounded-xl border border-[#dce4dc] bg-[#fafcf9] px-4 py-3 text-sm outline-none"
                >
                  <option value="All">Any distance</option>
                  <option value="2">Within 2 km</option>
                  <option value="3">Within 3 km</option>
                  <option value="5">Within 5 km</option>
                </select>
              </div>
            </div>
          </section>

          {/* RESULT HEADER */}
          <div className="mt-7 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#1f2933]">
                Available Food
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {filteredFood.length} listings available
              </p>
            </div>

            <div className="hidden text-sm text-gray-500 sm:block">
              Sorted by proximity
            </div>
          </div>

          {/* FOOD GRID */}
          {filteredFood.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-[#cfd8d0] bg-white py-16 text-center">
              <div className="text-3xl text-gray-300">⌕</div>

              <h3 className="mt-3 font-semibold text-gray-700">
                No food found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredFood.map((food) => {
                const alreadyRequested = requested.includes(food.id);

                return (
                  <div
                    key={food.id}
                    className="overflow-hidden rounded-2xl border border-[#dce4dc] bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute left-3 top-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            food.type === "Free"
                              ? "bg-[#e8f3eb] text-[#236b45]"
                              : "bg-white/95 text-[#236b45]"
                          }`}
                        >
                          {food.type === "Free"
                            ? "FREE"
                            : `₹${food.price}/${food.unit}`}
                        </span>
                      </div>

                      <div className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white">
                        {food.distance.toFixed(1)} km
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-[#1f2933]">
                            {food.name}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            {food.category}
                          </p>
                        </div>

                        <span className="rounded-lg bg-[#f0f5f0] px-2.5 py-1 text-xs font-semibold text-[#236b45]">
                          {food.quantity} {food.unit}
                        </span>
                      </div>

                      <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
                        {food.description}
                      </p>

                      <div className="mt-4 space-y-2 border-t border-[#edf1ed] pt-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Donor</span>
                          <span className="font-medium text-gray-700">
                            {food.donor}
                          </span>
                        </div>

                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Location</span>
                          <span className="font-medium text-gray-700">
                            {food.location}
                          </span>
                        </div>

                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Available until</span>
                          <span className="font-semibold text-[#236b45]">
                            {food.availableUntil}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedFood(food);
                          setQuantity(1);
                        }}
                        disabled={alreadyRequested}
                        className={`mt-5 w-full rounded-xl py-3 text-sm font-semibold transition ${
                          alreadyRequested
                            ? "cursor-not-allowed bg-gray-100 text-gray-400"
                            : "bg-[#236b45] text-white hover:bg-[#1d5b3a]"
                        }`}
                      >
                        {alreadyRequested ? "Request Submitted" : "View Food"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* FOOD DETAILS MODAL */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-5">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="relative">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="h-60 w-full object-cover"
              />

              <button
                onClick={() => setSelectedFood(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white hover:bg-black/75"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold text-[#1f2933]">
                      {selectedFood.name}
                    </h2>

                    <span className="rounded-full bg-[#e8f3eb] px-3 py-1 text-xs font-semibold text-[#236b45]">
                      {selectedFood.type}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">
                    {selectedFood.category} · {selectedFood.donor}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xl font-bold text-[#236b45]">
                    {selectedFood.price === 0
                      ? "FREE"
                      : `₹${selectedFood.price}/${selectedFood.unit}`}
                  </div>

                  <div className="text-xs text-gray-500">
                    {selectedFood.quantity} {selectedFood.unit} available
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[#f6f8f5] p-4">
                  <div className="text-xs text-gray-500">Distance</div>
                  <div className="mt-1 font-semibold">
                    {selectedFood.distance.toFixed(1)} km
                  </div>
                </div>

                <div className="rounded-xl bg-[#f6f8f5] p-4">
                  <div className="text-xs text-gray-500">Available Until</div>
                  <div className="mt-1 font-semibold">
                    {selectedFood.availableUntil}
                  </div>
                </div>

                <div className="rounded-xl bg-[#f6f8f5] p-4">
                  <div className="text-xs text-gray-500">Location</div>
                  <div className="mt-1 font-semibold">
                    {selectedFood.location}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold text-[#1f2933]">
                  Food Details
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {selectedFood.description}
                </p>
              </div>

              <div className="mt-6 rounded-xl border border-[#dce4dc] bg-[#fafcf9] p-5">
                <label className="block text-sm font-semibold text-gray-700">
                  Quantity Required
                </label>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.max(1, prev - 1))
                    }
                    className="h-10 w-10 rounded-lg border border-[#dce4dc] bg-white text-lg hover:bg-gray-50"
                  >
                    −
                  </button>

                  <div className="min-w-[80px] rounded-lg border border-[#dce4dc] bg-white px-4 py-2 text-center text-sm font-semibold">
                    {quantity} {selectedFood.unit}
                  </div>

                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(selectedFood.quantity, prev + 1)
                      )
                    }
                    className="h-10 w-10 rounded-lg border border-[#dce4dc] bg-white text-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                {selectedFood.price > 0 && (
                  <div className="mt-4 flex justify-between border-t border-[#e1e7e1] pt-4 text-sm">
                    <span className="text-gray-500">Estimated total</span>

                    <span className="font-bold text-[#236b45]">
                      ₹{selectedFood.price * quantity}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-xl bg-[#fff8e8] p-4 text-xs leading-5 text-[#745b1f]">
                Food condition information is provided for decision-support.
                The platform does not certify food safety.
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => setSelectedFood(null)}
                  className="flex-1 rounded-xl border border-[#dce4dc] px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={requestFood}
                  className="flex-1 rounded-xl bg-[#236b45] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1d5b3a]"
                >
                  Request Food
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}