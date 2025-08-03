import React from "react";
import { Button, Card } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import Header from "./Header";
const MFEIndia = React.lazy(() => import("MfeIndia/MfeIndia"));
const MFEUSA = React.lazy(() => import("MfeUsa/MfeUsa"));

export default function () {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const setUserDetails = () => {
    dispatch({ type: 'SET_USER', payload: { name: 'Angad Yadav 11' } });
  };

  React.useEffect(() => {
    const countries = [
      'India', 'United States', 'Canada', 'Australia', 'Germany',
      'France', 'Brazil', 'Japan', 'China', 'Russian Federation'
    ];

    const fetchCountryData = async (country) => {
      setIsLoading(true);
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
              // Handle error if needed
            }
          })
        ).then(() => {
          console.log('All countries data fetched successfully');
          setIsLoading(false);
        });
      } catch (error) {
        // Handle error if needed
      }
    };

    fetchAllCountries();
  }, []);

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Card>
        <Header />
      </Card>
      <Card sx={{
        width: '100%',
        height: 'calc(100vh - 120px)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: '20px',
      }}>
        <MFEIndia />
        <MFEUSA />
        {/* <Button onClick={() => setUserDetails()}>Set {store.getState()?.user?.name}</Button> */}
      </Card >
    </React.Suspense>
  );
}
