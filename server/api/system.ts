import { serverSupabaseUser } from "#supabase/server";
import { PrismaClient } from '@prisma/client'
import { MenuOption } from "~~/typings/System";

const prisma = new PrismaClient();

export default defineEventHandler( async (event) => {
  const userSession = await serverSupabaseUser(event)

  if(!userSession) {
    console.error(`Error at ${event.path}. Unauthorized`);
    const error = createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
    sendError(event, error, false);
  }

  try{
    const data = await prisma.$queryRaw`
      select
      id, parent, position, link, name_es, icon, comment_es
      from sys_links
      /*inner join (
          select -1 as v,  pg_sleep(.3) as temp
      )t on id <> v*/
      order by parent, position
    `;
    //const newResults: MenuOption[] = data as MenuOption[];
    return data as MenuOption[];
  }catch(err) {
    console.error(`Error at ${event.path}. ${err}`);
    const error = createError({
      statusCode: 500,
      statusMessage: 'Unhandled exception',
    });
    sendError(event, error, false);
  }
});
