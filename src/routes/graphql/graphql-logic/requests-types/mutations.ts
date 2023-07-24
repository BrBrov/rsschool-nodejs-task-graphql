import { GraphQLObjectType, GraphQLString } from 'graphql';
import { postType } from '../simple-types/post-types.js';
import { profileType } from '../simple-types/profile-types.js';
import { userType } from '../simple-types/user-types.js';
import { UUIDType } from '../simple-types/uuid.js';
import { userCreater, userUpdater } from '../creators/user-creator.js';
import { postCreater, postUpdater } from '../creators/post-cretor.js';
import { profileCreater, profileUpdater } from '../creators/profile-creator.js';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createUser: { type: userType, args: { dto: { type: userCreater } } },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
    },
    changeUser: {
      type: userType,
      args: {
        id: { type: UUIDType },
        dto: { type: userUpdater },
      },
    },

    createPost: { type: postType, args: { dto: { type: postCreater } } },
    changePost: {
      type: postType,
      args: {
        id: { type: UUIDType },
        dto: { type: postUpdater },
      },
    },
    deletePost: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
    },

    createProfile: { type: profileType, args: { dto: { type: profileCreater } } },
    changeProfile: {
      type: profileType,
      args: {
        id: { type: UUIDType },
        dto: { type: profileUpdater },
      },
    },
    deleteProfile: {
      type: GraphQLString,
      args: {
        id: { type: UUIDType },
      },
    },

    subscribeTo: {
      type: userType,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: { type: UUIDType },
        authorId: { type: UUIDType },
      },
    },
  }),
});