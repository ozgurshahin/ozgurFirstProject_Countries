import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect, useState} from "react";

export default function Home() {

    const [countries, setCountries] = useState(null)

    useEffect(() => {
        getCountries();
    }, [])
    const getCountries = async () => {
        const response = await fetch("/api/countries")
        const countryData = await response.json();
        setCountries(countryData);
        // debugger

    }

    if (!countries) {
        return null;
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main>
                <table>
                    <head>

                    </head>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Capital</th>
                        <th>Population</th>
                        <th>Flag</th>
                    </tr>
                    </thead>
                    <tbody>
                    {countries
                        .map(
                            (country, index) =>
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{country.name}</td>
                                    <td>{country.capital}</td>
                                    <td>{country.population}</td>
                                    <td>{country.flag}</td>
                                </tr>
                        )
                    }
                    </tbody>
                </table>
            </main>
        </div>
    );
}
