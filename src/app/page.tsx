"use client";

import Sidebar from "@/components/slidebar/slidebar";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Cards from "@/components/cards/cards";
import { useState } from "react";
import Preloader from "@/components/preloader/preloader";

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <section className={styles.container}>
      <Preloader />
      {!menuAberto && (
        <button
          className={styles.hamburger}
          onClick={() => setMenuAberto(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}
      <Sidebar isActive={menuAberto} onClose={() => setMenuAberto(false)} />
      <Cards />
    </section>
  );
}
