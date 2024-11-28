import { Handler } from 'aws-lambda';
import { SES } from 'aws-sdk';
import { env } from '$amplify/env/send-task-reminder';

const ses = new SES({ region: env.AWS_REGION });

interface Task {
  id: string;
  title: string;
  dueDate: string;
  userEmail: string;
}

const sendReminderEmail = async (task: Task) => {
  const params = {
    Destination: {
      ToAddresses: [task.userEmail],
    },
    Message: {
      Body: {
        Text: {
          Data: `Reminder: Your task "${task.title}" is due on ${task.dueDate}.`,
        },
      },
      Subject: { Data: 'Task Reminder' },
    },
    Source: env.SENDER_EMAIL,
  };

  await ses.sendEmail(params).promise();
};

export const handler: Handler = async (event) => {
  const tasks: Task[] = event.tasks;

  for (const task of tasks) {
    if (new Date(task.dueDate) <= new Date()) {
      await sendReminderEmail(task);
      console.log(`Reminder sent for task: ${task.title}`);
    }
  }

  return { statusCode: 200, body: 'Reminders sent successfully' };
};
