import type { Request, Response } from 'express';
import express from 'express';
import { createClient } from 'redis';

async function main() {
  // initialize express
  const app = express();

  // initialize the redis client
  const client = await createClient()
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();

  // initialize the route (/)
  app.get('/', async (req: Request, res: Response) => {
    // fetch the 'views' key from the redis db
    const views = await client.get('views');
    res.send(`Views = ${views}`);
    // as long as views is not null
    views
      ? // set the views key, but parse it as int first then add one
        await client.set('views', parseInt(views) + 1)
      : await client.disconnect();
  });

  // set the port and listen with the express method
  const port = 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
main();
