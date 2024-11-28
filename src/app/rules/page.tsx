"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const RulesPage: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const rules = [
        {
            title: "Краткое описание",
            content:
                "Это стратегическая игра для двух игроков на поле 4х4. Цель игры — собрать 4 фишки одного цвета в ряд (по горизонтали или вертикали). Игроки ходят по очереди, и после каждого хода все фишки на поле перемещаются согласно заданным стрелкам.",
            image: "/boardexample.png",
        },
        {
            title: "Важно!",
            content:
                "Время на один ход ограничено: у игрока есть <b>120 секунд</b>, чтобы сделать ход. Если ход не сделан за это время, засчитывается поражение.",
            image: "/boardexample.png",
        },
        {
            title: "Ходы и перемещение фишек",
            content:
                "За свой ход игрок должен:<br/><b>1.</b> Переместить фишку противника на любую свободную клетку поля.<br/><b>2.</b> Положить свою фишку на любую свободную клетку поля.",
            image: "/boardexample.png",
        },
        {
            title: "Ходы и перемещение фишек",
            content:
                "После этого <b>все фишки</b> на&nbsp;поле перемещаются на&nbsp;одну клетку в&nbsp;сторону, указанную стрелками.",
            image: "/boardexample.png",
        },
        {
            title: "Цель игры",
            content:
                "<b>1.</b> Игра продолжается до&nbsp;тех пор, пока один из&nbsp;игроков не&nbsp;соберёт 4&nbsp;фишки в&nbsp;ряд своего цвета (по&nbsp;горизонтали или вертикали).<br/><b>2.</b> Если все клетки поля заполняются фишками и&nbsp;никто не&nbsp;собрал 4&nbsp;фишки в&nbsp;ряд, игра считается ничьей.",
            image: "/boardexample.png",
        },
        {
            title: "Готов играть?",
            content: "Теперь, когда вы знаете правила, вы готовы приступить к игре!",
            image: "/boardexample.png", // Optional image
            isFinal: true, // Indicates the final block
        },
    ];

    const nextSlide = () => {
        if (currentSlide < rules.length - 1) {
            setCurrentSlide((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1);
        }
    };

    return (
        <div className={styles.page}>
            {/* Back Button */}
            <Link href="/" className={styles.backButton}>
                Back
            </Link>

            {/* Rules Window */}
            <motion.div layoutId="div5" className={styles.rulesWindow}>
                <img
                    src={rules[currentSlide].image}
                    alt={rules[currentSlide].title}
                    className={styles.image}
                />
                <h2 className={styles.title}>{rules[currentSlide].title}</h2>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: rules[currentSlide].content }}
                ></div>

                {rules[currentSlide].isFinal && (
                    <Link href="/game" className={styles.playButton}>
                        К игре!
                    </Link>
                )}
            </motion.div>

            {/* Navigation Arrows */}
            {!rules[currentSlide].isFinal && (
                <>
                    <button
                        className={`${styles.arrowButton} ${styles.leftArrow}`}
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                    >
                        &#60;
                    </button>
                    <button
                        className={`${styles.arrowButton} ${styles.rightArrow}`}
                        onClick={nextSlide}
                        disabled={currentSlide === rules.length - 1}
                    >
                        &#62;
                    </button>
                </>
            )}

            {/* Page Counter */}
            <h1 className={styles.counter}>
                {currentSlide + 1} / {rules.length}
            </h1>
        </div>
    );
};

export default RulesPage;
