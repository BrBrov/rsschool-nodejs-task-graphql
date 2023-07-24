import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import { mutation } from './graphql-logic/requests-types/mutations.js';
import { query } from './graphql-logic/requests-types/queries.js';
import depthLimit from 'graphql-depth-limit';
import { membersResolve } from './graphql-logic/resolvers/member-resolver.js';
import { postResolve } from './graphql-logic/resolvers/post-resolver.js';
import { profileResolve } from './graphql-logic/resolvers/profile-resolver.js';
import { subscribeResolve } from './graphql-logic/resolvers/subscribe-resolver.js';
import { userResolve } from './graphql-logic/resolvers/user-resolver.js';
import Loader from './graphql-logic/loader/loader.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const schema = new GraphQLSchema({ query, mutation });
      
      const ast = parse(req.body.query);
      const validation = validate(schema, ast, [depthLimit(5)]);
      
      if (validation.length) {
        return { errors: validation };
      }
      
      const root = {
        ...userResolve,
        ...profileResolve,
        ...membersResolve,
        ...postResolve,
        ...subscribeResolve,
      };
      
      const loader = new Loader(fastify.prisma);

      return await graphql({
        schema: schema,
        source: req.body.query,
        rootValue: root,
        variableValues: req.body.variables,
        contextValue: { db: fastify.prisma, ...loader },
      });
    },
  });
};

export default plugin;
