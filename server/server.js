const { GraphQLServer, PubSub } = require('graphql-yoga');

const messages = [];

const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    messages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }

  type Subscription {
    messages: [Message!]
  }
`;

const subscribers = [];
const onMessagesUpdates = (fn) => subscribers.push(fn);

const resolvers = {
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      subscribers.forEach((fn) => fn());
      return id;
    },
  },
  Subscription: {
    messages: {
      subscribe: (parent, args, { pubsub }) => {
        const channel = Math.random().toString(36).slice(2, 15);
        onMessagesUpdates(() => pubsub.publish(channel, { messages }));
        setTimeout(() => pubsub.publish(channel, { messages }), 0);
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const startTime = Date.now();
console.log('#1', Date.now() - startTime);

const pubsub = new PubSub();

console.log('#2', Date.now() - startTime);

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

console.log('#3', Date.now() - startTime);

const port = process.env.PORT || 4000;

server.start(({ port }) => {
  console.log(`Server is up on port ${port}/`);

  console.log('#4', Date.now() - startTime);
});
