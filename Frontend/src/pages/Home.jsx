import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function Home() {
  const user = JSON.parse(
    localStorage.getItem('farmkartUser') || '{}'
  );    
 
  return (
    <Layout>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <p className="eyebrow">YOUR FARMING COMPANION</p>

          <h1>
            Welcome, {user.name?.split(' ')[0] ||  'Farmer'}.
          </h1> 

          <p>
            Plan every season with crop knowledge and simple profit estimates.
          </p>

          <Link className="button" to="/crops">
            Explore crops     
          </Link>
        </div> 

        <div className="hero-art">
          🌾
        </div>
      </section>


       {/* Grow With Confidence Section */}
      <section>
        <h2>Grow with confidence</h2>
        
        <div className="grid three">

          {/* Discover Crops */}
          <article className="info-card">
            <span>🔎</span> 

            <h3>Discover crops</h3>

            <p>
              Explore practical crop details, growing seasons, soil needs,
              and cultivation tips.
            </p>

            <Link to="/crops">
              Browse catalogue →
            </Link>
          </article>


          {/* Plan Profit */}
          <article className="info-card">
            <span>📈</span>

            <h3>Plan profit</h3>

            <p>
              Estimate your saleable yield, costs, revenue, and expected
              profit before planting.
            </p>

            <Link to="/profit">
              Calculate profit →
            </Link>
          </article>


          {/* Farm Smarter */}
          <article className="info-card">
            <span>🌱</span>

            <h3>Farm smarter</h3>

            <p>
              Use clear, local-friendly information to make better seasonal
              decisions.
            </p>

            <Link to="/about">
              About FarmKart →
            </Link>
          </article>

        </div>
      </section>
      
    </Layout>
  );
}