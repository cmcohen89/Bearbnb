import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '400px',
};

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
