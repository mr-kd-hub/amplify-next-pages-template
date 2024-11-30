import { defineAuth } from '@aws-amplify/backend';
import { sendWelcomeEmail } from './send-welcome-email/resource';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  triggers: {
    postConfirmation: sendWelcomeEmail,
    // postAuthentication
    // preAuthentication
    // preSignUp
    // preTokenGeneration
    // createAuthChallenge,
    // defineAuthCh allenge,
    // verifyAuthChallengeResponse,
  },
});
