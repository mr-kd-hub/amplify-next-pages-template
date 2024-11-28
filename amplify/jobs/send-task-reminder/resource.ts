import { defineFunction } from '@aws-amplify/backend';

export const sendTaskReminder = defineFunction({
  name: 'sendTaskReminder',
  environmentVariables: {
    AWS_REGION: 'us-east-1',
    SENDER_EMAIL: 'noreply@example.com',
  },
} as any);
