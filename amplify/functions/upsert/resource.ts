import { defineFunction } from "@aws-amplify/backend";

export const upsertFunction = defineFunction({
  name: "upsert",
  entry: "./handler.ts",
});
