const { GraphQLServer, PubSub } = require("graphql-yoga");
const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const mongo = require("./mongo");
const db = require("./db");
const Message = require("./resolvers/message");
const User = require("./resolvers/user");
const ChatBox = require("./resolvers/chatBox");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");

const pubsub = new PubSub();
//const server = http.createServer(app);
//const wss = new WebSocket.Server({ server })

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers: {
    Message,
    User,
    ChatBox,
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

mongo.connect();
const PORT = process.env.port || 4000;

server.start(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
