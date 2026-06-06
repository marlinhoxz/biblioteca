"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTag,
  faUsers,
  faTableCellsLarge,
  faWandMagicSparkles,
  faPlay,
  faDownload,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faUnrealEngine } from "@fortawesome/free-brands-svg-icons";
import styles from "./slidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { DadosApi } from "../types/types";

const menuItems = [
  { id: 0, icon: faTag, label: "Store", href: "/store", implemented: false },
  {
    id: 1,
    icon: faTableCellsLarge,
    label: "Library",
    href: "/",
    implemented: true,
  },
  {
    id: 2,
    icon: faWandMagicSparkles,
    label: "Factory",
    href: "/factory",
    implemented: false,
  },
  {
    id: 3,
    icon: faUsers,
    label: "Community",
    href: "/community",
    implemented: false,
  },
  {
    id: 4,
    icon: faUnrealEngine,
    label: "Unreal Engine",
    href: "/unreal-engine",
    implemented: false,
  },
];

interface SidebarProps {
  isActive?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isActive = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [desenvolvido, setDesenvolvido] = useState<string | null>(null);
  const [dados, setDados] = useState<DadosApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Falha ao buscar jogos");
        }
        const data: DadosApi[] = await response.json();
        setDados(data.slice(0, 5));
      } catch (error) {
        console.error("Erro no Sidebar:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <aside
        className={`${styles.sidebar} ${isActive ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.logo}>
          <span className={styles.logoText}>EPIC</span>
          <span className={styles.logoSub}>...</span>

          <button
            type="button"
            className={styles.menuButton}
            aria-label="Abrir menu"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav className={styles.navMenu}>
          <ul className={styles.navList} role="list">
            {menuItems.map(({ id, icon: Icon, label, href, implemented }) => {
              const isActiveLink = pathname === href;

              return (
                <li key={id}>
                  {implemented ? (
                    <Link
                      href={href}
                      className={`${styles.navItem} ${isActiveLink ? styles.active : ""}`}
                      aria-current={isActiveLink ? "page" : undefined}
                      onClick={onClose}
                    >
                      <FontAwesomeIcon
                        icon={Icon}
                        className={styles.navIcon}
                        aria-hidden="true"
                      />
                      <span className={styles.labelText}>{label}</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={styles.navItem}
                      onClick={() => {
                        setDesenvolvido(label);
                        onClose?.();
                      }}
                    >
                      <FontAwesomeIcon
                        icon={Icon}
                        className={styles.navIcon}
                        aria-hidden="true"
                      />
                      <span className={styles.labelText}>{label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.games}>
          <p className={styles.clickGame}>Quick Launch</p>
          {loading ? (
            <p className={styles.loading}>Carregando jogos...</p>
          ) : (
            <ul className={styles.gamesList} role="list">
              {dados.map(({ id, name, image }) => (
                <li key={id} className={styles.gameItem}>
                  <img
                    src={image}
                    alt={name}
                    className={styles.gameThumbnail}
                  />
                  <div className={styles.gameInfo}>
                    <span className={styles.gameTitle}>{name}</span>
                    <button className={styles.gameButton}>
                      <FontAwesomeIcon icon={faPlay} /> Lounch
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.footer}>
          <span>
            <FontAwesomeIcon icon={faDownload} />
          </span>
          <div className={styles.footerContent}>
            <p>Downloads</p>
            <p className={styles.pDonwload}>1 out of 2</p>
          </div>
        </div>
        <div className={styles.footerProgress}>
          <div className={styles.footerProgressBar} 
          key={isActive ? "open" : "closed"}
          style={{ width: "50%" }} />
        </div>
      </aside>
    </>
  );
}
