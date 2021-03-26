// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default async (req, res) => {
  const country = await axios.get("https://restcountries.eu/rest/v2/all");
  const countryRef = await country.data.reduce(
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
  );

  res.status(200).json(countryRef);
};
