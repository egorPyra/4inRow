import { prisma } from "../../lib/prisma"; // Подключение к базе
import { NextApiRequest, NextApiResponse } from "next";

export default async function protectedHandler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.headers.authorization?.split(" ")[1]; // Извлекаем токен из заголовка

    if (!token) return res.status(401).json({ error: "Token missing" });

    try {
        // Проверка токена
        const session = await prisma.session.findUnique({ where: { token } });

        if (!session) return res.status(401).json({ error: "Invalid token" });
        if (!session.is_active) return res.status(401).json({ error: "Inactive token" });
        if (new Date(session.expires_at) < new Date()) {
            return res.status(401).json({ error: "Token expired" });
        }

        // Запрос проходит дальше
        res.status(200).json({ message: "Access granted" });
    } catch (error) {
        console.error("Protected route error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
