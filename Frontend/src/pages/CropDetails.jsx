import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Layout from './Layout';

import { api } from '../services/api';

import CropLocationWeather
  from '../components/CropLocationWeather';


export default function CropDetails() {

  const { id } = useParams();


  const [crop, setCrop] =
    useState();

  const [error, setError] =
    useState('');


  useEffect(() => {

    api
      .crop(id)
      .then(setCrop)
      .catch(e => setError(e.message));

  }, [id]);


  if (error) {

    return (

      <Layout>

        <p className="error">
          {error}
        </p>

        <Link to="/crops">
          ← Back to crops
        </Link>

      </Layout>

    );

  }


  if (!crop) {

    return (

      <Layout>

        <p>
          Loading crop details…
        </p>

      </Layout>

    );

  }


  return (

    <Layout>

      <Link to="/crops">
        ← Back to crops
      </Link>


      {/* Crop Header */}

      <section className="detail-hero">

        <div className="crop-icon large">

          {crop.icon}

        </div>


        <div>

          <span className="tag">
            {crop.category}
          </span>

          <h1>
            {crop.name}
          </h1>

          <p>
            {crop.summary}
          </p>

        </div>

      </section>


      {/* Crop Facts */}

      <div className="facts">

        <div>

          <b>
            Season
          </b>

          {crop.season}

        </div>


        <div>

          <b>
            Duration
          </b>

          {crop.duration}

        </div>


        <div>

          <b>
            Water
          </b>

          {crop.water}

        </div>


        <div>

          <b>
            Soil
          </b>

          {crop.soil}

        </div>


        <div>

          <b>
            Yield / acre
          </b>

          {crop.yieldPerAcre} kg

        </div>


        <div>

          <b>
            Market price
          </b>

          ₹{crop.pricePerKg}/kg

        </div>

      </div>


      {/* Benefits + Farming */}

      <div className="grid two">


        <article className="info-card">

          <h2>
            Benefits
          </h2>

          <p>
            {crop.benefit}
          </p>


          <h2>
            Farming tips
          </h2>

          <p>
            {crop.tips}
          </p>

        </article>


        <article className="info-card">

          <h2>
            Cultivation steps
          </h2>


          <ol>

            {crop.steps
              ?.split('|')
              .map((s, i) => (

                <li key={i}>
                  {s}
                </li>

              ))}

          </ol>


          <Link
            className="button"
            to="/profit"
          >

            Estimate profit

          </Link>

        </article>


      </div>


      {/* NEW FEATURE */}

      <CropLocationWeather
        cropName={crop.name}
      />


    </Layout>

  );

}