"use client";
import styles from "./cards.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faSliders,
  faUsers,
  faTrophy,
  faFire,
  faPlay,
  faDownload,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { GameFilter } from "../types/types";
import { gameCategories } from "@/app/data/categoria";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { useClickOutside } from "@/app/hooks/useClickOutside";
import ModalAvatar from "../AllModal/modalAvatar";
import ModalUsers from "../AllModal/modalUsers";
import ModalNotifications from "../AllModal/modalNotificacoes";
import useGames from "@/app/hooks/useGames";

type ModalType = "avatar" | "users" | "notifications";

const filtros: GameFilter[] = [
  "All games",
  "Favorites",
  "Play Next",
  "Go to's",
  "Multiplayer",
];

export default function Cards() {
  const [filter, setFilter] = useState<GameFilter>("All games");
  const { dados, loading, error } = useGames();
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    jogoId: number;
  } | null>(null);
  const areaRef = useRef<HTMLDivElement>(null);
  const [activeModal, setModalActive] = useState<ModalType | null>(null);
  const toglleMondal = useCallback((modal: ModalType) => {
    setModalActive((prev) => (prev === modal ? null : modal));
  }, []);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("pointerdown", handleClick);
    return () => window.removeEventListener("pointerdown", handleClick);
  }, []);

  useClickOutside(areaRef, () => setModalActive(null));

  const jogosFiltrados = useMemo(
    () =>
      dados.filter((jogo) =>
        filter === "All games" ? true : gameCategories[jogo.id] === filter,
      ),
    [dados, filter],
  );

  return (
    <section className={styles.cardsContainer}>
      <div className={styles.searchBar}>
        <div className={styles.searchContainer}>
          <label htmlFor="searchInput">Library</label>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchInput}
          />
        </div>

        <div className={styles.containerIcons} ref={areaRef}>
          <div className={styles.iconsContainer}>
            <div
              className={styles.icons}
              onPointerDown={(e) => {
                e.stopPropagation();
                toglleMondal("notifications");
              }}
            >
              <FontAwesomeIcon icon={faBell} />
              {activeModal === "notifications" && <ModalNotifications />}
            </div>

            <div className={styles.iconsUser}>
              <span
                className={styles.iconText}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  toglleMondal("users");
                }}
              >
                <FontAwesomeIcon icon={faUsers} />0
                {activeModal === "users" && <ModalUsers />}
              </span>
            </div>

            <div
              className={styles.userAvatar}
              onPointerDown={(e) => {
                e.stopPropagation();
                toglleMondal("avatar");
              }}
            >
              <Image
                src="/user.webp"
                alt="avatar"
                aria-label="User avatar"
                width={40}
                height={40}
                className={styles.userAvatar}
              />
              {activeModal === "avatar" && <ModalAvatar />}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterGames}>
        <button
          className={styles.filterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "X Fechar" : "☰ Categorias"}
        </button>

        <div
          className={`${styles.filterList} ${showFilters ? styles.filterListOpen : ""}`}
        >
          {filtros.map((filtro) => (
            <button
              key={filtro}
              className={`${styles.filterButton} ${filter === filtro ? styles.filterButtonActive : ""}`}
              onClick={() => {
                setFilter(filtro);
                setShowFilters(false);
              }}
            >
              {filtro}
            </button>
          ))}
          <button className={styles.addFilter}>+</button>
        </div>
      </div>
      <div className={styles.installFilter}>
        <button className={styles.installFilterButton}>Installed</button>
        <button className={styles.buttonFilter}>All</button>

        <button className={styles.installButtonIcon}>
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      <div className={styles.gamesList}>
        {loading && <p className={styles.loading}>Carregando jogos...</p>}
        {error && <p className={styles.error}>Erro ao carregar jogos.</p>}
        {!loading &&
          !error &&
          jogosFiltrados.map(
            ({ id, name, image, trofeusObtidos, trofeusTotais, installed }) => (
              <div
                key={id}
                className={styles.gameCard}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({ x: e.clientX, y: e.clientY, jogoId: id });
                }}
                onClick={() => setContextMenu(null)}
              >
                <Image
                  src={image}
                  alt={name}
                  width={700}
                  height={700}
                  quality={100}
                  className={styles.imgCard}
                />
                <div className={styles.gameInfo}>
                  <h4 className={styles.gameName}>{name}</h4>
                  <span>...</span>
                </div>
                <div className={styles.gameTrofeus}>
                  <div>
                    <FontAwesomeIcon
                      icon={
                        trofeusObtidos === trofeusTotais ? faFire : faTrophy
                      }
                      className={
                        trofeusObtidos === trofeusTotais
                          ? styles.iconFire
                          : styles.iconTrophy
                      }
                    />
                    <span className={styles.trofeusText}>
                      {trofeusObtidos}/{trofeusTotais}
                    </span>
                  </div>
                  {installed ? (
                    <FontAwesomeIcon
                      icon={faPlay}
                      className={styles.iconPlay}
                    />
                  ) : (
                    <p className={styles.installButton}>
                      <FontAwesomeIcon
                        icon={faDownload}
                        className={styles.iconDownload}
                      />{" "}
                      Install
                    </p>
                  )}
                </div>
              </div>
            ),
          )}
      </div>

      {contextMenu && (
        <ul
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li className={styles.menuItem}>Launch</li>
          <li className={styles.menuItem}>Go to store page</li>
          <li className={styles.menuItem}>Add to favorites</li>
          <li className={styles.menuItemDivider} />
          <li className={styles.contextMenuItem}>
            <FontAwesomeIcon icon={faGear} /> Manage
          </li>
        </ul>
      )}
    </section>
  );
}
