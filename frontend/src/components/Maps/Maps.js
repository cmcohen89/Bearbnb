import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px',
};

// const getData = async () => {
//   const geoApi = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=4d9982343019d3bc7b8f97ee0e5a8779`);
//   const data = await geoApi.json();
//   const lat = data[0].lat;
//   const lng = data[0].lon;
//   return [lat, lng];
// }


const Maps = ({ apiKey, spot }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [info, setInfo] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const locationData = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${spot.city},+${spot.state}&key=${apiKey}`);
      const data = await locationData.json();
      console.log(data.results[0].geometry.location.lat)
      setInfo([data.results[0].geometry.location.lat, data.results[0].geometry.location.lng]);
    }
    if (!info.length) getData();
  }, [])

  console.log(info);

  const center = {
    lat: info[0],
    lng: info[1]
  }

  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
        />
      )}
    </>
  );
};

export default React.memo(Maps);
