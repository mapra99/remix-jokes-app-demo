import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

import type { LoaderFunction } from '@remix-run/node'
import type { Joke } from "@prisma/client";

type LoaderData = { randomJoke: Joke }

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber,
  });

  const data : LoaderData = { randomJoke }

  return json(data)
}

export default () => {
  const { randomJoke } = useLoaderData();

  return (
    <div>
      <p>Here's a random joke:</p>
      <p>
        { randomJoke.content }
      </p>
      <Link to={randomJoke.id}>{randomJoke.name} Permalink</Link>
    </div>
  );
}
