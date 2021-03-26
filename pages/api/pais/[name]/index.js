// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
  const { name } = req.query;
  const country = await axios.get("https://restcountries.eu/rest/v2/all");
  const countryRef = await country.data
    .reduce(
      (acc, e) => [
        ...acc,
        {
          name: e.name,
          alphaCode: e.alpha3Code,
          region: e.region,
          capital: e.capital,
          flag: e.flag,
        },
      ],
      []
    )
    .filter((x) => x.name === name);

  countryRef.length !== 0
    ? res.status(200).json(countryRef)
    : res.status(404).send("Not found");
};
