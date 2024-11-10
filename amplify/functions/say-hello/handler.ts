import type { Schema } from "../../data/resource"
// import { env } from '$amplify/env/say-hello'; // the import is '$amplify/env/<function-name>'
// import { Logger } from "@aws-lambda-powertools/logger";

// const logger = new Logger({ serviceName: "serverlessAirline" });

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
  // arguments typed from `.arguments()`
  const { name } = event.arguments
  // const envVAr = env.NAME
  // return typed from `.returns()`

  // logger.info("Hello World");

  return `Hello, ${name}, !` //${envVAr}
}
