import { db } from './connection';
import { room_types } from './schema';

const main = async () => {
  const res = await db.insert(room_types).values({id: 1, name: "Single"}).returning();

  console.log(res);
};