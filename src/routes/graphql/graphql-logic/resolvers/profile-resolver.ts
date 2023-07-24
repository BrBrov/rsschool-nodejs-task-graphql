import { PrismaClient } from '@prisma/client';
import { UUID } from 'crypto';
import { ProfileDTOCreator } from '../creators/creators-types.js';

const prisma = new PrismaClient();

export const profileResolve = {
	profile: async ({ id }: { id: UUID }) => {
		return await prisma.profile.findFirst({
			where: {
				id
			}
		});
	},
	profiles: async () => {
		return await prisma.profile.findMany();
	},
	createProfile: async ({ creator }: { creator: ProfileDTOCreator }) => {
		return await prisma.profile.create({ data: creator });
	},
	deleteProfile: async ({ id }: { id: UUID }) => {
		await prisma.profile.delete({
			where: {
				id
			}
		});
		return '';
	},
	updateProfile: async ({ id, creator }: { id: UUID; creator: Partial<ProfileDTOCreator> }) => {
		return await prisma.profile.update({
			where: {
				id
			},
			data: creator,
		});
	},
};