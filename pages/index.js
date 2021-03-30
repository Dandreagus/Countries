import axios from "axios";
import Head from "next/head";
import Country from "../components/Country";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";
import Fav from "../components/Fav";
import { FcSearch } from "react-icons/fc";
import { IconContext } from "react-icons/lib";

export default function Home({ country }) {
  const [paises, setpaises] = useState(country);
  const [input, setinput] = useState("");
  const [fav, setfav] = useState([]);

  const onSelect = (e) => {
    if (e === "All") return setpaises(country);
    setpaises(country.filter((b) => b.region === e));
  };

  const typing = paises.filter((pais) =>
    pais.name.toLocaleLowerCase().includes(input)
  );

  const mostrarPaises = input ? typing : paises;

  return (
    <div className={styles.main}>
      <Head>
        <title>Countries</title>
      </Head>
      <div className={styles.menu}>
        <select
          className={styles.sec}
          onChange={(e) => onSelect(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Polar">Polar</option>
          <option value="Oceania">Oceania</option>
        </select>
        <div>
          <IconContext.Provider value={{ size: "25px" }}>
            <FcSearch />
          </IconContext.Provider>
          <input
            className={styles.search}
            value={input}
            onChange={(e) => setinput(e.target.value.toLocaleLowerCase())}
          />
        </div>
        <Fav favs={fav} setfav={setfav} />
      </div>
      <div className={styles.cards}>
        {!typing.length && <h1>Not Found</h1>}
        {mostrarPaises.map((e) => (
          <Country
            setfav={setfav}
            key={e.name}
            name={e.name}
            flag={e.flag}
            fav={fav}
          />
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  const data = await axios.get("http://localhost:3000/api/hello");
  const country = data.data;
  return {
    props: { country },
  };
}
