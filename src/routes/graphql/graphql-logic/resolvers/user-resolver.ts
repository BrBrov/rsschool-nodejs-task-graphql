import { UUID } from 'crypto';
import { GraphQLResolveInfo } from 'graphql';
import { parseResolveInfo } from 'graphql-parse-resolve-info';
import Loader from '../loader/loader.js';
import { UserDTOCreator } from '../creators/creators-types.js';

export const userResolve = {
  user: async ({ id }: { id: UUID }, context: Loader) => {
    return await context.user.load(id);
  },
  users: async (_, context: Loader, info: GraphQLResolveInfo) => {
    const resolvedInfo = parseResolveInfo(info);
		const subscribeTo = resolvedInfo?.fieldsByTypeName.User['userSubscribedTo'] ? true : false;
		const subscribedToUser = resolvedInfo?.fieldsByTypeName.User['subscribedToUser'] ? true : false;
		
    const users = await context.prisma.user.findMany({
      include: {
        userSubscribedTo: subscribeTo,
        subscribedToUser: subscribedToUser,
      },
    });
    users.forEach((item) => context.user.prime(item.id, item));
    return users;
  },
  createUser: async ({ dto }: { dto: UserDTOCreator }, context: Loader) => {
    return await context.prisma.user.create({
      data: dto,
    });
  },
  deleteUser: async ({ id }: { id: UUID }, context: Loader) => {
    await context.prisma.user.delete({
      where: {
        id,
      },
    });
    return '';
  },
  updateUser: async ({ id, dto }: { id: UUID; dto: Partial<UserDTOCreator> }, context: Loader) => {
    return await context.prisma.user.update({
      where: { id },
      data: dto,
    });
  },
};