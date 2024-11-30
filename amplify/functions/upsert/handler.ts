// import {
//   DynamoDBClient,
//   TransactWriteItemsCommand,
// } from "@aws-sdk/client-dynamodb";

import AWS from "aws-sdk";

// const dynamoDBClient = new DynamoDBClient({ region: "ap-south-1" });

const docClient = new AWS.DynamoDB.DocumentClient();

export const handler = async (event: any, context?: any) => {
  try {
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
    switch (action) {
      case "insert":
        return await insertRecords(name, age, weight, education, work_exp);
      case "update":
        return await updateRecords(name, age, weight, education, work_exp);
      case "delete":
        return await deleteRecords(name);
      default:
        throw new Error("Invalid action specified");
    }
  } catch (err: any) {
    console.error("Transaction failed", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Transaction failed",
        error: err?.message,
      }),
    };
  }
};

async function insertRecords(
  name: string,
  age: string,
  weight: string,
  education: string,
  work_exp: string
) {
  const params = {
    TransactItems: [
      {
        Put: {
          TableName: "tableA",
          Item: { name, age, weight },
        },
      },
      {
        Put: {
          TableName: "tableB",
          Item: { name, education, work_exp },
        },
      },
    ],
  };

//   const output = await dynamoDBClient.send(params);

  await docClient.transactWrite(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Records inserted successfully" }),
  };
}

async function updateRecords(
  name: string,
  age: string,
  weight: string,
  education: string,
  work_exp: string
) {
  const params = {
    TransactItems: [
      {
        Update: {
          TableName: "tableA",
          Key: { name },
          ExpressionAttributeValues: {
            ":age": age,
            ":weight": weight,
          },
          UpdateExpression: "set age = :age, weight = :weight",
        },
      },
      {
        Update: {
          TableName: "tableB",
          Key: { name },
          ExpressionAttributeValues: {
            ":education": education,
            ":work_exp": work_exp,
          },
          UpdateExpression: "set education = :education, work_exp = :work_exp",
        },
      },
    ],
  };
  await docClient.transactWrite(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Records updated successfully' })
  };
}


async function deleteRecords(name:string) {
    const params = {
      TransactItems: [
        {
          Delete: {
            TableName: 'tableA',
            Key: { name }
          }
        },
        {
          Delete: {
            TableName: 'tableB',
            Key: { name }
          }
        }
      ]
    };
  
    await docClient.transactWrite(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Records deleted successfully' })
    };
  }

//   handler({
//     name: "dhruv",
//     age: "25",
//     weight: "65",
//     education: "msc",
//     work_exp: "3years",
//     action:"insert",
//   }).then((data) => {
//     console.log("data", data);
//   });