require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const Users = require('./models/users');
const Sessions = require('./models/sessions');

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongodb'));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const SessionActive = await Sessions.findOne({ token });
    // console.log(SessionActive);
    if (SessionActive) {
      const User = await Users.findOne({ email: SessionActive.email });
      return { User };
    }
    return { User: 'NOTAUTH' };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
