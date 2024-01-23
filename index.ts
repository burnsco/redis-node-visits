import type { Request, Response } from 'express';
import express from 'express';
import { createClient } from 'redis';

async function main() {
  const app = express();

  const client = await createClient({
    url: 'redis://redis:6379',
  })
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();

  await client.set('views', 0);

  app.get('/', async (req: Request, res: Response) => {
    const views = await client.get('views');
    res.send(`Views = ${views} (asdfdsf?)`);

    views
      ? // set the views key, but parse it as int first then add one
        await client.set('views', parseInt(views) + 1)
      : await client.disconnect();
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
main();
