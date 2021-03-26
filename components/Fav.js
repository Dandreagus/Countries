import React, { useEffect } from "react";
import styles from "../styles/Fav.module.css";
import { TiDelete } from "react-icons/ti";
import { IconContext } from "react-icons/lib";
import Link from "next/link";

export default function Fav({ favs, setfav }) {
  const deleteFav = (name) => {
    const del = favs.filter((e) => e !== name);
    setfav(del);
  };

  useEffect(() => {
    const data = localStorage.getItem("favoritos");
    if (data) {
      setfav(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favs));
  });

  return (
    <div className={styles.fav}>
      <h1>Favorites</h1>
      {favs.map((x) => (
        <div className={styles.caja}>
          <Link href={`/pais/${x}`}>
            <a>{x}</a>
          </Link>
          <div className={styles.but}>
            <IconContext.Provider value={{ size: "30px" }}>
              <TiDelete onClick={() => deleteFav(x)} />
            </IconContext.Provider>
          </div>
        </div>
      ))}
    </div>
  );
}
