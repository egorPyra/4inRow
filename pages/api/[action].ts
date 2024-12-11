// /pages/api/auth/[action].ts
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {prisma} from "../../lib/prisma"; // Импорт экземпляра Prisma

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = '1h'; // Время действия токена

// Функция создания JWT токена
const createToken = (email: string) => {
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password, action } = req.body; // action может быть "login" или "register"

    if (req.method === 'POST') {
        if (action === 'register') {
            // Проверка на существование пользователя
            const existingUser = await prisma.users.findUnique({
                where: { email },
            });

            if (existingUser) {
                return res.status(400).json({ error: "Пользователь с таким email уже существует." });
            }

            // Хеширование пароля перед сохранением
            const hashedPassword = await bcrypt.hash(password, 10);

            // Создание нового пользователя
            const newUser = await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    active: new Date(),
                },
            });

            // Создание токена
            const token = createToken(email);

            // Создание сессии в базе данных
            const session = await prisma.session.create({
                data: {
                    user_email: email,
                    expires_at: new Date(Date.now() + 3600000),  // Время истечения токена (1 час)
                    is_active: true,
                    token: token,
                    users: {
                        connect: {
                            email: email,
                        },
                    }
                },
            });

            return res.status(200).json({ message: "Регистрация прошла успешно", token });
        }

        if (action === 'login') {
            // Проверка существования пользователя
            const user = await prisma.users.findUnique({
                where: { email },
            });

            if (!user) {
                return res.status(400).json({ error: "Пользователь не найден." });
            }

            // Проверка пароля
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ error: "Неверный пароль." });
            }

            // Обновление поля active на текущую дату
            await prisma.users.update({
                where: { email },
                data: {
                    active: new Date(),
                },
            });

            // Создание токена
            const token = createToken(email);

            // Создание сессии
            const session = await prisma.session.create({
                data: {
                    user_email: email,
                    expires_at: new Date(Date.now() + 3600000),  // Время истечения токена (1 час)
                    is_active: true,
                    token: token,
                    users: {
                        connect: {
                            email: email,
                        },
                    }
                },
            });

            return res.status(200).json({ message: "Добро пожаловать!", token });
        }
    } else {
        res.status(405).json({ error: "Метод не поддерживается." });
    }
}
