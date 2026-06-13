"use client";

import styles from "./AllModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faUsers, faGear } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function ModalAvatar() {
  return (
    <div className={styles.modal} onPointerDown={(e) => e.stopPropagation()}>
      <div className={styles.modalAvatarHeader}>
        <Image
          src="/user.webp"
          alt="avatar"
          width={48}
          height={48}
          className={styles.modalAvatarImg}
        />
        <div>
          <p className={styles.modalUsername}>Marlinho</p>
          <span className={styles.modalStatus}>🟢 Online</span>
        </div>
      </div>

      <hr className={styles.modalDivider} />

      <ul className={styles.modalList}>
        <li className={styles.modalListItem}>
          <FontAwesomeIcon icon={faBell} className={styles.modalIcon} />
          Notificações
        </li>
        <li className={styles.modalListItem}>
          <FontAwesomeIcon icon={faUsers} className={styles.modalIcon} />
          Amigos
        </li>
      </ul>

      <hr className={styles.modalDivider} />

      <ul className={styles.modalList}>
        <li className={styles.modalListItem}>
          <FontAwesomeIcon icon={faGear} className={styles.modalIcon} />
          Configurações
        </li>
        <li className={`${styles.modalListItem} ${styles.modalListItemDanger}`}>
          Sair
        </li>
      </ul>
    </div>
  );
}
