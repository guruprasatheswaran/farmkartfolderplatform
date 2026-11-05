import Layout from './Layout';


export default function About() {
  return (
    <Layout>
      <div className="page-heading">
        <p className="eyebrow">ABOUT FARМKART</p>

        <h1>Knowledge for every field.</h1>
      </div>

      <article className="prose">
        <p>
          FarmKart makes core agricultural planning information easier to
          access. Browse crop requirements and calculate expected returns in
          one friendly workspace.
        </p>

        <p>
          This educational project is designed for farmers, students, and
          anyone exploring modern agriculture. Estimates are planning aids—
          always confirm local market prices and seek local agronomy advice
          before making farm decisions.
        </p>
      </article>
    </Layout>
  );
}
