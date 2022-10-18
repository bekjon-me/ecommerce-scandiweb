import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import resolvers from './resolvers';

const port = Number.parseInt(process.env.PORT) || 4000;


const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});


server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});