import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db.js';

import Query from '../resolvers/Query.js';
import Mutation from '../resolvers/Mutation.js';
// import Subscription from '../resolvers/Subscription.js';
// import User from '../resolvers/User';
// import Comment from '../resolvers/Comment';
import mongo from './mongo.js';

const pubsub = new PubSub();


const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers: {
    Query,
    Mutation,
    // Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();

server.start({ port: process.env.PORT | 5000 }, () => {
  console.log(`The server is up on port ${process.env.PORT | 5000}!`);
});

