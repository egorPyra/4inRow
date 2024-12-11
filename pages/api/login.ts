import { prisma } from "../../lib/prisma"; // Подключение к базе
import { createToken } from "../../lib/authenticate"; // Функция для создания токена
import { verifyPassword } from "../../lib/authenticate"; // Функция проверки пароля
import { NextApiRequest, NextApiResponse } from "next";

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
            // Проверяем пользователя
            const user = await prisma.users.findUnique({ where: { email } });
            if (!user) return res.status(404).json({ error: "User not found" });

            // Проверяем пароль
            const isPasswordValid = await verifyPassword(password, user.password); // Хэш проверка
            if (!isPasswordValid) return res.status(401).json({ error: "Invalid credentials" });

            // Генерация токена
            const token = createToken({ email: user.email }); // Например, JWT или UUID

            // Создание сессии
            // await prisma.session.create({
            //     data: {
            //         user_email: email,
            //         expires_at: new Date(Date.now() + 3600000),  // Время истечения токена (1 час)
            //         is_active: true,
            //         token: token,
            //         users: {
            //             connect: {
            //                 email: email,
            //             },
            //         }
            //     },
            // });

            return res.status(200).json({ message: "Logged in successfully", token });
        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
