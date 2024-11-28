import { defineFunction } from '@aws-amplify/backend';

export const updateTaskStatus = defineFunction({
  name: 'update-task-status',
  environmentVariables: {
    AWS_REGION: 'us-east-1',
    AWS_ACCESS_KEY_ID: 'AWS_ACCESS_KEY_ID',
    AWS_SECRET_ACCESS_KEY: 'AWS_SECRET_ACCESS_KEY',
    AWS_SESSION_TOKEN: 'AWS_SESSION_TOKEN'
  }
} as any);
