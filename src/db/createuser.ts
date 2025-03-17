import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function createUser() {
  try {
    const saltRounds = 10;

    // Hash passwords in parallel
    const passwords = await Promise.all([
      bcrypt.hash('adminpassword', saltRounds),
      bcrypt.hash('advisorpassword1', saltRounds),
      bcrypt.hash('advisorpassword2', saltRounds),
      bcrypt.hash('studentpassword1', saltRounds),
      bcrypt.hash('studentpassword2', saltRounds),
      bcrypt.hash('studentpassword3', saltRounds),
      bcrypt.hash('studentpassword4', saltRounds),
      bcrypt.hash('studentpassword5', saltRounds),
      bcrypt.hash('studentpassword6', saltRounds),
    ]);

    const [adminPassword, advisorPassword1, advisorPassword2, ...studentPasswords] = passwords;

    // Create users in parallel
    const [admin, advisor1, advisor2] = await Promise.all([
      prisma.user.create({
        data: {
          username: 'admin',
          password: adminPassword,
          role: 'ADMIN',
          profile: { create: { firstName: 'Admin', lastName: 'User' } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'advisor1',
          password: advisorPassword1,
          role: 'ADVISOR',
          profile: {
            create: { firstName: 'John', lastName: 'Doe', department: 'Computer Science' },
          },
          advisor: { create: { academicPosition: 'Professor' } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'advisor2',
          password: advisorPassword2,
          role: 'ADVISOR',
          profile: {
            create: { firstName: 'Jane', lastName: 'Smith', department: 'Mathematics' },
          },
          advisor: { create: { academicPosition: 'Associate Professor' } },
        },
      }),
    ]);

    // Create students in parallel
    const students = await Promise.all([
      prisma.user.create({
        data: {
          username: 'student1',
          password: studentPasswords[0],
          role: 'STUDENT',
          profile: { create: { firstName: 'Alice', lastName: 'Johnson', department: 'Computer Science' } },
          student: { create: { studentId: 'S123456', advisor: { connect: { id: advisor1.id } } } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'student2',
          password: studentPasswords[1],
          role: 'STUDENT',
          profile: { create: { firstName: 'Bob', lastName: 'Williams', department: 'Mathematics' } },
          student: { create: { studentId: 'S654321', advisor: { connect: { id: advisor2.id } } } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'student3',
          password: studentPasswords[2],
          role: 'STUDENT',
          profile: { create: { firstName: 'Charlie', lastName: 'Brown', department: 'Physics' } },
          student: { create: { studentId: 'S789012', advisor: { connect: { id: advisor1.id } } } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'student4',
          password: studentPasswords[3],
          role: 'STUDENT',
          profile: { create: { firstName: 'David', lastName: 'Clark', department: 'Chemistry' } },
          student: { create: { studentId: 'S345678', advisor: { connect: { id: advisor2.id } } } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'student5',
          password: studentPasswords[4],
          role: 'STUDENT',
          profile: { create: { firstName: 'Eve', lastName: 'Davis', department: 'Biology' } },
          student: { create: { studentId: 'S901234', advisor: { connect: { id: advisor1.id } } } },
        },
      }),
      prisma.user.create({
        data: {
          username: 'student6',
          password: studentPasswords[5],
          role: 'STUDENT',
          profile: { create: { firstName: 'Frank', lastName: 'Evans', department: 'Mathematics' } },
          student: { create: { studentId: 'S567890', advisor: { connect: { id: advisor2.id } } } },
        },
      }),
    ]);

    console.log("Users created successfully!");
    return { admin, advisor1, advisor2, students };
  } catch (error) {
    console.error("Error creating users:", error);
  } finally {
    await prisma.$disconnect(); // Ensure Prisma connection is closed
  }
}

createUser();
