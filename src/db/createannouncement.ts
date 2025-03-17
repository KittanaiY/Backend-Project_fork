import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAnnouncement(advisorId: number, title: string, content: string, fileUrl?: string) {
  const announcement = await prisma.announcement.create({
    data: {
      advisorId: advisorId,
      title: title,
      content: content,
      fileUrl: fileUrl,
    },
  });

  return announcement;
}