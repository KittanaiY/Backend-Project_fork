import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const announcementService = {
    createAnnouncement: async (advisorId: number, title: string, content: string, fileUrl: string) => {
        return await prisma.announcement.create({
            data: {
                advisorId,
                title,
                content,
                fileUrl,
            },
        });
    },
    getAnnouncements: async () => {
        return await prisma.announcement.findMany({
            include: {
                advisor: true,
            },
        });
    },
};