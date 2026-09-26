"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = [
  {
    id: "donor",
    title: "Donor",
    subtitle: "Institutional Kitchen / Food Unit",
    description:
      "Plan production, manage surplus and connect suitable food with verified destinations.",
    icon: "🏭",
    color: "green",
  },
  {
    id: "ngo",
    title: "Verified Organization",
    subtitle: "NGO / Food Recovery Partner",
    description:
      "Discover suitable surplus, coordinate requests and manage food recovery.",
    icon: "🤝",
    color: "blue",
  },
  {
    id: "receiver",
    title: "Receiver",
    subtitle: "Buyer / Food Recipient",
    description:
      "Discover nearby surplus food and access suitable recovery opportunities.",
    icon: "🛍️",
    color: "orange",
  },
];

export default function Home() {
  const [selectedRole, setSelectedRole] = useState("");

  const router = useRouter();

  const scrollToRoles = () => {
    document
      .getElementById("roles")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const continueToSignIn = () => {
    if (!selectedRole) return;

    router.push(`/signin?role=${selectedRole}`);
  };

  return (
    <main className="min-h-screen bg-[#f7faf8] text-gray-900">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

        <div className="mx-auto flex h-[64px] max-w-[1200px] items-center justify-between px-6">

          {/* LOGO */}

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-lg font-medium text-white shadow-sm">
              A
            </div>

            <div>

              <h1 className="text-[18px] font-bold leading-none tracking-tight">
                AAHAR
              </h1>

              <p className="mt-1 text-[8px] font-medium uppercase tracking-[0.18em] text-gray-400">
                Food Recovery Ecosystem
              </p>

            </div>

          </div>


          {/* NAV LINKS */}

          <div className="hidden items-center gap-8 text-[13px] font-medium text-gray-500 md:flex">

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="text-green-600 transition hover:text-green-700"
            >
              Home
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="transition hover:text-green-600"
            >
              How it works
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("impact")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  });
              }}
              className="transition hover:text-green-600"
            >
              Impact
            </button>

          </div>


          {/* SIGN IN */}

          <button
            onClick={scrollToRoles}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-[12px] font-semibold shadow-sm transition hover:border-green-300 hover:text-green-600"
          >
            Sign In
          </button>

        </div>

      </nav>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="how-it-works"
        className="relative overflow-hidden border-b border-gray-100"
      >

        {/* BACKGROUND IMAGE */}

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/65" />


        <div className="relative mx-auto grid min-h-[440px] max-w-[1200px] items-center gap-8 px-6 py-12 lg:grid-cols-[1.05fr_0.95fr]">

          {/* =================================================
              HERO LEFT
          ================================================= */}

          <div className="max-w-[570px]">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-[11px] font-semibold text-green-700">

              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

              Smart Food Recovery Ecosystem

            </div>


            <h2 className="text-[42px] font-black leading-[1.03] tracking-[-0.04em] text-gray-950 md:text-[48px]">

              Every meal

              <br />

              <span className="text-green-600">
                deserves a purpose.
              </span>

            </h2>


            <p className="mt-5 max-w-[520px] text-[14px] leading-6 text-gray-600">

              AAHAR connects food demand, production, surplus recovery and
              redistribution through one intelligent ecosystem.

            </p>


            {/* FEATURE PILLS */}

            <div className="mt-6 flex flex-wrap gap-2">

              <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-[11px] font-semibold shadow-sm">

                AI-assisted planning

              </div>

              <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-[11px] font-semibold shadow-sm">

                Surplus recovery

              </div>

              <div className="rounded-lg border border-gray-100 bg-white px-3 py-2 text-[11px] font-semibold shadow-sm">

                Smart matching

              </div>

            </div>


            {/* HERO ACTION */}

            <button
              onClick={scrollToRoles}
              className="mt-7 rounded-lg bg-green-600 px-5 py-2.5 text-[12px] font-bold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg"
            >
              Get started →
            </button>

          </div>


          {/* =================================================
              HERO RIGHT — FOOD VISUAL
          ================================================= */}

          <div className="hidden lg:block">

            <div className="relative mx-auto h-[330px] max-w-[420px]">

              {/* MAIN IMAGE */}

              <div className="absolute right-5 top-1 h-[245px] w-[245px] rotate-3 overflow-hidden rounded-[30px] shadow-xl">

                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
                  alt="Fresh food"
                  className="h-full w-full object-cover"
                />

              </div>


              {/* SECOND IMAGE */}

              <div className="absolute bottom-0 left-5 h-[175px] w-[175px] -rotate-6 overflow-hidden rounded-[26px] border-[6px] border-white shadow-xl">

                <img
                  src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=700&q=85"
                  alt="Prepared food"
                  className="h-full w-full object-cover"
                />

              </div>


              {/* IMPACT CARD */}

              <div className="absolute bottom-7 right-0 rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-lg">

                <p className="text-[9px] font-medium text-gray-400">
                  AAHAR IMPACT
                </p>

                <p className="mt-1 text-[18px] font-black text-green-600">
                  Less waste.
                </p>

                <p className="text-[11px] text-gray-500">
                  More value recovered.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ROLE SECTION
      ===================================================== */}

      <section
        id="roles"
        className="mx-auto max-w-[1200px] px-6 py-14"
      >

        {/* SECTION HEADER */}

        <div className="mb-8 text-center">

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-green-600">
            Get started
          </p>

          <h2 className="mt-2 text-[28px] font-black tracking-tight md:text-[32px]">
            How will you use AAHAR?
          </h2>

          <p className="mx-auto mt-2 max-w-[620px] text-[13px] leading-5 text-gray-500">

            Select your role to access the tools and services designed for
            your food recovery journey.

          </p>

        </div>


        {/* =================================================
            ROLE CARDS
        ================================================= */}

        <div className="grid gap-4 lg:grid-cols-3">

          {roles.map((role) => (

            <button
              key={role.id}
              onClick={() =>
                setSelectedRole(role.id)
              }
              className={`group relative overflow-hidden rounded-2xl border bg-white p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                selectedRole === role.id
                  ? "border-green-500 ring-2 ring-green-100"
                  : "border-gray-200"
              }`}
            >

              {/* COLOR GLOW */}

              <div
                className={`absolute right-0 top-0 h-24 w-24 rounded-full blur-3xl ${
                  role.color === "green"
                    ? "bg-green-200"
                    : role.color === "blue"
                    ? "bg-blue-200"
                    : "bg-orange-200"
                }`}
              />


              <div className="relative">

                {/* CARD TOP */}

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 text-xl shadow-sm">
                    {role.icon}
                  </div>

                  <span className="text-lg text-gray-300 transition group-hover:translate-x-1 group-hover:text-green-500">
                    →
                  </span>

                </div>


                {/* TITLE */}

                <h3 className="text-[17px] font-bold">
                  {role.title}
                </h3>


                <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-gray-400">
                  {role.subtitle}
                </p>


                <p className="mt-3 min-h-[58px] text-[12px] leading-5 text-gray-500">
                  {role.description}
                </p>


                <div className="mt-5 border-t border-gray-100 pt-4 text-[11px] font-bold text-green-600">
                  Continue as {role.title} →
                </div>

              </div>

            </button>

          ))}

        </div>


        {/* =================================================
            SELECTED ROLE
        ================================================= */}

        {selectedRole && (

          <div className="mx-auto mt-6 flex max-w-[560px] items-center justify-between rounded-xl border border-green-200 bg-green-50 px-4 py-3">

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-green-600">
                Selected role
              </p>

              <p className="mt-0.5 text-[13px] font-bold">
                {
                  roles.find(
                    (r) => r.id === selectedRole
                  )?.title
                }
              </p>

            </div>


            <button
              onClick={continueToSignIn}
              className="rounded-lg bg-green-600 px-5 py-2.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-green-700"
            >
              Continue to sign in →
            </button>

          </div>

        )}

      </section>


      {/* =====================================================
          IMPACT STRIP
      ===================================================== */}

      <section
        id="impact"
        className="border-y border-gray-200 bg-white"
      >

        <div className="mx-auto grid max-w-[1200px] grid-cols-3 divide-x divide-gray-200 px-6 py-7">

          <div className="px-5 text-center">

            <p className="text-[22px] font-black text-green-600">
              Reduce
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Avoid unnecessary food waste
            </p>

          </div>


          <div className="px-5 text-center">

            <p className="text-[22px] font-black text-green-600">
              Redistribute
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Connect surplus with suitable destinations
            </p>

          </div>


          <div className="px-5 text-center">

            <p className="text-[22px] font-black text-green-600">
              Recover
            </p>

            <p className="mt-1 text-[10px] text-gray-500">
              Enable responsible recovery
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-gray-200 bg-white">

        <div className="mx-auto flex max-w-[1200px] flex-col justify-between gap-2 px-6 py-5 text-[10px] text-gray-400 md:flex-row">

          <p>
            © 2026 AAHAR
          </p>

          <p>
            Every Meal Deserves a Purpose.
          </p>

        </div>

      </footer>

    </main>
  );
}