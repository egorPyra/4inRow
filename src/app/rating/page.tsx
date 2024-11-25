'use client'
import { motion } from "framer-motion";

export default function RatingPage() {
  return (
    <motion.div
      layoutId="div2"
      style={{
        width: 500,
        height: 500,
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
    >
      <h1>Welcome to РеЙТИнг!</h1>
    </motion.div>
  );
}
