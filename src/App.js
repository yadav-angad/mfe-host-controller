import React from "react";
import { Grid } from "@mui/material";
import { useDispatch } from 'react-redux';
import Header from "./Header";
const MFEIndia = React.lazy(() => import("MfeIndia/MfeIndia"));
const MFEUSA = React.lazy(() => import("MfeUsa/MfeUsa"));
const MFECounter = React.lazy(() => import("MfeCounter/MfeCounter"));

export default function () {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const countries = ['India', 'United States'];

    const fetchCountryData = async (country) => {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/population', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    };

    const fetchAllCountries = async () => {
      try {
        // Fetch all in parallel on page load
        await Promise.all(
          countries.map(async (country) => {
            try {
              const res = await fetchCountryData(country);
              if (res) {
                dispatch({ type: 'SET_COUNTRY_DATA', payload: res });
              }
            } catch (error) {
              console.error(`Error fetching data for ${country}:`, error);
            }
          })
        ).then(() => {
          console.log('All countries data fetched successfully');
        });
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchAllCountries();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Grid container spacing={2} sx={{ height: 'calc(100vh - 140px)' }}>
        <Header />
        <MFECounter />
        <MFEIndia />
        <MFEUSA />
      </Grid>
    </React.Suspense>
  );
}
