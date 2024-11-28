import { defineFunction } from '@aws-amplify/backend';

export const sendWelcomeEmail = defineFunction({
  name: 'sendWelcomeEmail',
  environmentVariables: {
    AWS_REGION: 'us-east-1',
    SENDER_EMAIL: 'your-email@example.com',
  },
} as any);
