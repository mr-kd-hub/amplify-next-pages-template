import { defineFunction } from '@aws-amplify/backend';

export const sayHello = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'say-hello',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
  //for  environments variables
  environment: {
    NAME: 'World',
    // API_ENDPOINT: process.env.API_ENDPOINT
  },
  // Configure Functions
  timeoutSeconds: 60, // 1 minute timeout
  memoryMB: 256, // allocate 256 MB of memory to the function.
  runtime: 20, // use Node 20
  
//Lambda Layers
  layers: {
    "@aws-lambda-powertools/logger":
       "arn:aws:lambda:us-east-1:094274105915:layer:AWSLambdaPowertoolsTypeScriptV2:12",
   },

});