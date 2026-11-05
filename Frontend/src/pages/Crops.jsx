import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { api } from '../services/api';

export default function Crops() {
  const [crops, setCrops] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(''); 

  useEffect(() => {
    api
      .crops()
      .then(setCrops)
      .catch(e => setError(e.message));
  }, []);

  const categories = [
    '',
    ...new Set(crops.map(c => c.category))
  ];

  const filtered = useMemo( 
    () => 
      crops.filter(
        c =>
          (!category || c.category === category) &&
          c.name.toLowerCase().includes(query.toLowerCase())
      ), 
    [crops, category, query]
  );

  return (
    <Layout>
      {/* Page Heading */}
      <div className="mb-7">
        <p className="text-[#59845c] text-xs tracking-[1.4px] font-bold m-0">
          CROP CATALOGUE
        </p>

        <h1 className="font-serif text-[42px] my-1.5 mb-3.5 text-[#1b4929] max-md:text-[34px]">
          Find the right crop
        </h1>

        <p className="text-[#607264]">
          Search and compare cultivation essentials before your next sowing.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 mb-[26px] max-md:block">
        <input
          aria-label="Search crops"
          placeholder="Search crops, e.g. Tomato"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="
            flex-1
            border border-[#cbd8c8]
            rounded-lg
            p-[11px]
            font-inherit
            bg-white
            outline-none
            focus:border-[#2e6b38]
            max-md:w-full
            max-md:mb-2.5
          "
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="
            border border-[#cbd8c8]
            rounded-lg
            p-[11px]
            font-inherit
            bg-white
            outline-none
            focus:border-[#2e6b38]
            max-md:w-full
          "
        >
          <option value="">All categories</option>

          {categories.slice(1).map(x => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>

      {/* Error */}
      {error ? (
        <p className="text-[#a52f2f] text-sm m-0">
          {error}
        </p>
      ) : (
        <div className="grid grid-cols-4 gap-5 max-md:grid-cols-1">
          {filtered.map(c => (
            <Link
              className="
                bg-white
                border border-[#e5eadf]
                rounded-2xl
                p-6
                transition
                duration-200
                hover:-translate-y-[3px]
                hover:shadow-[0_7px_20px_#24451a14]
              "
              to={`/crops/${c.id}`}
              key={c.id}
            >
              {/* Crop Icon */}
              <div className="text-5xl">
                {c.icon}
              </div>

              {/* Category */}
              <span className="text-xs text-[#39713f] bg-[#e2f0df] px-[9px] py-[5px] rounded-full">
                {c.category}
              </span>

              {/* Crop Name */}
              <h2 className="text-xl font-semibold text-[#193125] my-2">
                {c.name}
              </h2>

              {/* Summary */}
              <p className="text-[#607264] leading-[1.55]">
                {c.summary}
              </p>

              {/* Season and Duration */}
              <small className="text-[#617262]">
                {c.season} · {c.duration}
              </small>
            </Link>
          ))}
        </div>
      )}

      {/* No Results */}
      {!error && !filtered.length && (
        <p className="text-[#607264] mt-5">
          No crops match your search.
        </p>
      )}
    </Layout>
  );
}