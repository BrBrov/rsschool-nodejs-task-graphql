import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import { idOfMember, memberType } from '../simple-types/member-types.js';
import { postType } from '../simple-types/post-types.js';
import { profileType } from '../simple-types/profile-types.js';
import { userType } from '../simple-types/user-types.js';
import { UUIDType } from '../simple-types/uuid.js';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: userType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    users: {
      type: new GraphQLList(userType),
    },
    profile: {
      type: profileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    profiles: {
      type: new GraphQLList(profileType),
    },
    memberType: {
      type: memberType,
      args: {
        id: { type: new GraphQLNonNull(idOfMember) },
      },
    },
    memberTypes: {
      type: new GraphQLList(memberType),
    },
    post: {
      type: postType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
    },
    posts: {
      type: new GraphQLList(postType),
    },
  },
});