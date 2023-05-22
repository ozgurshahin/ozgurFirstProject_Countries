import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const url = 'https://restcountries.com/v3.1/all';
            const response = await axios.get(url);
            const countryData = response.data;

            const filterName = req.query.name || '';

            const countryDTOs = countryData
                .filter((country) =>
                    country.name.common.toLowerCase().includes(filterName.toLowerCase())
                )
                .map((country) => {
                    const name = country.name.common || '';
                    const capital = country.capital?.[0] || '';
                    const population = country.population || 0;
                    const flag = country.flag || 0;

                    return {
                        name: name,
                        capital: capital,
                        population: population,
                        flag: flag,
                    };
                });

            res.status(200).json(countryDTOs);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    }
}
