import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './graphqlSchemaResolver/schema';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Resolver from './graphqlSchemaResolver/Resolver';
import isAuth from './middleware/Auth';

/**
 * Connect mongo on cloud
 */
mongoose
  .connect(process.env.MONGO_HOST)
  .then(() => {
    /**
     * Port
     */
    const port = 80;

    /**
     * Express app
     */
    const app: express.Application = express();

    /**
     * Take care of req body
     */
    app.use(bodyParser.json());

    /**
     * Add cors for incomming request
     */
    app.use(cors());

    /**
     * Added isAuth middlewate for incomming req
     */
    app.use(isAuth);

    /**
     * Main root enapoint for qrpahql
     */
    app.use(
      '/graphql',
      graphqlHTTP({
        schema,
        rootValue: Resolver,
        graphiql: true,
      })
    );

    /**
     * Started server on 8080 port
     */
    app.listen(port, () =>
      console.log(`Node Graphql API listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err.stack));
