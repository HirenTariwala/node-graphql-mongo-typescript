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
     * Expose Port
     */
    const port = process.env.PORT || 8080;

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

    app.use('/', (req: any, res: any) => {
      res.send('Hello App started pelase visit /graphql route');
    });

    /**
     * Started server on port
     */
    app.listen(port, () =>
      console.log(`Node Graphql API listening on port ${port}!`)
    );
  })
  .catch((err) => console.log(err.stack));
