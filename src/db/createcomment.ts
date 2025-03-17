import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createComment(studentId: number, advisorId: number, content: string, parentId?: number) {
  const comment = await prisma.comment.create({
    data: {
      content: content,
      studentId: studentId,
      advisorId: advisorId,
      parentId: parentId || null,
    },
  });

  return comment;
}