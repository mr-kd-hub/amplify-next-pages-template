import type { Handler } from 'aws-lambda';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
// import { env } from '$amplify/env/update-task-status';
import { updateTask } from './graphql/mutations';

Amplify.configure({
  // API: {
  //   // GraphQL: {
  //   //   // endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
  //   //   // region: env.AWS_REGION,
  //   //   defaultAuthMode: 'iam',
  //   // },
  // },
  // Auth: {
  //   credentialsProvider: {
  //     getCredentialsAndIdentityId: async () => ({
  //       credentials: {
  //         // accessKeyId: env.AWS_ACCESS_KEY_ID,
  //         // secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  //         // sessionToken: env.AWS_SESSION_TOKEN,
  //       },
  //     }),
  //   },
  // },
});

const client = generateClient<any>({ authMode: 'userPool' });

interface UpdateTaskInput {
  id: string;
  status: string;
}

export const handler: Handler = async (event) => {
  const { id, status } = event.arguments as UpdateTaskInput;

  try {
    // Call the mutation to update the task status in the database
    await client.graphql({
      query: updateTask,
      variables: { input: { id, status } },
    });

    console.log(`Task ${id} status updated to ${status}`);
    return true;
  } catch (error) {
    console.error('Error updating task:', error);
    return false;
  }
};
