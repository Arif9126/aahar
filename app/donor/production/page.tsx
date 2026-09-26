"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductionPlanning() {
  const router = useRouter();

  const [mealType, setMealType] = useState("All Meals");
  const [planGenerated, setPlanGenerated] = useState(false);

  const predictedDemand = 1240;
  const recommendedProduction = 1210;
  const expectedSurplus = 42;

  const ingredients = [
    {
      name: "Rice",
      quantity: "48 kg",
      cost: "₹2,160",
      usage: "Main meals",
    },
    {
      name: "Vegetables",
      quantity: "32 kg",
      cost: "₹1,920",
      usage: "Curries & sides",
    },
    {
      name: "Dal",
      quantity: "18 kg",
      cost: "₹1,440",
      usage: "Dal / Sambar",
    },
    {
      name: "Oil & Spices",
      quantity: "8 kg",
      cost: "₹960",
      usage: "Cooking",
    },
  ];

  const totalCost = "₹6,480";

  return (
    <main className="min-h-screen bg-[#f6f8f7] text-gray-900">
      {/* TOP BAR */}
      <header className="fixed left-0 right-0 top-0 z-30 h-20 border-b border-gray-200 bg-white">
        <div className="flex h-full items-center justify-between px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-600">
              AAHAR
            </p>
            <h1 className="text-xl font-bold">Production Planning</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">GreenLeaf Kitchen</p>
              <p className="text-xs text-gray-400">Institutional Donor</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
              GK
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className="fixed bottom-0 left-0 top-20 z-20 hidden w-64 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col p-5">
          <div className="mb-6 rounded-2xl bg-green-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
              Donor Workspace
            </p>
            <p className="mt-1 text-sm font-bold text-gray-800">
              GreenLeaf Kitchen
            </p>
          </div>

          <nav className="space-y-1">
            {[
              ["Dashboard", "/donor"],
              ["Demand Prediction", "/donor/demand"],
              ["Production Planning", "/donor/production"],
              ["Register Surplus", "#"],
              ["Surplus Management", "#"],
              ["Marketplace", "#"],
              ["Transactions", "#"],
              ["Impact & ESG", "#"],
            ].map(([name, path]) => {
              const active = name === "Production Planning";

              return (
                <button
                  key={name}
                  onClick={() => {
                    if (path !== "#") router.push(path);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    active
                      ? "bg-green-600 text-white shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span>{name}</span>
                  {active && <span>→</span>}
                </button>
              );
            })}
          </nav>

          <div className="mt-auto rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold text-gray-400">
              TODAY'S TARGET
            </p>
            <p className="mt-2 text-2xl font-black text-gray-900">1,210</p>
            <p className="text-xs text-gray-500">meals to prepare</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="px-6 pb-12 pt-28 lg:ml-64 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* PAGE INTRO */}
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-semibold text-green-600">
                AI-ASSISTED PLANNING
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
                Plan today's production
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Use predicted demand and historical surplus patterns to
                determine how much food should be prepared.
              </p>
            </div>

            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-green-500"
            >
              <option>All Meals</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-400">Predicted Demand</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-black">1,240</p>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                  meals
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Based on recent consumption
              </p>
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50 p-5 shadow-sm">
              <p className="text-sm text-green-700">Recommended Production</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-black text-green-700">
                  {recommendedProduction.toLocaleString()}
                </p>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-green-600">
                  meals
                </span>
              </div>
              <p className="mt-2 text-xs text-green-700/70">
                Optimized against expected surplus
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-400">Expected Surplus</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-black">{expectedSurplus}</p>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">
                  kg
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Estimated recoverable food
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-400">Estimated Cost</p>
              <div className="mt-3 flex items-end justify-between">
                <p className="text-3xl font-black">{totalCost}</p>
                <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-600">
                  today
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Based on planned ingredients
              </p>
            </div>
          </div>

          {/* RECOMMENDATION */}
          <div className="mt-6 rounded-2xl border border-green-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100">
                  <span className="text-lg font-black text-green-600">
                    AI
                  </span>
                </div>

                <div>
                  <p className="font-bold text-gray-900">
                    Production recommendation
                  </p>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    Based on predicted demand of{" "}
                    <span className="font-semibold text-gray-800">
                      1,240 meals
                    </span>{" "}
                    and recent surplus patterns, AAHAR recommends preparing{" "}
                    <span className="font-semibold text-green-600">
                      1,210 meals
                    </span>
                    .
                  </p>
                </div>
              </div>

              <button
                onClick={() => setPlanGenerated(true)}
                className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
              >
                {planGenerated ? "Plan Generated ✓" : "Generate Plan →"}
              </button>
            </div>
          </div>

          {/* TWO COLUMN AREA */}
          <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
            {/* INGREDIENT TABLE */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <div>
                  <h3 className="font-bold">Ingredient requirements</h3>
                  <p className="mt-1 text-xs text-gray-400">
                    Estimated quantities for today's plan
                  </p>
                </div>

                <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                  {mealType}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Ingredient</th>
                      <th className="px-6 py-4 font-semibold">Quantity</th>
                      <th className="px-6 py-4 font-semibold">Usage</th>
                      <th className="px-6 py-4 text-right font-semibold">
                        Est. Cost
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {ingredients.map((item) => (
                      <tr
                        key={item.name}
                        className="transition hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          {item.name}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.quantity}
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {item.usage}
                        </td>

                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-800">
                          {item.cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-6 py-4">
                <span className="text-sm font-semibold text-gray-500">
                  Total estimated ingredient cost
                </span>

                <span className="text-lg font-black text-gray-900">
                  {totalCost}
                </span>
              </div>
            </div>

            {/* PRODUCTION BREAKDOWN */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="font-bold">Production breakdown</h3>
              <p className="mt-1 text-xs text-gray-400">
                Recommended allocation
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">Lunch</span>
                    <span className="font-bold">620 meals</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[51%] rounded-full bg-green-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">Dinner</span>
                    <span className="font-bold">430 meals</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[36%] rounded-full bg-blue-500" />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium">Breakfast</span>
                    <span className="font-bold">160 meals</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[13%] rounded-full bg-orange-400" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Expected outcome
                </p>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xl font-black text-gray-900">3.4%</p>
                    <p className="text-xs text-gray-400">expected surplus</p>
                  </div>

                  <div>
                    <p className="text-xl font-black text-green-600">
                      ₹1,120
                    </p>
                    <p className="text-xs text-gray-400">
                      potential value recovery
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONFIRMATION */}
          <div className="mt-6 rounded-2xl bg-gray-900 p-6 text-white shadow-lg">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-bold">
                  Ready to finalize today's production?
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Confirming this plan will save it for today's production
                  workflow.
                </p>
              </div>

              <button
                onClick={() => setPlanGenerated(true)}
                className="rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-green-400"
              >
                Confirm Production Plan ✓
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}