'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== "correct-password") {
            setError("Неправильный пароль");
        } else {
            setError("");
            alert("Welcome back! Authenticated.");
        }
    };

    return (
        <div className={styles.page}>
            {/* Back Button */}
            <Link href="/" className={styles.backButton}>
                Back
            </Link>

            <motion.div
                layoutId="div1"
                className={styles.authBox}
            >
                <h1 className={styles.title}>авТориЗАция</h1>
                <p className={styles.subtitle}>
                    С возвращением! Давай скорее поиграем. Введи свою почту и пароль
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
                        />
                    </div>

                    <div className={styles.formGroup}>
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
                    </div>

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
                    >
                        Продолжить
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}
