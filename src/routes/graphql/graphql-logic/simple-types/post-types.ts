import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { userType } from './user-types.js';
import { UUIDType } from './uuid.js';

export const postType: GraphQLObjectType = new GraphQLObjectType({
  name: 'post',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: { type: new GraphQLNonNull(userType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  }),
});