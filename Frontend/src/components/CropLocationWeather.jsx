import { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from 'react-leaflet';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});


// Locations where different crops are commonly grown
const cropLocations = {

  Rice: [
    {
      name: 'Tamil Nadu',
      latitude: 11.1276,
      longitude: 78.6569
    },
    {
      name: 'Andhra Pradesh',
      latitude: 15.9129,
      longitude: 79.7400
    },
    {
      name: 'West Bengal',
      latitude: 22.9868,
      longitude: 87.8550
    },
    {
        name: 'Guru Home',
      latitude: 10.642045,
      longitude: 76.965185


    }
  ],

  Wheat: [
    {
      name: 'Punjab',
      latitude: 31.1471,
      longitude: 75.3412
    },
    {
      name: 'Haryana',
      latitude: 29.0588,
      longitude: 76.0856
    },
    {
      name: 'Uttar Pradesh',
      latitude: 26.8467,
      longitude: 80.9462
    }
  ],

  Maize: [
    {
      name: 'Karnataka',
      latitude: 15.3173,
      longitude: 75.7139
    },
    {
      name: 'Maharashtra',
      latitude: 19.7515,
      longitude: 75.7139
    },
    {
      name: 'Bihar',
      latitude: 25.0961,
      longitude: 85.3131
    }
  ],

  Potato: [
    {
      name: 'Uttar Pradesh',
      latitude: 26.8467,
      longitude: 80.9462
    },
    {
      name: 'West Bengal',
      latitude: 22.9868,
      longitude: 87.8550
    },
    {
      name: 'Bihar',
      latitude: 25.0961,
      longitude: 85.3131
    }
  ],

  Onion: [
    {
      name: 'Maharashtra',
      latitude: 19.7515,
      longitude: 75.7139
    },
    {
      name: 'Karnataka',
      latitude: 15.3173,
      longitude: 75.7139
    },
    {
      name: 'Gujarat',
      latitude: 22.2587,
      longitude: 71.1924
    }
  ],

  Sugarcane: [
    {
      name: 'Uttar Pradesh',
      latitude: 26.8467,
      longitude: 80.9462
    },
    {
      name: 'Maharashtra',
      latitude: 19.7515,
      longitude: 75.7139
    },
    {
      name: 'Karnataka',
      latitude: 15.3173,
      longitude: 75.7139
    }
  ],

  Groundnut: [
    {
      name: 'Gujarat',
      latitude: 22.2587,
      longitude: 71.1924
    },
    {
      name: 'Andhra Pradesh',
      latitude: 15.9129,
      longitude: 79.7400
    },
    {
      name: 'Tamil Nadu',
      latitude: 11.1271,
      longitude: 78.6569
    }
  ],

  Tomato: [
    {
      name: 'Andhra Pradesh',
      latitude: 15.9129,
      longitude: 79.7400
    },
    {
      name: 'Karnataka',
      latitude: 15.3173,
      longitude: 75.7139
    },
    {
      name: 'Maharashtra',
      latitude: 19.7515,
      longitude: 75.7139
    }
  ]
};


// Component to move the map when location changes
  function MapPosition({ latitude, longitude }) {

    const map = useMap();

    useEffect(() => {

      map.setView(
        [latitude, longitude],
        6
      );

    }, [latitude, longitude, map]);

    return null;
  }


export default function CropLocationWeather({ cropName }) {

  const locations =
    cropLocations[cropName] || [];


  const [selectedLocation, setSelectedLocation] =
    useState(locations[0] || null);


  const [weather, setWeather] =
    useState(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState('');


  // Get weather whenever location changes
  useEffect(() => {

    if (!selectedLocation) {
      return;
    }

    async function getWeather() {

      try {

        setLoading(true);
        setError('');
        setWeather(null);


        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${selectedLocation.latitude}` +
          `&longitude=${selectedLocation.longitude}` +
          `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
          `&timezone=auto`;


        const response =
          await fetch(url);


        if (!response.ok) {
          throw new Error(
            'Unable to get weather information.'
          );
        }


        const data =
          await response.json(); 


        setWeather(data.current);

      } catch (err) {

        setError(
          err.message ||
          'Unable to load weather.'
        );

      } finally {

        setLoading(false);

      }

    }


    getWeather();

  }, [selectedLocation]);


  if (!locations.length) {

    return (

      <section className="crop-location-section">

        <h2>
          📍 Crop growing locations
        </h2>

        <p>
          Location information is not available
          for this crop yet.
        </p>

      </section>

    );

  }


  return (

    <section className="crop-location-section">

      <div className="location-heading">

        <p className="eyebrow">
          LOCATION & WEATHER
        </p>

        <h2>
          Where is {cropName} commonly grown?
        </h2>

        <p>
          Select a region to see its location on
          the map and current weather conditions.
        </p>

      </div>
+

      {/* Location buttons */}

      <div className="crop-location-buttons">

        {locations.map((location) => (

          <button
            key={location.name}
            type="button"
            className={
              selectedLocation?.name === location.name
                ? 'location-chip active'
                : 'location-chip'
            }
            onClick={() =>
              setSelectedLocation(location)
            }
          >

            📍 {location.name}

          </button>

        ))}

      </div>


      <div className="location-weather-grid">


        {/* Map */}

        <div className="crop-map">

          <MapContainer
            center={[
              selectedLocation.latitude,
              selectedLocation.longitude
            ]}
            zoom={6}
            scrollWheelZoom={true}
            style={{
              height: '420px',
              width: '100%'
            }}
          >

            <MapPosition
              latitude={selectedLocation.latitude}
              longitude={selectedLocation.longitude}
            />


            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />


            <Marker
              position={[
                selectedLocation.latitude,
                selectedLocation.longitude
              ]}
            >

              <Popup>

                <strong>
                  {cropName}
                </strong>

                <br />

                Commonly grown in:

                <br />

                {selectedLocation.name}

              </Popup>

            </Marker>

          </MapContainer>

        </div>


        {/* Weather */}

        <div className="crop-weather-card">

          <p className="eyebrow">
            CURRENT WEATHER
          </p>

          <h3>
            {selectedLocation.name}
          </h3>


          {loading && (

            <p>
              Loading weather...
            </p>

          )}


          {error && (

            <p className="error">
              {error}
            </p>

          )}


          {weather && !loading && (

            <div className="weather-details">

              <div className="weather-item">

                <span>
                  🌡️
                </span>

                <div>

                  <small>
                    Temperature
                  </small>

                  <strong>
                    {weather.temperature_2m}
                    °C
                  </strong>

                </div>

              </div>


              <div className="weather-item">

                <span>
                  💧
                </span>

                <div>

                  <small>
                    Humidity
                  </small>

                  <strong>
                    {weather.relative_humidity_2m}%
                  </strong>

                </div>

              </div>


              <div className="weather-item">

                <span>
                  💨
                </span>

                <div>

                  <small>
                    Wind
                  </small>

                  <strong>
                    {weather.wind_speed_10m}
                    km/h
                  </strong>

                </div>

              </div>


              <div className="weather-item">

                <span>
                  🌧️
                </span>

                <div>

                  <small>
                    Rain
                  </small>

                  <strong>
                    {weather.precipitation}
                    mm
                  </strong>

                </div>

              </div>

            </div>

          )}


          <div className="coordinates">

            <small>
              Location coordinates
            </small>

            <p>
              {selectedLocation.latitude.toFixed(4)},
              {' '}
              {selectedLocation.longitude.toFixed(4)}
            </p>

          </div>

        </div>

      </div>

    </section>

  );

}