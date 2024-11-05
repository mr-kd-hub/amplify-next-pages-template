import { defineFunction } from "@aws-amplify/backend";

export const generateReport = defineFunction({
  name: "generate-report",
  schedule: ["every week", "every month", "every year"],//every 1h
  // every sunday at midnight
//   "every week",
//   // every tuesday at 5pm
//   "0 17 * ? 3 *",
//   // every wednesday at 5pm
//   "0 17 * ? 4 *",
//   // every thursday at 5pm
//   "0 17 * ? 5 *",
//   // every friday at 5pm
//   "0 17 * ? 6 *",
});