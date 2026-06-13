"use client";
import { useEffect, useState } from "react";
import styles from "./preloader.module.css";

export default function Preloader() {
  const [hide, setHide] = useState(false);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 2500);
    const remove = setTimeout(() => setRemove(true), 3200);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  if (remove) return null;

  return (
    <div className={`${styles.preloader} ${hide ? styles.preloaderHide : ""}`}>
      <div className={styles.logo}>
        <span className={styles.by}>BY:</span>
        <span className={styles.name}>MARLINHO</span>
      </div>
    </div>
  );
}