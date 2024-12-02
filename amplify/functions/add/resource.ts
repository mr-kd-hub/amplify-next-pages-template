import { defineFunction } from "@aws-amplify/backend";

export const addFunction = defineFunction({
  name: "add",
  entry: "./handler.ts",
});
