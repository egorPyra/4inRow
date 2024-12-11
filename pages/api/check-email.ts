import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../lib/prisma"; // Импортируем экземпляр Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("Request body:", req.body); // Логируем тело запроса

    const { email } = req.body || {}; // Защитимся от null

    if (!email) {
        return res.status(400).json({ error: "Email is required." });
    }

    try {
        // Проверяем, существует ли пользователь с таким email
        const user = await prisma.users.findUnique({
            where: { email }, // Ищем по email
        });

        if (user) {
            // Если пользователь найден, возвращаем, что email существует
            return res.status(200).json({ exists: true });
        } else {
            // Если пользователь не найден, возвращаем, что email не существует
            return res.status(200).json({ exists: false });
        }
    } catch (error) {
        console.error("Error checking email:", error);
        return res.status(500).json({ error: "Произошла ошибка при проверке email." });
    }
}
