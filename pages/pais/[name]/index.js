import axios from "axios";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../styles/Details.module.css";

export default function Pais({ data }) {
  const { name, alphaCode, capital, flag, region } = data[0];
  console.log(data);

  return (
    <div className={styles.container}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={flag} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{capital}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{alphaCode}</ListGroupItem>
          <ListGroupItem>{region}</ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  let data = await axios.get(`http://localhost:3000/api/pais/${params.name}`);
  data = data.data;

  return {
    props: { data },
  };
}
