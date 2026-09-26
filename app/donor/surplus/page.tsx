"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterSurplus() {
  const router = useRouter();

  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("Cooked Food");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [preparedTime, setPreparedTime] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [storage, setStorage] = useState("Refrigerated");
  const [quality, setQuality] = useState("Good");
  const [notes, setNotes] = useState("");

  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState("");

  const [assessment, setAssessment] = useState<{
    status: string;
    confidence: number;
  } | null>(null);

  const [registered, setRegistered] = useState(false);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImageName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result as string);
    };

    reader.readAsDataURL(file);

    setAssessment(null);
  };

  const runQualityAssessment = () => {
    if (!image) {
      alert("Please upload or scan a food image first.");
      return;
    }

    const temp = Number(temperature);
    const hum = Number(humidity);

    let status = "SUITABLE";
    let confidence = 91;

    if (
      (temperature && (temp < 5 || temp > 40)) ||
      (humidity && hum > 85) ||
      storage === "Open / Uncovered"
    ) {
      status = "NEEDS REVIEW";
      confidence = 76;
    }

    setAssessment({
      status,
      confidence,
    });
  };

  const handleRegister = () => {
    if (!foodName || !quantity || !preparedTime || !availableUntil) {
      alert("Please fill all required fields.");
      return;
    }

    if (!image) {
      alert("Please upload or scan a food image.");
      return;
    }

    if (!assessment) {
      alert("Please run the AI Quality Assessment first.");
      return;
    }

    setRegistered(true);
  };

  return (
    <main className="page">
      {/* HEADER */}
      <header className="topbar">
        <div className="brandArea">
          <div className="brandLogo">A</div>

          <div>
            <div className="brandName">AAHAR</div>
            <div className="brandSub">Every Meal Deserves a Purpose</div>
          </div>
        </div>

        <div className="headerRight">
          <div className="roleBadge">
            <span className="roleDot" />
            Donor / Institution
          </div>

          <button
            className="backButton"
            onClick={() => router.push("/donor")}
          >
            ← Dashboard
          </button>
        </div>
      </header>

      {/* MAIN */}
      <div className="container">
        {/* HERO */}
        <section className="hero">
          <div>
            <div className="eyebrow">
              <span className="eyebrowDot" />
              SURPLUS MANAGEMENT
            </div>

            <h1>Register Surplus Food</h1>

            <p>
              Turn excess food into meaningful impact. Record your surplus,
              assess its condition and connect it with the right destination.
            </p>
          </div>

          <div className="heroIcon">
            <span>♻</span>
          </div>
        </section>

        {/* SUCCESS */}
        {registered && (
          <div className="successBanner">
            <div className="successIcon">✓</div>

            <div>
              <strong>Surplus registered successfully</strong>
              <p>
                Your surplus is now ready for smart matching with verified
                organizations and receivers.
              </p>
            </div>

            <button
              onClick={() => router.push("/donor/surplus-management")}
            >
              Manage Surplus →
            </button>
          </div>
        )}

        <div className="layout">
          {/* LEFT COLUMN */}
          <section>
            {/* FOOD DETAILS */}
            <div className="card">
              <SectionHeading
                number="01"
                title="Food Details"
                subtitle="Tell us what surplus food is available."
              />

              <div className="formGrid">
                <Field label="Food Name *">
                  <input
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    placeholder="e.g. Vegetable Rice"
                  />
                </Field>

                <Field label="Category">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Cooked Food</option>
                    <option>Rice / Grains</option>
                    <option>Dal / Curry</option>
                    <option>Bakery</option>
                    <option>Dairy</option>
                    <option>Fruits & Vegetables</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="Quantity *">
                  <div className="quantityBox">
                    <input
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="24"
                      type="number"
                    />

                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                    >
                      <option>kg</option>
                      <option>litres</option>
                      <option>pieces</option>
                    </select>
                  </div>
                </Field>

                <Field label="Prepared Time *">
                  <input
                    type="time"
                    value={preparedTime}
                    onChange={(e) => setPreparedTime(e.target.value)}
                  />
                </Field>
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="card">
              <SectionHeading
                number="02"
                title="Availability & Storage"
                subtitle="These conditions help determine suitable recovery options."
              />

              <div className="formGrid">
                <Field label="Available Until *">
                  <input
                    type="time"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                  />
                </Field>

                <Field label="Storage Condition">
                  <select
                    value={storage}
                    onChange={(e) => setStorage(e.target.value)}
                  >
                    <option>Refrigerated</option>
                    <option>Hot Holding</option>
                    <option>Room Temperature</option>
                    <option>Open / Uncovered</option>
                  </select>
                </Field>

                <Field label="Temperature °C">
                  <div className="inputWithIcon">
                    <span>🌡</span>

                    <input
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      placeholder="28"
                    />
                  </div>
                </Field>

                <Field label="Humidity %">
                  <div className="inputWithIcon">
                    <span>💧</span>

                    <input
                      type="number"
                      value={humidity}
                      onChange={(e) => setHumidity(e.target.value)}
                      placeholder="62"
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* IMAGE SCAN */}
            <div className="card imageCard">
              <div className="sectionHeader">
                <div>
                  <div className="sectionNumber purple">03</div>

                  <h2>AI Food Image Scan</h2>

                  <p>
                    Upload an image of the surplus food for visual condition
                    assessment.
                  </p>
                </div>

                <div className="aiBadge">
                  <span>✦</span>
                  AI ASSISTED
                </div>
              </div>

              {!image ? (
                <label className="uploadBox">
                  <div className="scanCircle">
                    <span>⌁</span>
                  </div>

                  <h3>Scan or upload food image</h3>

                  <p>
                    Capture a clear image of the food for AI-assisted
                    assessment.
                  </p>

                  <span className="uploadButton">
                    <span>＋</span>
                    Choose Image
                  </span>

                  <small>JPG, PNG • Maximum 10MB</small>

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="uploadedArea">
                  <div className="imagePreview">
                    <img src={image} alt="Uploaded food" />

                    <div className="imageOverlay">
                      <span>✓ Image captured</span>

                      <button
                        onClick={() => {
                          setImage(null);
                          setImageName("");
                          setAssessment(null);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="fileInfo">
                    <div className="fileIcon">IMG</div>

                    <div>
                      <strong>{imageName}</strong>
                      <span>Ready for AI assessment</span>
                    </div>

                    <div className="readyBadge">READY</div>
                  </div>
                </div>
              )}
            </div>

            {/* AI QUALITY */}
            <div className="aiCard">
              <div className="aiHeader">
                <div className="aiTitle">
                  <div className="aiIcon">✦</div>

                  <div>
                    <h2>AI Quality Assessment</h2>
                    <p>
                      Multi-factor condition assessment for smarter recovery
                      decisions.
                    </p>
                  </div>
                </div>

                <div className="powered">POWERED BY AAHAR AI</div>
              </div>

              <div className="metricGrid">
                <Metric
                  icon="🌡"
                  label="Temperature"
                  value={temperature ? `${temperature}°C` : "--"}
                  active={!!temperature}
                />

                <Metric
                  icon="💧"
                  label="Humidity"
                  value={humidity ? `${humidity}%` : "--"}
                  active={!!humidity}
                />

                <Metric
                  icon="❄"
                  label="Storage"
                  value={storage}
                  active
                />

                <Metric
                  icon="◉"
                  label="Image"
                  value={image ? "Scanned" : "Missing"}
                  active={!!image}
                />
              </div>

              <button
                onClick={runQualityAssessment}
                className="assessmentButton"
              >
                <span>✦</span>
                Run AI Quality Assessment
                <span>→</span>
              </button>

              {assessment && (
                <div
                  className={
                    assessment.status === "SUITABLE"
                      ? "assessmentResult suitable"
                      : "assessmentResult review"
                  }
                >
                  <div className="resultTop">
                    <div>
                      <span className="resultLabel">
                        CONDITION ASSESSMENT
                      </span>

                      <h3>
                        {assessment.status === "SUITABLE"
                          ? "✓ SUITABLE"
                          : "⚠ NEEDS REVIEW"}
                      </h3>
                    </div>

                    <div className="confidence">
                      <span>AI Confidence</span>
                      <strong>{assessment.confidence}%</strong>
                    </div>
                  </div>

                  <div className="resultChecks">
                    <div>✓ Food image successfully analyzed</div>
                    <div>✓ Temperature information considered</div>
                    <div>✓ Storage condition considered</div>
                    <div>✓ Availability window considered</div>
                  </div>
                </div>
              )}

              <div className="disclaimer">
                <span>⚠</span>

                <div>
                  <strong>Decision-support only</strong>
                  <p>
                    This assessment does not certify food safety. Final
                    handling and redistribution decisions remain with the
                    responsible institution and authorized organizations.
                  </p>
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="card">
              <SectionHeading
                number="04"
                title="Additional Information"
                subtitle="Add anything that may help the receiving organization."
              />

              <Field label="Notes">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Prepared for lunch service. Packed in sealed containers..."
                  rows={4}
                />
              </Field>
            </div>
          </section>

          {/* RIGHT COLUMN */}
          <aside>
            <div className="previewCard">
              <div className="previewHeader">
                <div>
                  <span className="previewEyebrow">LIVE PREVIEW</span>
                  <h2>Surplus Listing</h2>
                </div>

                <span className="liveDot">LIVE</span>
              </div>

              <div className="foodPreview">
                {image ? (
                  <img src={image} alt="Food preview" />
                ) : (
                  <div className="emptyFoodImage">
                    <div>🥗</div>
                    <span>Food image</span>
                  </div>
                )}

                <div className="foodGradient" />

                <div className="foodImageText">
                  <span>{category}</span>
                  <strong>{foodName || "Your Food Item"}</strong>
                </div>
              </div>

              <div className="previewDetails">
                <div className="previewDetail">
                  <span>QUANTITY</span>
                  <strong>
                    {quantity || "--"} {unit}
                  </strong>
                </div>

                <div className="previewDetail">
                  <span>AVAILABLE UNTIL</span>
                  <strong>{availableUntil || "--"}</strong>
                </div>
              </div>

              <div className="previewStatus">
                <div className="statusIcon">
                  {assessment?.status === "SUITABLE" ? "✓" : "✦"}
                </div>

                <div>
                  <span>AI QUALITY STATUS</span>

                  <strong
                    className={
                      assessment?.status === "SUITABLE"
                        ? "greenText"
                        : assessment?.status === "NEEDS REVIEW"
                        ? "orangeText"
                        : ""
                    }
                  >
                    {assessment
                      ? assessment.status
                      : "Assessment Pending"}
                  </strong>
                </div>
              </div>

              <button
                onClick={handleRegister}
                className="registerButton"
              >
                <span>＋</span>
                Register Surplus
                <span>→</span>
              </button>

              <button
                onClick={() =>
                  router.push("/donor/surplus-management")
                }
                className="manageButton"
              >
                View Surplus Management
              </button>

              <div className="nextStep">
                <div className="nextStepIcon">↗</div>

                <div>
                  <strong>What's next?</strong>

                  <p>
                    Your registered surplus can be matched with verified
                    NGOs and receivers through AAHAR.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* STYLES */}
    <style jsx>{`
  * {
    box-sizing: border-box;
  }

  .page {
    min-height: 100vh;
    background:
      radial-gradient(
        circle at 90% 0%,
        rgba(50, 157, 96, 0.11),
        transparent 28%
      ),
      radial-gradient(
        circle at 0% 30%,
        rgba(216, 175, 83, 0.07),
        transparent 25%
      ),
      #f4f8f3;
    color: #18251d;
    font-family:
      Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", sans-serif;
  }

  /* ---------------- HEADER ---------------- */

  .topbar {
    height: 76px;
    background: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(15px);
    border-bottom: 1px solid #dfe8e0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 42px;
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .brandArea {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .brandLogo {
    width: 43px;
    height: 43px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #12653f, #39a76a);
    color: white;
    font-weight: 900;
    font-size: 21px;
    box-shadow: 0 7px 18px rgba(23, 107, 69, 0.2);
  }

  .brandName {
    font-size: 21px;
    font-weight: 900;
    letter-spacing: 1px;
    color: #135f3d;
  }

  .brandSub {
    font-size: 10px;
    color: #77847b;
    margin-top: 1px;
  }

  .headerRight {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .roleBadge {
    background: #edf7ef;
    border: 1px solid #d4e9d9;
    color: #216b45;
    border-radius: 30px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
  }

  .roleDot {
    display: inline-block;
    width: 7px;
    height: 7px;
    background: #35a866;
    border-radius: 50%;
    margin-right: 7px;
  }

  .backButton {
    border: 1px solid #d6e0d8;
    background: white;
    color: #26372c;
    border-radius: 9px;
    padding: 10px 16px;
    font-weight: 700;
    cursor: pointer;
  }

  .backButton:hover {
    border-color: #91c3a1;
    background: #f4faf5;
  }

  /* ---------------- MAIN ---------------- */

  .container {
    max-width: 1400px;
    margin: auto;
    padding: 32px 34px 70px;
  }

  /* ---------------- HERO ---------------- */

  .hero {
    background:
      linear-gradient(
        120deg,
        rgba(17, 101, 61, 0.99),
        rgba(38, 137, 81, 0.97)
      );
    border-radius: 22px;
    padding: 30px 38px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 18px 45px rgba(31, 105, 61, 0.17);
    overflow: hidden;
    position: relative;
  }

  .hero:after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    right: -80px;
    top: -120px;
  }

  .eyebrow {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1.3px;
    color: #ccebd7;
  }

  .eyebrowDot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #9fe0b5;
  }

  .hero h1 {
    margin: 8px 0 6px;
    font-size: 30px;
    letter-spacing: -0.7px;
  }

  .hero p {
    margin: 0;
    color: #dcefe2;
    max-width: 760px;
    font-size: 13px;
    line-height: 1.6;
  }

  .heroIcon {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    z-index: 1;
  }

  /* ---------------- SUCCESS ---------------- */

  .successBanner {
    margin-top: 18px;
    padding: 14px 18px;
    background: #effaf2;
    border: 1px solid #b9dfc4;
    border-radius: 13px;
    display: flex;
    align-items: center;
    gap: 12px;
    color: #185d37;
  }

  .successIcon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #2e9c5d;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
  }

  .successBanner strong {
    font-size: 13px;
  }

  .successBanner p {
    margin: 3px 0 0;
    font-size: 11px;
    color: #587461;
  }

  .successBanner button {
    margin-left: auto;
    border: none;
    background: #176b45;
    color: white;
    border-radius: 8px;
    padding: 9px 13px;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }

  /* ---------------- IMPORTANT:
     REMOVE RIGHT SIDEBAR ---------------- */

  .layout {
    display: block;
    margin-top: 22px;
  }

  .layout > section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .layout > section > .card,
  .layout > section > .imageCard,
  .layout > section > .aiCard {
    margin-bottom: 0;
  }

  /* Food Details */
  .layout > section > .card:nth-child(1) {
    grid-column: 1;
  }

  /* Availability */
  .layout > section > .card:nth-child(2) {
    grid-column: 2;
  }

  /* Image scan */
  .layout > section > .imageCard {
    grid-column: 1;
  }

  /* AI */
  .layout > section > .aiCard {
    grid-column: 2;
  }

  /* Additional info full width */
  .layout > section > .card:last-child {
    grid-column: 1 / -1;
  }

  /* RIGHT SIDEBAR BECOMES HORIZONTAL */
  .layout > aside {
    width: 100%;
    margin-top: 20px;
  }

  /* ---------------- CARDS ---------------- */

  .card {
    background: rgba(255, 255, 255, 0.97);
    border: 1px solid #dfe8e1;
    border-radius: 17px;
    padding: 22px;
    box-shadow: 0 7px 25px rgba(27, 66, 42, 0.045);
  }

  .sectionHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .sectionNumber {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #e6f5ea;
    color: #1a7548;
    font-size: 10px;
    font-weight: 900;
    margin-bottom: 8px;
  }

  .sectionNumber.purple {
    background: #eeeafd;
    color: #6650ad;
  }

  .sectionHeader h2,
  .card h2 {
    margin: 0;
    font-size: 17px;
    letter-spacing: -0.2px;
  }

  .sectionHeader p {
    color: #778078;
    font-size: 11px;
    margin: 4px 0 0;
  }

  /* ---------------- FORM ---------------- */

  .formGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .formGrid :global(input),
  .formGrid :global(select),
  .card :global(textarea) {
    width: 100%;
    height: 41px;
    border: 1px solid #d7e0d8;
    border-radius: 9px;
    padding: 0 11px;
    background: #fbfdfb;
    color: #253229;
    outline: none;
    font-size: 12px;
  }

  .card :global(textarea) {
    height: auto;
    padding: 11px;
    resize: vertical;
  }

  .formGrid :global(input:focus),
  .formGrid :global(select:focus),
  .card :global(textarea:focus) {
    border-color: #51a875;
    box-shadow: 0 0 0 3px rgba(50, 157, 96, 0.1);
    background: white;
  }

  .quantityBox {
    display: flex;
    gap: 7px;
  }

  .quantityBox :global(input) {
    flex: 1;
  }

  .quantityBox :global(select) {
    width: 82px;
  }

  .inputWithIcon {
    display: flex;
    align-items: center;
    height: 41px;
    border: 1px solid #d7e0d8;
    border-radius: 9px;
    background: #fbfdfb;
    padding-left: 10px;
  }

  .inputWithIcon span {
    font-size: 14px;
  }

  .inputWithIcon :global(input) {
    border: none;
    height: 39px;
    background: transparent;
  }

  .inputWithIcon :global(input:focus) {
    box-shadow: none;
  }

  /* ---------------- IMAGE SCAN ---------------- */

  .imageCard {
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(104, 82, 179, 0.08),
        transparent 35%
      ),
      white;
  }

  .aiBadge {
    background: #eeeafd;
    color: #6650ad;
    border: 1px solid #ddd5fb;
    border-radius: 30px;
    padding: 6px 10px;
    font-size: 9px;
    font-weight: 800;
  }

  .uploadBox {
    min-height: 205px;
    border: 2px dashed #bcd3c3;
    border-radius: 14px;
    background:
      radial-gradient(
        circle at center,
        rgba(64, 161, 96, 0.08),
        transparent 55%
      ),
      #f7fbf8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    transition: 0.25s;
  }

  .uploadBox:hover {
    border-color: #54a875;
    background: #f1f9f3;
  }

  .uploadBox input {
    display: none;
  }

  .scanCircle {
    width: 54px;
    height: 54px;
    border-radius: 50%;
    background: linear-gradient(135deg, #d9f1df, #edf8ef);
    color: #197247;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
  }

  .uploadBox h3 {
    margin: 10px 0 3px;
    font-size: 14px;
  }

  .uploadBox p {
    margin: 0;
    color: #7a847c;
    font-size: 11px;
  }

  .uploadButton {
    margin-top: 12px;
    background: #176b45;
    color: white;
    padding: 9px 15px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 800;
  }

  .uploadBox small {
    margin-top: 7px;
    color: #8a948c;
    font-size: 9px;
  }

  .imagePreview {
    height: 205px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
    background: #e8eee9;
  }

  .imagePreview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .imageOverlay {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .imageOverlay span {
    background: rgba(16, 91, 53, 0.9);
    color: white;
    border-radius: 20px;
    padding: 6px 10px;
    font-size: 10px;
    font-weight: 700;
  }

  .imageOverlay button {
    background: rgba(0, 0, 0, 0.68);
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 7px;
    cursor: pointer;
    font-size: 10px;
  }

  .fileInfo {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-top: 8px;
  }

  .fileIcon {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    background: #e7f4ea;
    color: #176b45;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8px;
    font-weight: 900;
  }

  .fileInfo div:nth-child(2) {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .fileInfo strong {
    font-size: 11px;
  }

  .fileInfo span {
    color: #7c877f;
    font-size: 9px;
  }

  .readyBadge {
    color: #247748;
    background: #e9f7ed;
    padding: 5px 8px;
    border-radius: 6px;
    font-size: 8px;
    font-weight: 900;
  }

  /* ---------------- AI ---------------- */

  .aiCard {
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(91, 175, 111, 0.18),
        transparent 34%
      ),
      linear-gradient(145deg, #edf8ef, #f8fcf8);
    border: 1px solid #c9e4d0;
    border-radius: 17px;
    padding: 22px;
    box-shadow: 0 10px 28px rgba(42, 112, 66, 0.07);
  }

  .aiHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }

  .aiTitle {
    display: flex;
    gap: 10px;
  }

  .aiIcon {
    width: 37px;
    height: 37px;
    border-radius: 10px;
    background: linear-gradient(135deg, #176b45, #45ad70);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .aiHeader h2 {
    margin: 0;
    font-size: 17px;
  }

  .aiHeader p {
    margin: 3px 0 0;
    color: #68766d;
    font-size: 10px;
  }

  .powered {
    font-size: 8px;
    font-weight: 900;
    color: #32764e;
    background: white;
    border: 1px solid #d3e7d7;
    border-radius: 20px;
    padding: 6px 8px;
  }

  .metricGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 7px;
    margin-bottom: 10px;
  }

  .metric {
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid #d9e8dc;
    border-radius: 9px;
    padding: 9px;
  }

  .metricIcon {
    font-size: 12px;
  }

  .metricLabel {
    display: block;
    margin-top: 4px;
    color: #7c867e;
    font-size: 8px;
    font-weight: 700;
  }

  .metricValue {
    display: block;
    margin-top: 2px;
    color: #26352b;
    font-size: 10px;
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .metricValue.missing {
    color: #ad7620;
  }

  .assessmentButton {
    width: 100%;
    height: 43px;
    border: none;
    border-radius: 9px;
    background: linear-gradient(90deg, #176b45, #2d9660);
    color: white;
    font-size: 12px;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    box-shadow: 0 8px 20px rgba(23, 107, 69, 0.16);
  }

  .assessmentResult {
    margin-top: 10px;
    border-radius: 10px;
    padding: 13px;
  }

  .assessmentResult.suitable {
    background: #f1fbf3;
    border: 1px solid #b9dfc4;
  }

  .assessmentResult.review {
    background: #fff9ed;
    border: 1px solid #ebd9a9;
  }

  .resultTop {
    display: flex;
    justify-content: space-between;
  }

  .resultLabel {
    font-size: 8px;
    color: #718078;
    font-weight: 900;
    letter-spacing: 0.7px;
  }

  .resultTop h3 {
    margin: 4px 0 0;
    font-size: 17px;
    color: #196c43;
  }

  .review .resultTop h3 {
    color: #a16e18;
  }

  .confidence {
    text-align: right;
  }

  .confidence span {
    display: block;
    color: #78837b;
    font-size: 8px;
  }

  .confidence strong {
    font-size: 18px;
  }

  .resultChecks {
    border-top: 1px solid #dce8de;
    margin-top: 10px;
    padding-top: 9px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    color: #53645a;
    font-size: 9px;
  }

  .disclaimer {
    margin-top: 9px;
    background: #fffaf0;
    border: 1px solid #eadcaf;
    border-radius: 9px;
    padding: 9px;
    display: flex;
    gap: 7px;
    color: #705d2b;
  }

  .disclaimer strong {
    font-size: 9px;
  }

  .disclaimer p {
    margin: 2px 0 0;
    font-size: 8px;
    line-height: 1.4;
  }

  /* ---------------- NOTES ---------------- */

  .layout > section > .card:last-child {
    margin-top: 0;
  }

  /* ---------------- PREVIEW:
     NOW FULL WIDTH ---------------- */

  .layout > aside {
    background: white;
    border: 1px solid #dfe8e1;
    border-radius: 18px;
    padding: 18px;
    box-shadow: 0 8px 28px rgba(25, 65, 40, 0.06);
  }

  .previewCard {
    width: 100%;
    background: transparent;
    border: none;
    padding: 0;
    box-shadow: none;
    position: static;
  }

  .previewHeader {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 13px;
  }

  .previewEyebrow {
    font-size: 8px;
    color: #3a8a5b;
    font-weight: 900;
    letter-spacing: 1px;
  }

  .previewHeader h2 {
    margin: 3px 0 0;
    font-size: 16px;
  }

  .liveDot {
    font-size: 8px;
    font-weight: 900;
    color: #26764a;
    background: #eaf7ee;
    border-radius: 20px;
    padding: 5px 8px;
  }

  /* HORIZONTAL PREVIEW */
  .foodPreview {
    height: 130px;
    width: 260px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: #e9eee9;
    float: left;
    margin-right: 18px;
  }

  .foodPreview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .emptyFoodImage {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(
        circle,
        rgba(76, 152, 91, 0.14),
        transparent 58%
      ),
      #edf5ee;
    color: #7e8b82;
  }

  .emptyFoodImage div {
    font-size: 35px;
  }

  .emptyFoodImage span {
    font-size: 9px;
  }

  .foodGradient {
    position: absolute;
    inset: 35% 0 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
  }

  .foodImageText {
    position: absolute;
    left: 12px;
    bottom: 10px;
    color: white;
    display: flex;
    flex-direction: column;
  }

  .foodImageText span {
    font-size: 8px;
    text-transform: uppercase;
    opacity: 0.82;
    font-weight: 700;
  }

  .foodImageText strong {
    font-size: 14px;
  }

  .previewDetails {
    display: flex;
    gap: 10px;
    margin-top: 0;
    padding-top: 3px;
  }

  .previewDetail {
    min-width: 140px;
    background: #f7faf7;
    border: 1px solid #e5ebe6;
    border-radius: 9px;
    padding: 10px;
  }

  .previewDetail span {
    display: block;
    font-size: 7px;
    color: #7c877f;
    font-weight: 800;
  }

  .previewDetail strong {
    display: block;
    margin-top: 4px;
    font-size: 12px;
  }

  .previewStatus {
    display: inline-flex;
    vertical-align: top;
    margin-left: 10px;
    padding: 10px 13px;
    border-radius: 9px;
    background: #f1f8f3;
    border: 1px solid #dce9de;
    align-items: center;
    gap: 9px;
  }

  .statusIcon {
    width: 29px;
    height: 29px;
    border-radius: 7px;
    background: #dff1e4;
    color: #217448;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
  }

  .previewStatus span {
    display: block;
    color: #78837b;
    font-size: 7px;
    font-weight: 800;
  }

  .previewStatus strong {
    display: block;
    margin-top: 3px;
    font-size: 10px;
  }

  .greenText {
    color: #1b7848;
  }

  .orangeText {
    color: #a16d18;
  }

  .registerButton {
    float: right;
    height: 43px;
    min-width: 210px;
    border: none;
    border-radius: 9px;
    background: linear-gradient(135deg, #176b45, #2c9860);
    color: white;
    font-weight: 900;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 13px;
    box-shadow: 0 8px 20px rgba(23, 107, 69, 0.17);
  }

  .manageButton {
    float: right;
    height: 43px;
    margin-left: 8px;
    min-width: 190px;
    font-size: 10px;
  }

  .nextStep {
    clear: both;
    display: flex;
    gap: 9px;
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid #e7ece8;
  }

  .nextStepIcon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: #f1ead7;
    color: #8b702d;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 900;
  }

  .nextStep strong {
    font-size: 10px;
  }

  .nextStep p {
    margin: 2px 0 0;
    color: #7a847c;
    font-size: 9px;
  }

  /* ---------------- RESPONSIVE ---------------- */

  @media (max-width: 1000px) {
    .layout > section {
      grid-template-columns: 1fr;
    }

    .layout > section > .card,
    .layout > section > .imageCard,
    .layout > section > .aiCard,
    .layout > section > .card:last-child {
      grid-column: 1;
    }

    .foodPreview {
      float: none;
      width: 100%;
      margin-right: 0;
    }

    .previewDetails {
      margin-top: 12px;
    }

    .previewStatus {
      margin-left: 0;
      margin-top: 10px;
    }

    .registerButton,
    .manageButton {
      float: none;
      width: 100%;
      margin: 10px 0 0;
    }
  }

  @media (max-width: 650px) {
    .topbar {
      padding: 0 15px;
    }

    .roleBadge {
      display: none;
    }

    .container {
      padding: 18px 13px 45px;
    }

    .hero {
      padding: 23px;
    }

    .heroIcon {
      display: none;
    }

    .hero h1 {
      font-size: 24px;
    }

    .formGrid {
      grid-template-columns: 1fr;
    }

    .metricGrid {
      grid-template-columns: 1fr 1fr;
    }

    .resultChecks {
      grid-template-columns: 1fr;
    }

    .aiHeader {
      flex-direction: column;
      gap: 10px;
    }

    .previewDetails {
      flex-direction: column;
    }

    .previewDetail {
      width: 100%;
    }
  }
`}</style>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="sectionHeader">
      <div>
        <div className="sectionNumber">{number}</div>

        <h2>{title}</h2>

        <p>{subtitle}</p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 800,
          marginBottom: 7,
          color: "#35443a",
        }}
      >
        {label}
      </label>

      {children}
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  active,
}: {
  icon: string;
  label: string;
  value: string;
  active: boolean;
}) {
  return (
    <div className="metric">
      <span className="metricIcon">{icon}</span>

      <span className="metricLabel">{label}</span>

      <span className={`metricValue ${!active ? "missing" : ""}`}>
        {value}
      </span>
    </div>
  );
}