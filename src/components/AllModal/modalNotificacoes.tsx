"use client";

import styles from "./AllModal.module.css";

export default function ModalNotifications() {
  return (
    <div className={styles.modal} onPointerDown={(e) => e.stopPropagation()}>
      <h5>Notifications</h5>
      <p className={styles.pModal}>Seja Bem-vindo</p>
    </div>
  );
}
