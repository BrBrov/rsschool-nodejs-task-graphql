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
	createProfile: async ({ dto }: { dto: ProfileDTOCreator }) => {
		return await prisma.profile.create({ data: dto });
	},
	deleteProfile: async ({ id }: { id: UUID }) => {
		await prisma.profile.delete({
			where: {
				id
			}
		});
		return '';
	},
	changeProfile: async ({ id, dto }: { id: UUID; dto: Partial<ProfileDTOCreator> }) => {
		return await prisma.profile.update({
			where: {
				id
			},
			data: dto,
		});
	},
};