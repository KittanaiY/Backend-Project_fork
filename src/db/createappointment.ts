import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAppointment(studentId: number, advisorId: number, requestedDate: Date, subject: string, status: string = 'PENDING') {
  const appointment = await prisma.appointment.create({
    data: {
      studentId: studentId,
      advisorId: advisorId,
      requestedDate: requestedDate,
      subject: subject,
      status: status,
    },
  });

  return appointment;
}