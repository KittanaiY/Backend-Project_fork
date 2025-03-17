import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const advisorService = {
    getAssignedStudents: async (advisorId: any, p0: { include: { user: { include: { profile: boolean; }; }; }; }) => {
        return await prisma.student.findMany({
            where: { advisorId },
        });
    },
};