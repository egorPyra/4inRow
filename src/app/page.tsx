'use client';

import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const handleCellClick = (route: string) => {
    router.push(route); 
  };

  return (
    <motion.div
      className={styles.parent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.div1}
        layoutId="div1"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick("/auth")}
      >
        <h1>авТориЗАция</h1>
      </motion.div>
      <motion.div
        className={styles.div2}
        layoutId="div2"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick("/rating")}
      >
        <h1>РеЙТИнг</h1>
        <Image src="/rating.svg" alt="rating" width={181} height={148} />
      </motion.div>
      <motion.div
        className={styles.div3}
        layoutId="div3"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick("/history")}
      >
        <Image src="/tv.svg" alt="tv" width={68} height={72} />
        <h1>История игр</h1>
      </motion.div>
      <motion.div
        className={styles.div4}
        layoutId="div14"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick("/about")}
      >
        <h1>информацИя</h1>
      </motion.div>
      <motion.div
        className={styles.div5}
        layoutId="div5"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick("/rules")}
      >
        <h1>Правила игры</h1>
        <Image src="/red-teacher.svg" alt="red teacher" width={173} height={178} />
      </motion.div>
      <motion.div
        className={styles.div6}
        layoutId="div6"
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCellClick("/play")}
      >
        <h1>Играть</h1>
        <Image src="/stadium.svg" alt="stadium" width={395} height={244} />
      </motion.div>
      <motion.div className={styles.div7}>
        <Image src="/characters.svg" alt="characters" width={963} height={321} />
      </motion.div>
    </motion.div>
  );
}
