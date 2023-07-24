import { GraphQLObjectType, GraphQLNonNull } from 'graphql';
import { userType } from './user-types.js';
import { UUIDType } from './uuid.js';

export const subscribeType: GraphQLObjectType = new GraphQLObjectType({
  name: 'subscribe',
  fields: ()=> ({
    subscriber: {type: new GraphQLNonNull(userType)},
    subscriberId: {type: new GraphQLNonNull(UUIDType)},
    author: {type: new GraphQLNonNull(userType)},
    authorId: {type: new GraphQLNonNull(UUIDType)},
  })
})