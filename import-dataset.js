const fs = require("fs");
const path = require("path");

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { parse } = require("csv-parse/sync");

// --------------------------------------------------
// FIND FIREBASE SERVICE ACCOUNT
// --------------------------------------------------

const projectRoot = __dirname;

const serviceAccountFile = fs
  .readdirSync(projectRoot)
  .find(
    (file) =>
      file.includes("firebase-adminsdk") &&
      file.endsWith(".json")
  );

if (!serviceAccountFile) {
  console.error(
    "❌ Firebase service-account JSON was not found in the project root."
  );
  process.exit(1);
}

const serviceAccountPath = path.join(
  projectRoot,
  serviceAccountFile
);

console.log(
  `Using Firebase credential: ${serviceAccountFile}`
);

// --------------------------------------------------
// INITIALIZE FIREBASE ADMIN
// --------------------------------------------------

const serviceAccount = require(serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// --------------------------------------------------
// CSV LOCATION
// --------------------------------------------------

const csvPath = path.join(
  projectRoot,
  "app",
  "data",
  "AAHAR_institutional_kitchen_dataset.csv"
);

if (!fs.existsSync(csvPath)) {
  console.error(
    `❌ Dataset not found:\n${csvPath}`
  );
  process.exit(1);
}

// --------------------------------------------------
// READ CSV
// --------------------------------------------------

const csvText = fs.readFileSync(
  csvPath,
  "utf8"
);

const records = parse(csvText, {
  columns: true,
  skip_empty_lines: true,
  trim: true,
});

console.log(`Found ${records.length} CSV records.`);

// --------------------------------------------------
// CONVERT DATA TYPES
// --------------------------------------------------

const numericFields = [
  "attendance",
  "demand_estimate",
  "food_prepared_kg",
  "food_consumed_kg",
  "surplus_kg",
  "waste_kg",
  "recoverable_surplus_kg",
  "waste_percentage",
  "previous_day_surplus_kg",
  "7_day_avg_consumption_kg",
  "estimated_food_cost_inr",
  "recoverable_value_inr",
];

const convertedRecords = records.map((record) => {
  const converted = { ...record };

  numericFields.forEach((field) => {
    if (
      converted[field] !== undefined &&
      converted[field] !== ""
    ) {
      converted[field] = Number(converted[field]);
    }
  });

  return converted;
});

// --------------------------------------------------
// UPLOAD TO FIRESTORE
// --------------------------------------------------

async function uploadData() {
  const collectionRef = db.collection("kitchen_data");

  console.log(
    "\nUploading records to Firestore..."
  );

  // Firestore batch limit is 500 operations.
  const batchSize = 400;

  for (
    let start = 0;
    start < convertedRecords.length;
    start += batchSize
  ) {
    const batch = db.batch();

    const chunk = convertedRecords.slice(
      start,
      start + batchSize
    );

    chunk.forEach((record, index) => {
      const documentId = `${record.date}_${record.kitchen
        .replace(/[^a-zA-Z0-9]/g, "_")
        .toLowerCase()}_${start + index}`;

      const docRef =
        collectionRef.doc(documentId);

      batch.set(docRef, {
        ...record,
        importedAt: new Date(),
      });
    });

    await batch.commit();

    console.log(
      `Uploaded ${Math.min(
        start + batchSize,
        convertedRecords.length
      )} / ${convertedRecords.length}`
    );
  }

  console.log(
    "\n✅ Dataset successfully uploaded!"
  );

  console.log(
    "Firestore collection: kitchen_data"
  );

  process.exit(0);
}

uploadData().catch((error) => {
  console.error(
    "\n❌ Upload failed:"
  );

  console.error(error);

  process.exit(1);
});