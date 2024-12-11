"use client";

import React from "react";
import styles from "./page.module.css";

const ConfigPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Heading 1 - Main Title</h1>
      <h2>Heading 2 - Subheading</h2>
      <h3>Heading 3 - Section Title</h3>
      <h4>Heading 4 - Subsection Title</h4>
      <p>
        This is a paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Ut convallis, libero eu venenatis feugiat, lectus metus pharetra
        nisi, id bibendum purus felis ut libero.
      </p>
      <p>
        Another paragraph with <b>bold text</b>, <i>italic text</i>, and a{" "}
        <a href="#">link</a>.
      </p>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
    </div>
  );
};

export default ConfigPage;
