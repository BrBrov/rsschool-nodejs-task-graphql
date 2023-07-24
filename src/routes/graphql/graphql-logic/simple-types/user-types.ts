import { User } from '@prisma/client';
import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { profileType } from './profile-types.js';
import { UUIDType } from './uuid.js';
import Loader from '../loader/loader.js';
import { postType } from './post-types.js';
import UserWithSubscribe from './subscribers-types.js';

export const userType: GraphQLObjectType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: profileType,
      async resolve(user: User, _, context: Loader) {
        return context.profiles.load(user.id);
      },
    },
    posts: {
      type: new GraphQLList(postType),
      async resolve(user: User, _, context: Loader) {
        return [await context.posts.load(user.id)];
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(userType),
      async resolve(subscribers: UserWithSubscribe, _, context: Loader) {
        return context.user.loadMany(subscribers.userSubscribedTo?.map((subscribe) => subscribe.authorId) || []);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(userType),
      async resolve(subscribers: UserWithSubscribe, _, context: Loader) {
        return context.user.loadMany(subscribers.subscribedToUser?.map((subscribe) => subscribe.subscriberId) || []);
      },
    },
  }),
});