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
import { DadosApi, GameFilter } from "../types/types";
import { gameCategories } from "@/app/data/categoria";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Cards() {
  const [filter, setFilter] = useState<GameFilter>("All games");
  const [dados, setDados] = useState<DadosApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    jogoId: number;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          console.error("Erro ao buscar dados:", response.statusText);
          return;
        }
        const data: DadosApi[] = await response.json();
        setDados(data);
      } catch (error) {
        console.error("Erro no Card:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const filtros: GameFilter[] = [
    "All games",
    "Favorites",
    "Play Next",
    "Go to's",
    "Multiplayer",
  ];

  const jogosFiltrados = dados.filter((jogo) => {
    const categoriaCorreta =
      filter === "All games" ? true : gameCategories[jogo.id] === filter;
    return categoriaCorreta;
  });

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

        <div className={styles.iconsContainer}>
          <div className={styles.icons}>
            <FontAwesomeIcon icon={faBell} />
          </div>

          <div className={styles.iconsUser}>
            <span className={styles.iconText}>
              <FontAwesomeIcon icon={faUsers} />0
            </span>
          </div>

          <div className={styles.userAvatar}>
            <Image
              src="/user.webp"
              alt="avatar"
              aria-label="User avatar"
              width={40}
              height={40}
              className={styles.userAvatar}
            />
          </div>
        </div>
      </div>

      <div className={styles.filterGames}>
        {filtros.map((filtro) => (
          <button
            key={filtro}
            className={`${styles.filterButton} ${filter === filtro ? styles.filterButtonActive : ""}`}
            onClick={() => setFilter(filtro)}
          >
            {filtro}
          </button>
        ))}
        <button className={styles.addFilter}>+</button>
      </div>

      <div className={styles.installFilter}>
        <button className={styles.installFilterButton}>Installed</button>
        <button className={styles.buttonFilter}>All</button>

        <button className={styles.installButtonIcon}>
          <FontAwesomeIcon icon={faSliders} />
        </button>
      </div>

      <div className={styles.gamesList}>
        {loading ? (
          <p className={styles.loading}>Carregando jogos...</p>
        ) : (
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
          )
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
