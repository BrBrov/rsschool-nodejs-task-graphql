import { Profile } from '@prisma/client';
import { GraphQLObjectType, GraphQLNonNull, GraphQLBoolean, GraphQLFloat, GraphQLString } from 'graphql';
import { memberType } from './member-types.js';
import { userType } from './user-types.js';
import { UUIDType } from './uuid.js';
import Loader from '../loader/loader.js';

export const profileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLFloat },
    user: {
      type: userType,
      async resolve(profile: Profile, _, context: Loader) {
        return await context.user.load(profile.id);
      },
    },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: {
      type: memberType,
      async resolve(profile: Profile, _, context: Loader) {
        return await context.memberType.load(profile.memberTypeId);
      },
    },
    memberTypeId: { type: GraphQLString },
  }),
});