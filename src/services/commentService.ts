import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const commentService = {
    addComment: async (advisorId: number, studentId: number, content: string) => {
        return await prisma.comment.create({
            data: {
                advisorId,
                studentId,
                content,
            },
        });
    },
    replyToComment: async (commentId: number, studentId: number, content: string) => {
        return await prisma.comment.create({
            data: {
                advisorId: (await prisma.comment.findUnique({ where: { id: commentId } }))?.advisorId ?? 0,
                parentId: commentId,
                studentId,
                content,
            },
        });
    },
};