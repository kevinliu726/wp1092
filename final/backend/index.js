import mongo from "./mongo.js";
import db from "./db.js";
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import Subscription from "./resolvers/Subscription.js";

const pubSub = new PubSub();
const rooms = new Map();
const port = process.env.PORT | 8080;

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
      Query,
      Mutation,
      Subscription
  },
  context: {
    db,
    rooms,
    pubSub
  }
})

mongo.connect();

server.start({port}, () => {
    console.log("The server is up on port " + port + ".");
})

