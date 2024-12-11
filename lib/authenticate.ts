import jwt, { JwtPayload } from "jsonwebtoken"; // Импортируем JwtPayload для декодирования токена
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Секрет для токенов

// Функция создания токена
export function createToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }); // Токен живет 1 час
}

// Функция проверки токена (при необходимости)
export function verifyToken(token: string): JwtPayload | null { // Возвращаем JwtPayload, если токен валидный
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return typeof decoded === 'object' ? decoded : null; // Проверяем, что декодированное значение — это объект
    } catch (error) {
        return null; // Невалидный токен
    }
}

// Функция проверки пароля
export async function verifyPassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
}
