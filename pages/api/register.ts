import { NextApiRequest, NextApiResponse } from "next";
import {prisma} from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user } = req; // Доступ к полю user, которое добавлено в тип

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Метод не разрешен" });
    }

    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ error: "Все поля должны быть заполнены." });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Пароли не совпадают. Повторите попытку." });
    }

    try {
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ error: "Пользователь с таким email уже существует." });
        }

        // Хэшируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаём пользователя
        await prisma.users.create({
            data: {
                email,
                password: hashedPassword,
                active: new Date(),
                character: "RED", // По умолчанию RED
            },
        });

        res.status(201).json({ message: "Пользователь успешно зарегистрирован." });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}
