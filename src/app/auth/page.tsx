'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Link from "next/link";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [emailChecked, setEmailChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailCheck = async () => {
        setError("");
        setEmailChecked(false);
        setIsLoading(true); // Включаем загрузку при проверке email
        const response = await fetch('/api/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setIsLoading(false); // Отключаем загрузку после завершения проверки
        if (response.ok) {
            setIsRegistering(!data.exists);
            setEmailChecked(true);
        } else {
            setError(data.error || "Произошла ошибка при проверке email.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true); // Включаем загрузку при отправке формы

        const endpoint = isRegistering ? '/api/register' : '/api/login';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, ...(isRegistering && { confirmPassword }) }),
        });

        const data = await response.json();
        setIsLoading(false); // Отключаем загрузку после отправки данных
        if (response.ok) {
            localStorage.setItem('token', data.token);
            // alert(isRegistering ? "Аккаунт создан! Добро пожаловать!" : "Добро пожаловать обратно!");
            alert(typeof(data.token))
            // window.location.href = "/";
        } else {
            setError(data.error || "Произошла ошибка.");
        }
    };

    return (
        <div className={styles.page}>
            <Link href="/" className={styles.backButton}>
                Back
            </Link>

            <motion.div layoutId="div1" className={styles.authBox}>
                <h1 className={styles.title}>авТориЗАция</h1>
                <p className={styles.subtitle}>
                    {!emailChecked
                        ? "Введи свою почту, чтобы продолжить."
                        : isRegistering
                            ? "Создай новый аккаунт!"
                            : "С возвращением! Введи пароль, чтобы войти."}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Почта
                        </label>
                        <input
                            className={styles.input}
                            type="email"
                            id="email"
                            value={email}
                            placeholder="mail@mail.ru"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={handleEmailCheck}
                        />
                    </div>

                    {emailChecked && (
    <>
        <motion.div
            className={styles.formGroup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <label htmlFor="password" className={styles.label}>
                Пароль
            </label>
            <input
                className={styles.input}
                type="password"
                id="password"
                placeholder="*********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </motion.div>

        {isRegistering && (
            <motion.div
                className={styles.formGroup}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <label htmlFor="confirmPassword" className={styles.label}>
                    Подтвердите пароль
                </label>
                <input
                    className={styles.input}
                    type="password"
                    id="confirmPassword"
                    placeholder="*********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </motion.div>
        )}
    </>
)}


                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={styles.error}
                        >
                            {error}
                        </motion.div>
                    )}

                    <motion.button
                        type="submit"
                        className={styles.button}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!emailChecked || isLoading} // Кнопка заблокирована, если идет загрузка или email не проверен
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isLoading || !emailChecked ? 1 : 1 }} // Полупрозрачность, когда идет проверка email или загрузка
                        transition={{ duration: 0.3 }}
                    >
                        {/* Условный рендеринг текста кнопки */}
                        {!isLoading && (emailChecked ? (isRegistering ? "Зарегистрироваться" : "Войти") : "Проверить")}

                        {/* Индикатор загрузки, появляется только во время загрузки */}
                        {isLoading && (
                            <motion.div
                                className={styles.loader}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        )}
                    </motion.button>

                </form>
            </motion.div>
        </div>
    );
}
