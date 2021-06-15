import db from "./db"; // see the README for how to manipulate this object
import { GraphQLServer, PubSub } from "graphql-yoga";
import Query from "./resolvers/Query";
import Person from "./resolvers/Person";
import Mutation from "./resolvers/Mutation";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
    Query,
    Person,
    Mutation,
  },
  context: {
    db,
    pubsub,
  },
});

server.start({ port: 5000 }, () => {
  console.log(`Listening on http://localhost:5000`);
});
