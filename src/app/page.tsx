import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.parent}>
      {/* <h1>Hello world!</h1> */}
      <div className={styles.div1}>
        <h1>Авторизация</h1>
      </div>
      <div className={styles.div2}> 
        <h1>РеЙТИнг</h1>
        <Image src="/rating.svg" alt="rating" width={181} height={148} />
      </div>
      <div className={styles.div3}> 
        <Image src="/tv.svg" alt="tv" width={68} height={72} />
        <h1>История игр</h1>
      </div>
      <div className={styles.div4}>
        <h1>О проекте</h1>
      </div>
      <div className={styles.div5}>
        <h1>Правила игры</h1>
        <Image src={'/red-teacher.svg'} alt="red teacher" width={173} height={178} />
      </div>
      <div className={styles.div6}>
        <h1>Играть</h1>
        <Image src={'/stadium.svg'} alt="stadium" width={395} height={244} />
      </div>
      <div className={styles.div7}>
        <Image src="/characters.svg" alt="characters" width={963} height={321} />
      </div>
    </div>
  );
}
