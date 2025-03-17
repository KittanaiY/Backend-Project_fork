import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const appointmentService = {
    createAppointment: async (studentId: number, advisorId: number, requestedDate: Date, subject: string) => {
        return await prisma.appointment.create({
            data: {
                studentId,
                advisorId,
                requestedDate,
                subject,
            },
        });
    },
    getAppointmentsByAdvisor: async (advisorId: number) => {
        return await prisma.appointment.findMany({
            where: { advisorId },
            include: {
                student: true,
            },
        });
    },
    getAppointmentsByStudent: async (studentId: number) => {
        return await prisma.appointment.findMany({
            where: { studentId },
            include: {
                advisor: true,
            },
        });
    },
    updateAppointment: async (id: number, confirmedDate: Date) => {
        return await prisma.appointment.update({
            where: { id },
            data: { confirmedDate, status: 'confirmed' },
        });
    },
    confirmAppointment: async (id: number) => {
        return await prisma.appointment.update({
            where: { id },
            data: { status: 'confirmed' },
        });
    },
};
