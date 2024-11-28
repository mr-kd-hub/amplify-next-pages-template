import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import { SES } from 'aws-sdk';

// Initialize SES
const ses = new SES({ region: process.env.AWS_REGION });

const sendWelcomeEmail = async (email: string) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { Data: 'Welcome to our platform! We are excited to have you.' },
      },
      Subject: { Data: 'Welcome to Our Platform' },
    },
    Source: process.env.SENDER_EMAIL || 'noreply@example.com',
  };

  await ses.sendEmail(params).promise();
};

export const handler: PostConfirmationTriggerHandler = async (event) => {
  const email = event.request.userAttributes.email;

  if (email) {
    try {
      await sendWelcomeEmail(email);
      console.log(`Welcome email sent to ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${email}:`, error);
    }
  }

  return event;
};
