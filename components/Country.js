import styles from "../styles/Country.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Country({ name, flag, fav, setfav }) {
  const [star, setstar] = useState(false);

  const addFav = (name) => {
    setstar(true);
    setfav([...fav, name]);
  };
  const deleteFav = (name) => {
    setstar(false);
    const delet = fav.filter((e) => e !== name);
    setfav(delet);
  };
  useEffect(() => {
    function test() {
      fav.includes(name) ? setstar(true) : setstar(false);
    }
    test();
  }, [fav]);

  return (
    <div>
      <div className={styles.card}>
        <Card style={{ width: "15rem", height: "20rem" }}>
          <Card.Img src={flag} style={{ height: "50%", width: "100%" }} />
          <Card.Body className={styles.card}>
            <Card.Title>{name}</Card.Title>
            <IconContext.Provider value={{ size: "30px" }}>
              {!star ? (
                <AiOutlineStar onClick={() => addFav(name)} />
              ) : (
                <AiFillStar onClick={() => deleteFav(name)} />
              )}
            </IconContext.Provider>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
{
  /* <div className={styles.card}>
  <p className={styles.p}>{name}</p>
  <img className={styles.imageC} src={flag}></img>
  <IconContext.Provider value={{ size: "30px" }}>
    {!star ? (
      <AiOutlineStar onClick={() => addFav(name)} />
    ) : (
      <AiFillStar onClick={() => deleteFav(name)} />
    )}
  </IconContext.Provider>
</div>;
 */
}
