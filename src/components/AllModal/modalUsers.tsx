"use client";

import styles from "./AllModal.module.css";

export default function ModalUsers() {
  return (
    <div className={styles.modal} onPointerDown={(e) => e.stopPropagation()}>
      <h5>Nenhum amigo adicionado</h5>
    </div>
  );
}
