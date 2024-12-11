import { prisma } from "../../lib/prisma"; // Подключение к базе

export default async function logoutHandler(req, res) {
    const token = req.headers.authorization?.split(" ")[1]; // Извлекаем токен

    if (!token) return res.status(401).json({ error: "Token missing" });

    try {
        // Деактивация токена
        await prisma.sessions.update({
            where: { token },
            data: { is_active: false },
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
