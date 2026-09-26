"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Role = "donor" | "ngo" | "receiver";

const roleData = {
  donor: {
    title: "Donor / Institution",
    shortTitle: "Donor",
    subtitle: "Manage surplus food and reduce institutional food waste.",
    dashboard: "/donor",
    icon: "▣",
    placeholder: "institution@example.com",
  },

  ngo: {
    title: "NGO / Verified Organization",
    shortTitle: "NGO",
    subtitle: "Find, request and coordinate surplus food redistribution.",
    dashboard: "/ngo",
    icon: "♢",
    placeholder: "organization@example.com",
  },

  receiver: {
    title: "Receiver",
    shortTitle: "Receiver",
    subtitle: "Discover available food and request suitable surplus.",
    dashboard: "/receiver",
    icon: "○",
    placeholder: "you@example.com",
  },
};

export default function SignInPage() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("donor");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get("role");

    setRole(
      roleParam === "ngo"
        ? "ngo"
        : roleParam === "receiver"
        ? "receiver"
        : "donor"
    );
  }, []);

  const currentRole = roleData[role];

  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* =========================================================
     SIGN IN
  ========================================================= */

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Demo authentication
      // Firebase authentication can be connected later.

      router.push(currentRole.dashboard);
    }, 700);
  };

  /* =========================================================
     CREATE ACCOUNT
  ========================================================= */

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert(
        `Account created successfully for ${currentRole.title}. You can now sign in.`
      );

      setShowCreateAccount(false);
      setPassword("");
      setConfirmPassword("");
    }, 700);
  };

  return (
    <main className="page">

      {/* =========================================================
          LEFT BRAND PANEL
      ========================================================= */}

      <section className="brandPanel">

        <div className="brandGlow glowOne" />
        <div className="brandGlow glowTwo" />

        {/* BRAND HEADER */}

        <header className="brandHeader">

          <button
            className="brandLogo"
            onClick={() => router.push("/")}
          >
            A
          </button>

          <div>
            <div className="brandName">
              AAHAR
            </div>

            <div className="brandMini">
              Every Meal Deserves a Purpose
            </div>
          </div>

        </header>


        {/* HERO */}

        <div className="heroContent">

          <div className="eyebrow">
            <span className="eyebrowDot" />
            SMART FOOD REDISTRIBUTION ECOSYSTEM
          </div>


          <h1>
            Turning surplus
            <br />
            <span>into impact.</span>
          </h1>


          <p className="heroText">
            AAHAR connects institutional food donors,
            verified organizations and receivers to reduce
            food waste, redistribute surplus and enable
            sustainable recovery.
          </p>


          {/* FEATURES */}

          <div className="featureList">

            <Feature
              number="01"
              title="Predict"
              text="AI-powered demand and production planning"
            />

            <Feature
              number="02"
              title="Redistribute"
              text="Smart matching between surplus and recipients"
            />

            <Feature
              number="03"
              title="Recover"
              text="Responsible recovery for unmatched surplus"
            />

          </div>


          {/* IMPACT */}

          <div className="impactCards">

            <div className="impactCard">

              <span className="impactIcon">
                ↘
              </span>

              <div>
                <strong>
                  Reduce
                </strong>

                <small>
                  Food Waste
                </small>
              </div>

            </div>


            <div className="impactCard">

              <span className="impactIcon">
                ⇄
              </span>

              <div>
                <strong>
                  Redistribute
                </strong>

                <small>
                  Surplus Food
                </small>
              </div>

            </div>


            <div className="impactCard">

              <span className="impactIcon">
                ♻
              </span>

              <div>
                <strong>
                  Recover
                </strong>

                <small>
                  Unmatched Food
                </small>
              </div>

            </div>

          </div>

        </div>


        {/* LEFT FOOTER */}

        <div className="brandFooter">

          <span>AAHAR</span>

          <span>•</span>

          <span>
            Smart Food Waste Reduction
          </span>

        </div>

      </section>


      {/* =========================================================
          RIGHT AUTH PANEL
      ========================================================= */}

      <section className="authPanel">

        {/* TOP BAR */}

        <div className="authTopBar">

          <div className="secureBadge">

            <span>
              ✓
            </span>

            Secure role-based access

          </div>


          <button
            className="backButton"
            onClick={() => router.push("/")}
          >
            ← Change role
          </button>

        </div>


        {/* AUTH CONTAINER */}

        <div className="authContainer">

          {!showCreateAccount ? (

            /* =====================================================
               SIGN IN
            ===================================================== */

            <div className="authCard">

              {/* SELECTED ROLE */}

              <div className="selectedRoleHeader">

                <div className="selectedRole">

                  <div className="roleIcon">
                    {currentRole.icon}
                  </div>

                  <div>

                    <span className="roleCaption">
                      SIGNING IN AS
                    </span>

                    <strong>
                      {currentRole.title}
                    </strong>

                  </div>

                </div>

              </div>


              {/* HEADING */}

              <div className="authHeading">

                <span className="welcomeLabel">
                  AAHAR PLATFORM
                </span>

                <h2>
                  Welcome back
                </h2>

                <p>
                  {currentRole.subtitle}
                </p>

              </div>


              {/* SIGN IN FORM */}

              <form onSubmit={handleSignIn}>

                {/* EMAIL */}

                <div className="field">

                  <label>
                    Email address
                  </label>

                  <div className="inputWrapper">

                    <span className="inputIcon">
                      @
                    </span>

                    <input
                      type="email"
                      value={email}
                      placeholder={currentRole.placeholder}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div className="field">

                  <div className="labelRow">

                    <label>
                      Password
                    </label>

                    <button
                      type="button"
                      className="forgotButton"
                      onClick={() =>
                        setError(
                          "Password recovery will be connected with Firebase."
                        )
                      }
                    >
                      Forgot password?
                    </button>

                  </div>


                  <div className="inputWrapper">

                    <span className="inputIcon">
                      •••
                    </span>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      placeholder="Enter your password"
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />

                    <button
                      type="button"
                      className="passwordToggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword
                        ? "Hide"
                        : "Show"}
                    </button>

                  </div>

                </div>


                {/* OPTIONS */}

                <div className="formOptions">

                  <label className="remember">

                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(e) =>
                        setRemember(e.target.checked)
                      }
                    />

                    <span>
                      Remember me
                    </span>

                  </label>


                  <span className="demoText">
                    Demo access enabled
                  </span>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="errorBox">

                    <span>
                      !
                    </span>

                    {error}

                  </div>

                )}


                {/* BUTTON */}

                <button
                  type="submit"
                  className="primaryButton"
                  disabled={loading}
                >

                  {loading ? (

                    <>
                      <span className="spinner" />
                      Signing in...
                    </>

                  ) : (

                    <>
                      Sign in
                      <span className="arrow">
                        →
                      </span>
                    </>

                  )}

                </button>

              </form>


              {/* DIVIDER */}

              <div className="divider">

                <span />

                <p>
                  OR
                </p>

                <span />

              </div>


              {/* CREATE ACCOUNT */}

              <div className="createPrompt">

                <span>
                  Don't have an AAHAR account?
                </span>

                <button
                  onClick={() => {
                    setShowCreateAccount(true);
                    setError("");
                  }}
                >
                  Create an account
                </button>

              </div>


              {/* SECURITY */}

              <div className="securityNotice">

                <div className="securityIcon">
                  ✓
                </div>

                <div>

                  <strong>
                    Secure role-based access
                  </strong>

                  <p>
                    You will be connected only to the
                    dashboard associated with your selected role.
                  </p>

                </div>

              </div>

            </div>

          ) : (

            /* =====================================================
               CREATE ACCOUNT
            ===================================================== */

            <div className="authCard createCard">

              {/* BACK */}

              <button
                className="backToLogin"
                onClick={() => {
                  setShowCreateAccount(false);
                  setError("");
                }}
              >
                ← Back to sign in
              </button>


              {/* HEADING */}

              <div className="authHeading createHeading">

                <span className="welcomeLabel">
                  JOIN AAHAR
                </span>

                <h2>
                  Create your account
                </h2>

                <p>
                  Register as a{" "}
                  {currentRole.shortTitle}
                  {" "}and become part of the AAHAR ecosystem.
                </p>

              </div>


              <form onSubmit={handleCreateAccount}>

                {/* NAME */}

                <div className="field">

                  <label>

                    {role === "donor"
                      ? "Institution name"
                      : role === "ngo"
                      ? "Organization name"
                      : "Name / Organization"}

                  </label>


                  <div className="inputWrapper">

                    <span className="inputIcon">
                      ◉
                    </span>

                    <input
                      type="text"
                      placeholder={
                        role === "donor"
                          ? "Enter institution name"
                          : role === "ngo"
                          ? "Enter organization name"
                          : "Enter your name"
                      }
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                    />

                  </div>

                </div>


                {/* EMAIL + PHONE */}

                <div className="twoColumnFields">

                  <div className="field">

                    <label>
                      Email address
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        @
                      </span>

                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) =>
                          setEmail(e.target.value)
                        }
                      />

                    </div>

                  </div>


                  <div className="field">

                    <label>
                      Phone number
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        #
                      </span>

                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) =>
                          setPhone(e.target.value)
                        }
                      />

                    </div>

                  </div>

                </div>


                {/* DONOR TYPE */}

                {role === "donor" && (

                  <div className="field">

                    <label>
                      Institution type
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        ▣
                      </span>

                      <select defaultValue="College / University">

                        <option>
                          College / University
                        </option>

                        <option>
                          Hospital
                        </option>

                        <option>
                          Hotel
                        </option>

                        <option>
                          Hostel
                        </option>

                        <option>
                          Food Processing Unit
                        </option>

                        <option>
                          Corporate Cafeteria
                        </option>

                        <option>
                          Other
                        </option>

                      </select>

                    </div>

                  </div>

                )}


                {/* NGO */}

                {role === "ngo" && (

                  <div className="field">

                    <label>
                      NGO / Registration ID
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        #
                      </span>

                      <input
                        type="text"
                        placeholder="Registration ID"
                      />

                    </div>

                  </div>

                )}


                {/* RECEIVER */}

                {role === "receiver" && (

                  <div className="field">

                    <label>
                      Receiver type
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        ◇
                      </span>

                      <select defaultValue="Individual">

                        <option>
                          Individual
                        </option>

                        <option>
                          Family
                        </option>

                        <option>
                          Community Group
                        </option>

                        <option>
                          Organization
                        </option>

                      </select>

                    </div>

                  </div>

                )}


                {/* ADDRESS */}

                <div className="field">

                  <label>
                    Address
                  </label>

                  <div className="inputWrapper">

                    <span className="inputIcon">
                      ⌖
                    </span>

                    <input
                      type="text"
                      placeholder="Enter your address"
                      value={address}
                      onChange={(e) =>
                        setAddress(e.target.value)
                      }
                    />

                  </div>

                </div>


                {/* PASSWORD */}

                <div className="twoColumnFields">

                  <div className="field">

                    <label>
                      Password
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        •••
                      </span>

                      <input
                        type="password"
                        placeholder="Create password"
                        value={password}
                        onChange={(e) =>
                          setPassword(e.target.value)
                        }
                      />

                    </div>

                  </div>


                  <div className="field">

                    <label>
                      Confirm password
                    </label>

                    <div className="inputWrapper">

                      <span className="inputIcon">
                        •••
                      </span>

                      <input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                          setConfirmPassword(e.target.value)
                        }
                      />

                    </div>

                  </div>

                </div>


                {/* ERROR */}

                {error && (

                  <div className="errorBox">

                    <span>
                      !
                    </span>

                    {error}

                  </div>

                )}


                {/* CREATE BUTTON */}

                <button
                  type="submit"
                  className="primaryButton"
                  disabled={loading}
                >

                  {loading ? (

                    <>
                      <span className="spinner" />
                      Creating account...
                    </>

                  ) : (

                    <>
                      Create account
                      <span className="arrow">
                        →
                      </span>
                    </>

                  )}

                </button>

              </form>


              <div className="terms">

                By creating an account, you agree to use
                AAHAR responsibly and provide accurate
                information.

              </div>

            </div>

          )}

        </div>


        {/* FOOTER */}

        <footer className="authFooter">

          <span>
            © 2026 AAHAR
          </span>

          <span>
            •
          </span>

          <span>
            Every Meal Deserves a Purpose
          </span>

        </footer>

      </section>


      {/* =========================================================
          STYLES
      ========================================================= */}

      <style jsx>{`

        * {
          box-sizing: border-box;
        }


        /* =====================================================
           PAGE
        ===================================================== */

        .page {
          min-height: 100vh;
          width: 100%;

          display: grid;

          grid-template-columns:
            47%
            53%;

          background: #f6f8f6;

          color: #18221d;

          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }


        /* =====================================================
           LEFT BRAND PANEL
        ===================================================== */

        .brandPanel {
          position: relative;

          min-height: 100vh;

          overflow: hidden;

          padding:
            32px
            7vw
            25px
            6vw;

          color: white;

          background:
            radial-gradient(
              circle at 78% 18%,
              rgba(71,190,127,0.20),
              transparent 30%
            ),
            linear-gradient(
              145deg,
              #064d31 0%,
              #087443 52%,
              #075c38 100%
            );

          display: flex;

          flex-direction: column;

          justify-content: space-between;
        }


        .brandPanel::before {
          content: "";

          position: absolute;

          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.035) 1px,
              transparent 1px
            );

          background-size: 42px 42px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 90%
            );

          pointer-events: none;
        }


        .brandGlow {
          position: absolute;

          border-radius: 50%;

          border:
            1px solid
            rgba(255,255,255,0.08);

          pointer-events: none;
        }


        .glowOne {
          width: 520px;
          height: 520px;

          right: -285px;
          top: -190px;
        }


        .glowTwo {
          width: 390px;
          height: 390px;

          left: -285px;
          bottom: -230px;
        }


        /* =====================================================
           BRAND HEADER
        ===================================================== */

        .brandHeader {
          position: relative;

          z-index: 2;

          display: flex;

          align-items: center;

          gap: 12px;
        }


        .brandLogo {
          width: 39px;
          height: 39px;

          border-radius: 11px;

          border:
            1px solid
            rgba(255,255,255,0.25);

          background:
            rgba(255,255,255,0.11);

          color: white;

          font-size: 18px;

          font-weight: 800;

          cursor: pointer;

          backdrop-filter: blur(10px);
        }


        .brandName {
          font-size: 17px;

          font-weight: 850;

          letter-spacing:
            0.15em;
        }


        .brandMini {
          margin-top: 2px;

          color:
            rgba(255,255,255,0.65);

          font-size: 9px;
        }


        /* =====================================================
           HERO
        ===================================================== */

        .heroContent {
          position: relative;

          z-index: 2;

          width: 100%;

          max-width: 560px;

          margin: auto 0;

          padding:
            38px
            0;
        }


        .eyebrow {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding:
            7px
            11px;

          border:
            1px solid
            rgba(255,255,255,0.14);

          background:
            rgba(255,255,255,0.065);

          border-radius: 999px;

          color:
            rgba(255,255,255,0.78);

          font-size: 8px;

          font-weight: 750;

          letter-spacing:
            0.11em;
        }


        .eyebrowDot {
          width: 6px;
          height: 6px;

          background: #8de0b1;

          border-radius: 50%;

          box-shadow:
            0 0 0 4px
            rgba(141,224,177,0.10);
        }


        .heroContent h1 {
          margin:
            21px
            0
            14px;

          font-size:
            clamp(
              34px,
              3.3vw,
              50px
            );

          line-height: 1.02;

          letter-spacing:
            -0.045em;

          font-weight: 800;
        }


        .heroContent h1 span {
          color: #8de0b1;
        }


        .heroText {
          max-width: 490px;

          margin: 0;

          color:
            rgba(255,255,255,0.70);

          font-size: 12px;

          line-height: 1.65;
        }


        /* =====================================================
           FEATURES
        ===================================================== */

        .featureList {
          margin-top: 27px;

          display: grid;

          grid-template-columns:
            repeat(3,1fr);

          gap: 9px;
        }


        .feature {
          min-height: 83px;

          padding: 12px;

          border:
            1px solid
            rgba(255,255,255,0.11);

          border-radius: 13px;

          background:
            rgba(255,255,255,0.055);

          backdrop-filter: blur(10px);
        }


        .featureNumber {
          display: block;

          color: #8de0b1;

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 0.1em;

          margin-bottom: 11px;
        }


        .featureTitle {
          display: block;

          font-size: 11px;

          font-weight: 750;

          margin-bottom: 5px;
        }


        .featureText {
          display: block;

          color:
            rgba(255,255,255,0.54);

          font-size: 8px;

          line-height: 1.45;
        }


        /* =====================================================
           IMPACT
        ===================================================== */

        .impactCards {
          margin-top: 15px;

          display: flex;

          gap: 8px;
        }


        .impactCard {
          flex: 1;

          display: flex;

          align-items: center;

          gap: 9px;

          padding:
            10px
            12px;

          border-radius: 11px;

          background:
            rgba(0,0,0,0.09);

          border:
            1px solid
            rgba(255,255,255,0.07);
        }


        .impactIcon {
          width: 26px;
          height: 26px;

          display: grid;

          place-items: center;

          border-radius: 8px;

          background:
            rgba(255,255,255,0.09);

          color: #9ce6bc;

          font-size: 11px;
        }


        .impactCard strong {
          display: block;

          font-size: 9px;
        }


        .impactCard small {
          display: block;

          margin-top: 2px;

          color:
            rgba(255,255,255,0.48);

          font-size: 7px;
        }


        /* =====================================================
           BRAND FOOTER
        ===================================================== */

        .brandFooter {
          position: relative;

          z-index: 2;

          display: flex;

          gap: 7px;

          color:
            rgba(255,255,255,0.34);

          font-size: 8px;
        }


        /* =====================================================
           RIGHT PANEL
        ===================================================== */

        .authPanel {
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 90% 8%,
              rgba(8,116,67,0.055),
              transparent 30%
            ),
            #f7f9f7;

          display: flex;

          flex-direction: column;
        }


        /* =====================================================
           TOP BAR
        ===================================================== */

        .authTopBar {
          height: 68px;

          padding:
            0
            5vw;

          display: flex;

          align-items: center;

          justify-content:
            space-between;
        }


        .secureBadge {
          display: flex;

          align-items: center;

          gap: 7px;

          color: #647169;

          font-size: 10px;

          font-weight: 650;
        }


        .secureBadge span {
          width: 20px;
          height: 20px;

          display: grid;

          place-items: center;

          border-radius: 6px;

          color: #087443;

          background: #e4f4ea;

          font-size: 10px;
        }


        .backButton {
          border: 0;

          background: transparent;

          color: #5e6b64;

          font-size: 10px;

          font-weight: 650;

          cursor: pointer;
        }


        .backButton:hover {
          color: #087443;
        }


        /* =====================================================
           AUTH CONTAINER
        ===================================================== */

        .authContainer {
          flex: 1;

          display: flex;

          align-items: center;

          justify-content: center;

          padding:
            20px
            5vw
            40px;
        }


        /* =====================================================
           AUTH CARD
        ===================================================== */

        .authCard {
          width:
            min(
              100%,
              570px
            );

          padding:
            42px
            48px;

          border:
            1px solid
            #dfe7e1;

          border-radius: 22px;

          background:
            rgba(255,255,255,0.97);

          box-shadow:
            0 26px 75px
            rgba(27,52,39,0.10),

            0 5px 18px
            rgba(27,52,39,0.04);
        }


        /* =====================================================
           SELECTED ROLE
        ===================================================== */

        .selectedRoleHeader {
          padding-bottom: 22px;

          border-bottom:
            1px solid
            #e6ebe8;
        }


        .selectedRole {
          display: flex;

          align-items: center;

          gap: 13px;
        }


        .roleIcon {
          width: 45px;
          height: 45px;

          display: grid;

          place-items: center;

          border-radius: 12px;

          background: #e7f4ec;

          color: #087443;

          font-size: 18px;

          font-weight: 800;
        }


        .roleCaption {
          display: block;

          color: #87928b;

          font-size: 8px;

          font-weight: 800;

          letter-spacing:
            0.12em;

          margin-bottom: 5px;
        }


        .selectedRole strong {
          display: block;

          color: #173025;

          font-size: 14px;
        }


        /* =====================================================
           AUTH HEADING
        ===================================================== */

        .authHeading {
          padding:
            29px
            0
            26px;
        }


        .welcomeLabel {
          color: #087443;

          font-size: 9px;

          font-weight: 800;

          letter-spacing:
            0.13em;
        }


        .authHeading h2 {
          margin:
            8px
            0
            8px;

          color: #16241c;

          font-size: 36px;

          line-height: 1.1;

          letter-spacing:
            -0.04em;
        }


        .authHeading p {
          margin: 0;

          color: #7a857e;

          font-size: 13px;

          line-height: 1.55;
        }


        /* =====================================================
           FORM
        ===================================================== */

        .field {
          margin-bottom: 18px;
        }


        .field label {
          display: block;

          margin-bottom: 8px;

          color: #34423a;

          font-size: 11px;

          font-weight: 750;
        }


        .labelRow {
          display: flex;

          align-items: center;

          justify-content:
            space-between;
        }


        .forgotButton {
          border: 0;

          background: transparent;

          padding: 0;

          color: #087443;

          font-size: 9px;

          font-weight: 700;

          cursor: pointer;
        }


        /* =====================================================
           INPUTS
        ===================================================== */

        .inputWrapper {
          min-height: 52px;

          display: flex;

          align-items: center;

          gap: 10px;

          padding:
            0
            14px;

          border:
            1px solid
            #d9e2dc;

          border-radius: 10px;

          background: white;

          transition:
            0.2s ease;
        }


        .inputWrapper:focus-within {
          border-color: #65a987;

          box-shadow:
            0 0 0 3px
            rgba(8,116,67,0.08);
        }


        .inputIcon {
          width: 20px;

          color: #849088;

          font-size: 11px;

          text-align: center;

          flex-shrink: 0;
        }


        .inputWrapper input,
        .inputWrapper select {
          width: 100%;

          min-width: 0;

          height: 50px;

          border: 0;

          outline: 0;

          background: transparent;

          color: #25352c;

          font: inherit;

          font-size: 13px;
        }


        .inputWrapper input::placeholder {
          color: #aab3ae;
        }


        .inputWrapper select {
          cursor: pointer;
        }


        .passwordToggle {
          border: 0;

          background: transparent;

          color: #087443;

          font-size: 9px;

          font-weight: 750;

          cursor: pointer;
        }


        /* =====================================================
           OPTIONS
        ===================================================== */

        .formOptions {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          margin:
            3px
            0
            19px;
        }


        .remember {
          display: flex;

          align-items: center;

          gap: 7px;

          color: #68746d;

          font-size: 10px;

          cursor: pointer;
        }


        .remember input {
          width: 13px;
          height: 13px;

          accent-color: #087443;
        }


        .demoText {
          color: #99a29d;

          font-size: 9px;
        }


        /* =====================================================
           BUTTON
        ===================================================== */

        .primaryButton {
          width: 100%;

          height: 53px;

          border: 0;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              #087443,
              #09643b
            );

          color: white;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 9px 22px
            rgba(8,116,67,0.18);

          transition:
            0.2s ease;
        }


        .primaryButton:hover {
          transform:
            translateY(-1px);

          box-shadow:
            0 13px 28px
            rgba(8,116,67,0.22);
        }


        .primaryButton:disabled {
          opacity: 0.7;

          cursor: not-allowed;

          transform: none;
        }


        .arrow {
          font-size: 17px;
        }


        /* =====================================================
           SPINNER
        ===================================================== */

        .spinner {
          width: 15px;
          height: 15px;

          border:
            2px solid
            rgba(255,255,255,0.35);

          border-top-color:
            white;

          border-radius: 50%;

          animation:
            spin 0.7s linear infinite;
        }


        @keyframes spin {

          to {
            transform:
              rotate(360deg);
          }

        }


        /* =====================================================
           ERROR
        ===================================================== */

        .errorBox {
          display: flex;

          align-items: center;

          gap: 8px;

          margin-bottom: 15px;

          padding:
            11px
            12px;

          border-radius: 9px;

          background: #fff3f1;

          border:
            1px solid
            #f4d7d1;

          color: #a34d40;

          font-size: 10px;
        }


        .errorBox span {
          width: 18px;
          height: 18px;

          display: grid;

          place-items: center;

          border-radius: 50%;

          background: #e36d5d;

          color: white;

          font-size: 9px;

          font-weight: 800;
        }


        /* =====================================================
           DIVIDER
        ===================================================== */

        .divider {
          display: flex;

          align-items: center;

          gap: 10px;

          margin:
            27px
            0
            19px;
        }


        .divider span {
          flex: 1;

          height: 1px;

          background: #e9eeeb;
        }


        .divider p {
          margin: 0;

          color: #a1aaa5;

          font-size: 8px;

          font-weight: 750;
        }


        /* =====================================================
           CREATE ACCOUNT
        ===================================================== */

        .createPrompt {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 5px;

          color: #7a857e;

          font-size: 10px;
        }


        .createPrompt button {
          border: 0;

          background: transparent;

          color: #087443;

          font-size: 10px;

          font-weight: 800;

          cursor: pointer;
        }


        /* =====================================================
           SECURITY
        ===================================================== */

        .securityNotice {
          display: flex;

          gap: 11px;

          margin-top: 24px;

          padding: 13px;

          border:
            1px solid
            #e3ebe6;

          border-radius: 10px;

          background: #f7faf8;
        }


        .securityIcon {
          width: 27px;
          height: 27px;

          display: grid;

          place-items: center;

          flex-shrink: 0;

          border-radius: 7px;

          background: #e0f2e7;

          color: #087443;

          font-size: 10px;

          font-weight: 800;
        }


        .securityNotice strong {
          display: block;

          color: #445249;

          font-size: 10px;
        }


        .securityNotice p {
          margin:
            3px
            0
            0;

          color: #89948e;

          font-size: 8px;

          line-height: 1.45;
        }


        /* =====================================================
           CREATE ACCOUNT
        ===================================================== */

        .createCard {
          max-height: 90vh;

          overflow-y: auto;
        }


        .backToLogin {
          border: 0;

          background: transparent;

          padding: 0;

          color: #087443;

          font-size: 10px;

          font-weight: 750;

          cursor: pointer;

          margin-bottom: 18px;
        }


        .createHeading {
          padding-top: 0;

          padding-bottom: 22px;
        }


        .twoColumnFields {
          display: grid;

          grid-template-columns:
            1fr
            1fr;

          gap: 13px;
        }


        .terms {
          margin-top: 15px;

          text-align: center;

          color: #9aa39e;

          font-size: 8px;

          line-height: 1.5;
        }


        /* =====================================================
           FOOTER
        ===================================================== */

        .authFooter {
          height: 48px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          color: #a0aaa4;

          font-size: 9px;
        }


        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1200px) {

          .page {
            grid-template-columns:
              44%
              56%;
          }


          .brandPanel {
            padding-left: 5vw;
            padding-right: 5vw;
          }


          .heroContent h1 {
            font-size: 42px;
          }


          .authCard {
            width:
              min(
                100%,
                540px
              );

            padding:
              36px
              38px;
          }

        }


        @media (max-width: 950px) {

          .page {
            grid-template-columns:
              42%
              58%;
          }


          .featureList {
            grid-template-columns:
              1fr;
          }


          .feature {
            min-height: auto;
          }


          .impactCards {
            flex-direction: column;
          }


          .heroContent h1 {
            font-size: 38px;
          }

        }


        @media (max-width: 800px) {

          .page {
            display: block;
          }


          .brandPanel {
            min-height: auto;

            padding:
              27px
              25px
              35px;
          }


          .heroContent {
            padding:
              60px
              0
              30px;
          }


          .heroContent h1 {
            font-size: 45px;
          }


          .featureList {
            grid-template-columns:
              repeat(3,1fr);
          }


          .featureText {
            display: none;
          }


          .impactCards {
            flex-direction: row;
          }


          .authPanel {
            min-height: auto;
          }


          .authTopBar {
            padding:
              0
              25px;
          }


          .authContainer {
            padding:
              25px;
          }

        }


        @media (max-width: 560px) {

          .brandPanel {
            padding:
              24px
              20px
              30px;
          }


          .brandMini {
            display: none;
          }


          .heroContent {
            padding-top: 50px;
          }


          .heroContent h1 {
            font-size: 40px;
          }


          .heroText {
            font-size: 13px;
          }


          .featureList {
            grid-template-columns:
              1fr;
          }


          .featureText {
            display: block;
          }


          .impactCards {
            flex-direction: column;
          }


          .authTopBar {
            height: 65px;

            padding:
              0
              20px;
          }


          .secureBadge {
            display: none;
          }


          .authContainer {
            padding:
              20px;
          }


          .authCard {
            padding:
              28px
              22px;

            border-radius: 17px;
          }


          .twoColumnFields {
            grid-template-columns:
              1fr;

            gap: 0;
          }


          .authHeading h2 {
            font-size: 29px;
          }

        }

      `}</style>

    </main>
  );
}


/* =============================================================
   FEATURE COMPONENT
============================================================= */

function Feature({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="feature">

      <span className="featureNumber">
        {number}
      </span>

      <span className="featureTitle">
        {title}
      </span>

      <span className="featureText">
        {text}
      </span>

    </div>
  );
}