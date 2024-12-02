import type { Schema } from "../../data/resource";
import {
  DynamoDBClient,
  TransactWriteItemsCommand,
} from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "ap-south-1" });

export const handler = async (event: any, context?: any) => {
    try{
        const {
            name,
            age,
            weight,
            education,
            work_exp,
            action,
          }: {
            name: string;
            age: string;
            weight: string;
            education: string;
            work_exp: string;
            action: string;
          } = event;
          const data = await insertRecords(name, age, weight, education, work_exp);
          return data
    }
    catch(err:any){
        console.error("Transaction failed", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Transaction failed",
        error: err?.message,
      }),
    };
    }
}

async function insertRecords(
  name: string,
  age: string,
  weight: string,
  education: string,
  work_exp: string
) {
  const command = new TransactWriteItemsCommand({
    TransactItems: [
      {
        Put: {
          TableName: "tableA",
          Item: {
            name: { S: `${name}` },
            age: { S: `${age}` },
            weight: { S: `${weight}` },
          },
          ConditionExpression: "attribute_not_exists(name)",
        },
      },
      {
        Put: {
          TableName: "tableB",
          Item: {
            name: { S: `${name}` },
            education: { S: `${education}` },
            work_exp: { S: `${work_exp}` },
          },
          ConditionExpression: "attribute_not_exists(name)",
        },
      },
    ],
  });
  const output = await dynamoDBClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Records inserted successfully" }),
  };
}