import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const adminService = {
    createUser: async (data: any) => {
        return await prisma.user.create({
            data,
        });
    },
    getUsers: async () => {
        return await prisma.user.findMany();
    },
    updateUser: async (id: any, data: any) => {
        return await prisma.user.update({
            where: { id },
            data,
        });
    },
    deleteUser: async (id: any) => {
        return await prisma.user.delete({
            where: { id },
        });
    },
    createAdvisor: async (data: any) => {
        return await prisma.advisor.create({
            data,
        });
    },
    getAdvisors: async () => {
        return await prisma.advisor.findMany();
    },
    updateAdvisor: async (id: any, data: any) => {
        return await prisma.advisor.update({
            where: { id },
            data,
        });
    },
    deleteAdvisor: async (id: any) => {
        return await prisma.advisor.delete({
            where: { id },
        });
    },
    createStudent: async (data: any) => {
        return await prisma.student.create({
            data,
        });
    },
    getStudents: async () => {
        return await prisma.student.findMany();
    },
    updateStudent: async (id: any, data: any) => {
        return await prisma.student.update({
            where: { id },
            data,
        });
    },
    deleteStudent: async (id: any) => {
        return await prisma.student.delete({
            where: { id },
        });
    },
    searchStudents: async (studentId: any, firstName: any, lastName: any) => {
        return await prisma.student.findMany({
            where: {
                OR: [
                    { studentId: { contains: studentId } },
                    {
                        user: {
                            profile: {
                                firstName: { contains: firstName, mode: "insensitive" },
                                lastName: { contains: lastName, mode: "insensitive" },
                            },
                        },
                    },
                ],
            },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    },
    getAdvisorsWithDetails: async (page: number, limit: number) => {
        const skip = (page - 1) * limit;

        const advisors = await prisma.advisor.findMany({
            skip,
            take: limit,
            include: {
                students: true, // Fix: Changed from "Student" to "students"
                appointments: true, // Fix: Ensure appointments are included
                user: true, // Fix: Ensure the associated user is included
            }
        });

        const advisorData = advisors.map(advisor => {
            const studentCount = advisor.students.length; // Fix: Use "students" instead of "Student"

            const appointmentSummary = advisor.appointments.reduce((summary: { [key: string]: any[] }, appointment) => {
                if (!summary[appointment.status]) {
                    summary[appointment.status] = [];
                }
                summary[appointment.status].push({
                    studentId: appointment.studentId,
                    requestedDate: appointment.requestedDate,
                    confirmedDate: appointment.confirmedDate,
                    subject: appointment.subject
                });
                return summary;
            }, {});

            return {
                advisor: advisor.user?.username, // Fix: Ensure "user" exists before accessing username
                studentCount,
                appointmentSummary
            };
        });

        return {
            page,
            limit,
            advisors: advisorData
        };
    },
    linkStudentToAdvisor: async (studentId: number, advisorId: number) => {
        const student = await prisma.student.findUnique({ where: { id: studentId } });
        const advisor = await prisma.advisor.findUnique({ where: { id: advisorId } });

        if (!student || !advisor) {
            throw new Error('Student or Advisor not found');
        }

        const updatedStudent = await prisma.student.update({
            where: { id: Number(studentId) },
            data: { advisorId: Number(advisorId) },
        });

        return updatedStudent;
    },
};