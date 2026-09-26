"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
type KitchenRecord = {
  date: string;
  kitchen: string;
  meal_type: string;
  demand_estimate: number;
  food_prepared_kg: number;
  food_consumed_kg: number;
  surplus_kg: number;
  waste_kg: number;
};

export default function DemandPrediction() {
  const [days, setDays] = useState(7);
  const [predicted, setPredicted] = useState<number | null>(null);

  const [records, setRecords] = useState<KitchenRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    totalRecords: 0,
    averageDemand: 0,
    averageWaste: 0,
    averageSurplus: 0,
  });

  // --------------------------------------------------
  // LOAD DATA FROM FIRESTORE
  // --------------------------------------------------

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(
          collection(db, "kitchen_data")
        );

        const firestoreData: KitchenRecord[] = snapshot.docs.map(
          (doc) => {
            const data = doc.data();

            return {
              date: String(data.date ?? ""),
              kitchen: String(data.kitchen ?? ""),
              meal_type: String(data.meal_type ?? ""),
              demand_estimate: Number(
                data.demand_estimate ?? 0
              ),
              food_prepared_kg: Number(
                data.food_prepared_kg ?? 0
              ),
              food_consumed_kg: Number(
                data.food_consumed_kg ?? 0
              ),
              surplus_kg: Number(data.surplus_kg ?? 0),
              waste_kg: Number(data.waste_kg ?? 0),
            };
          }
        );

        // Sort newest → oldest
        firestoreData.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );

        setRecords(firestoreData);

        if (firestoreData.length > 0) {
          const totalDemand = firestoreData.reduce(
            (sum, item) => sum + item.demand_estimate,
            0
          );

          const totalWaste = firestoreData.reduce(
            (sum, item) => sum + item.waste_kg,
            0
          );

          const totalSurplus = firestoreData.reduce(
            (sum, item) => sum + item.surplus_kg,
            0
          );

          setStats({
            totalRecords: firestoreData.length,
            averageDemand: Math.round(
              totalDemand / firestoreData.length
            ),
            averageWaste: Number(
              (totalWaste / firestoreData.length).toFixed(1)
            ),
            averageSurplus: Number(
              (totalSurplus / firestoreData.length).toFixed(1)
            ),
          });
        }
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load kitchen data from Firebase."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // --------------------------------------------------
  // GENERATE PREDICTION
  // --------------------------------------------------

  const calculatePrediction = () => {
    if (records.length === 0) {
      setError("No historical kitchen data available.");
      return;
    }

    setGenerating(true);
    setError("");

    // Take the most recent requested number of records.
    // Dataset contains one daily record.
    const historicalRecords = records.slice(0, days);

    const totalDemand = historicalRecords.reduce(
      (sum, record) =>
        sum + record.demand_estimate,
      0
    );

    const average =
      totalDemand / historicalRecords.length;

    setPredicted(Math.round(average));

    setGenerating(false);
  };

  return (
    <main className="min-h-screen bg-[#f6f8f7]">

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white px-6 py-5 md:px-10">
        <div className="mx-auto max-w-6xl">

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
            Donor / Intelligence
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight">
            AI Demand Prediction
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Estimate upcoming meal demand using historical
            consumption patterns and support better production
            planning.
          </p>

        </div>
      </header>

      <div className="mx-auto max-w-6xl p-6 md:p-10">

        {/* FIREBASE DATA STATUS */}
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white px-5 py-4">

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Live data source
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                Firebase Firestore · kitchen_data
              </p>
            </div>

            {loading ? (
              <span className="rounded-full bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-700">
                Loading data...
              </span>
            ) : error ? (
              <span className="rounded-full bg-red-100 px-3 py-1.5 text-xs font-bold text-red-700">
                Connection error
              </span>
            ) : (
              <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">
                ● {records.length} records connected
              </span>
            )}

          </div>

        </section>

        {/* ERROR */}
        {error && (
          <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">

            <p className="text-sm font-bold text-red-700">
              {error}
            </p>

            <p className="mt-1 text-xs text-red-600">
              Check your Firebase Firestore configuration and
              security rules.
            </p>

          </section>
        )}

        {/* INPUT CARD */}
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl text-emerald-700">
              ◈
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Generate demand estimate
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                AAHAR uses recent consumption data stored in
                Firebase to estimate expected demand.
              </p>
            </div>

          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div>
              <label className="text-xs font-bold text-slate-500">
                Forecast period
              </label>

              <select
                value={days}
                onChange={(e) =>
                  setDays(Number(e.target.value))
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
              >
                <option value={1}>
                  Tomorrow
                </option>

                <option value={7}>
                  Next 7 days
                </option>

                <option value={14}>
                  Next 14 days
                </option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500">
                Historical data
              </label>

              <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                {loading
                  ? "Loading Firestore records..."
                  : `${records.length} historical records available`}
              </div>
            </div>

          </div>

          <button
            onClick={calculatePrediction}
            disabled={loading || records.length === 0 || generating}
            className="mt-7 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            {generating
              ? "Generating..."
              : "Generate Prediction →"}
          </button>

        </section>

        {/* RESULT */}
        {predicted !== null && (
          <section className="mt-6 grid gap-5 md:grid-cols-3">

            <div className="rounded-3xl bg-slate-950 p-7 text-white md:col-span-2">

              <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                Predicted demand
              </p>

              <div className="mt-4 flex items-end gap-3">

                <span className="text-5xl font-black">
                  {predicted.toLocaleString()}
                </span>

                <span className="mb-2 text-sm text-slate-400">
                  meals
                </span>

              </div>

              <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">
                Based on the most recent historical demand
                records stored in Firestore, AAHAR recommends
                planning production around this demand level.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-slate-300">
                  Historical average
                </span>

                <span className="rounded-full bg-emerald-500/20 px-3 py-1.5 text-xs text-emerald-300">
                  {days}-day window
                </span>

              </div>

            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7">

              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                Suggested production
              </p>

              <p className="mt-4 text-4xl font-black text-emerald-700">
                {Math.round(predicted * 0.97).toLocaleString()}
              </p>

              <p className="mt-2 text-sm text-emerald-700/70">
                meals
              </p>

              <p className="mt-5 text-xs leading-5 text-emerald-700/70">
                A 3% planning reduction is applied as an MVP
                buffer to help minimize unnecessary
                overproduction.
              </p>

            </div>

          </section>
        )}

        {/* DATA SUMMARY */}
        {!loading && records.length > 0 && (
          <section className="mt-6 grid gap-4 md:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Records
              </p>

              <p className="mt-2 text-2xl font-black text-slate-900">
                {stats.totalRecords}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Firestore records
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Avg demand
              </p>

              <p className="mt-2 text-2xl font-black text-slate-900">
                {stats.averageDemand.toLocaleString()}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                meals / day
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Avg surplus
              </p>

              <p className="mt-2 text-2xl font-black text-slate-900">
                {stats.averageSurplus}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                kg / day
              </p>

            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Avg waste
              </p>

              <p className="mt-2 text-2xl font-black text-slate-900">
                {stats.averageWaste}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                kg / day
              </p>

            </div>

          </section>
        )}

        {/* EXPLANATION */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-7">

          <h2 className="font-bold">
            How the MVP prediction works
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl bg-slate-50 p-5">

              <p className="text-2xl font-black text-emerald-600">
                01
              </p>

              <h3 className="mt-3 font-bold">
                Historical consumption
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Historical demand and consumption records are
                retrieved from the AAHAR Firestore database.
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5">

              <p className="text-2xl font-black text-emerald-600">
                02
              </p>

              <h3 className="mt-3 font-bold">
                Pattern analysis
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                The current MVP calculates a recent historical
                average to estimate upcoming demand.
              </p>

            </div>

            <div className="rounded-2xl bg-slate-50 p-5">

              <p className="text-2xl font-black text-emerald-600">
                03
              </p>

              <h3 className="mt-3 font-bold">
                Production planning
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                The estimate supports production planning and
                helps reduce unnecessary overproduction.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}