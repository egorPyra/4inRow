
import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../lib/prisma";




export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email } = req.body;

    const user = await prisma.users.findUnique({
        where: { email },
      });
      
      if (!user) {
        console.error("User not found in database.");
        return res.status(404).json({ error: "Пользователь не найден." });
      } else {
        console.log("User found in database:");
        return res.status(200).json({ user });
      }
      
}