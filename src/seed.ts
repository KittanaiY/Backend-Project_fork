import { createUser } from './db/createuser';
import { createAppointment } from './db/createappointment';
import { createAnnouncement } from './db/createannouncement';
import { createComment } from './db/createcomment';

async function main() {
  // Create users and destructure the result to get admin, advisors, and students
  const userResult = await createUser();
  if (!userResult) {
    throw new Error('Failed to create users');
  }
  const { admin, advisor1, advisor2, students } = userResult;
  const [student1, student2, student3, student4, student5, student6] = students;

  // Create appointments for each student with an advisor
  const appointments = await Promise.all([
    createAppointment(student1.id, advisor1.id, new Date(), 'Subject 1'),
    createAppointment(student2.id, advisor1.id, new Date(), 'Subject 2'),
    createAppointment(student3.id, advisor2.id, new Date(), 'Subject 3'),
    createAppointment(student4.id, advisor2.id, new Date(), 'Subject 4'),
    createAppointment(student5.id, advisor1.id, new Date(), 'Subject 5'),
    createAppointment(student6.id, advisor2.id, new Date(), 'Subject 6'),
  ]);

  // Create announcements by each advisor
  const announcements = await Promise.all([
    createAnnouncement(advisor1.id, 'Title 1', 'Content 1'),
    createAnnouncement(advisor2.id, 'Title 2', 'Content 2'),
  ]);

  // Create comments by each student on their respective advisors
  const comments = await Promise.all([
    createComment(student1.id, advisor1.id, 'Comment content 1'),
    createComment(student2.id, advisor1.id, 'Comment content 2'),
    createComment(student3.id, advisor2.id, 'Comment content 3'),
    createComment(student4.id, advisor2.id, 'Comment content 4'),
    createComment(student5.id, advisor1.id, 'Comment content 5'),
    createComment(student6.id, advisor2.id, 'Comment content 6'),
  ]);

  // Log the created entities to the console
  console.log({ admin, advisor1, advisor2, student1, student2, student3, student4, student5, student6, appointments, announcements, comments });
}

// Call the main function and handle any errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Disconnect from the database
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    await prisma.$disconnect();
  });