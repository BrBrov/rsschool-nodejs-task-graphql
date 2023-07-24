import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import { PostDTOCreator } from '../creators/creators-types.js';

const prisma = new PrismaClient();

export const postResolve = {
	post: async ({ id }: { id: UUID }) => {
		return await prisma.post.findFirst({
			where: {
				id
			}
		});
	},
	posts: async () => {
		return await prisma.post.findMany();
	},
	createPost: async ({ creator }: { creator: PostDTOCreator }) => {
		return await prisma.post.create({ data: creator });
	},
	deletePost: async ({ id }: { id: UUID }) => {
		await prisma.post.delete({
			where: {
				id
			}
		});
		return '';
	},
	updatePost: async ({ id, creator }: { id: UUID; creator: Partial<PostDTOCreator> }) => {
		return await prisma.post.update({
			where: {
				id
			},
			data: creator,
		});
	},
};