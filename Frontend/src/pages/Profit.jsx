import { useState } from 'react';
import Layout from './Layout';
import { api } from '../services/api';

const initial = {
  landArea: 1,
  yieldPerAcre: 1000,
  sellingPricePerKg: 30,
  seedCost: 1000,
  inputCost: 3000, 
  labourCost: 4000,
  otherExpenses: 1000,
  expectedLossPercentage: 5
};

export default function Profit() {
  const [form, setForm] = useState(initial);
  const [result, setResult] = useState();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => {
    setForm({
      ...form,
      [k]: v
    });
  };

  const submit = async e => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      setResult(
        await api.calculateProfit(
          Object.fromEntries(
            Object.entries(form).map(([k, v]) => [
              k,
              Number(v)
            ])
          )
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>

      {/* Page Heading */}
      <div className="mb-7">
        <p className="text-[#59845c] text-xs tracking-[1.4px] font-bold m-0">
          PROFIT PLANNER
        </p>

        <h1 className="font-serif text-[42px] my-1.5 mb-3.5 text-[#1b4929] max-md:text-[34px]">
          Estimate your harvest return
        </h1>

        <p className="text-[#607264]">
          Use your local costs and crop expectations for a simple
          pre-season estimate.
        </p>
      </div>

      {/* Profit Layout */}
      <div className="grid grid-cols-[1.3fr_.7fr] gap-6 max-md:grid-cols-1">

        {/* Calculator Form */}
        <form
          className="
            bg-white
            border border-[#e5eadf]
            rounded-2xl
            p-6
            grid
            grid-cols-2
            gap-3.5
            max-md:grid-cols-1
          "
          onSubmit={submit}
        >
          {[
            ['landArea', 'Land area (acres)'],
            ['yieldPerAcre', 'Yield per acre (kg)'],
            ['sellingPricePerKg', 'Selling price per kg (₹)'],
            ['seedCost', 'Seed cost per acre (₹)'],
            ['inputCost', 'Fertilizer & inputs per acre (₹)'],
            ['labourCost', 'Labour cost per acre (₹)'],
            ['otherExpenses', 'Other expenses per acre (₹)'],
            ['expectedLossPercentage', 'Expected loss (%)']
          ].map(([key, label]) => (
            <label
              key={key}
              className="font-semibold text-sm"
            >
              {label}

              <input
                type="number"
                min="0"
                step="any"
                required
                value={form[key]}
                onChange={e =>
                  set(key, e.target.value)
                }
                className="
                  block
                  w-full
                  mt-1.5
                  border border-[#cbd8c8]
                  rounded-lg
                  p-[11px]
                  font-inherit
                  bg-white
                  outline-none
                  focus:border-[#2e6b38]
                "
              />
            </label>
          ))}

          {/* Error */}
          {error && (
            <p className="text-[#a52f2f] text-sm m-0 col-span-full">
              {error}
            </p>
          )}

          {/* Calculate Button */}
          <button
            disabled={loading}
            className="
              col-span-full
              border-0
              rounded-[9px]
              bg-[#2e6b38]
              text-white
              px-[18px]
              py-3
              font-inherit
              font-bold
              cursor-pointer
              hover:bg-[#245a2e]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? 'Calculating…'
              : 'Calculate profit'}
          </button>
        </form>

        {/* Result Card */}
        <aside
          className="
            bg-white
            border border-[#e5eadf]
            rounded-2xl
            p-6
            h-fit
          "
        >
          <h2 className="text-2xl font-semibold text-[#193125] mt-0">
            Estimated outcome
          </h2>

          {result ? (
            <>
              {/* Gross Yield */}
              <div
                className="
                  flex
                  justify-between
                  border-b
                  border-[#e7ece3]
                  py-3.5
                  text-[#4f6253]
                "
              >
                <span>Gross yield</span>

                <b>
                  {result.grossYield.toLocaleString()} kg
                </b>
              </div>

              {/* Saleable Yield */}
              <div
                className="
                  flex
                  justify-between
                  border-b
                  border-[#e7ece3]
                  py-3.5
                  text-[#4f6253]
                "
              >
                <span>Saleable yield</span>

                <b>
                  {result.saleableYield.toLocaleString()} kg
                </b>
              </div>

              {/* Revenue */}
              <div
                className="
                  flex
                  justify-between
                  border-b
                  border-[#e7ece3]
                  py-3.5
                  text-[#4f6253]
                "
              >
                <span>Revenue</span>

                <b>
                  ₹{result.revenue.toLocaleString()}
                </b>
              </div>

              {/* Total Cost */}
              <div
                className="
                  flex
                  justify-between
                  border-b
                  border-[#e7ece3]
                  py-3.5
                  text-[#4f6253]
                "
              >
                <span>Total cost</span>

                <b>
                  ₹{result.totalCost.toLocaleString()}
                </b>
              </div>

              {/* Profit */}
              <div
                className="
                  flex
                  justify-between
                  py-3.5
                  text-[#1c522c]
                  text-[19px]
                  font-semibold
                "
              >
                <span>Expected profit</span>

                <b>
                  ₹{result.profit.toLocaleString()}
                </b>
              </div>
            </>
          ) : (
            <p className="text-[#607264] leading-relaxed">
              Enter your expected crop values and calculate
              to see an estimate.
            </p>
          )}
        </aside>
      </div>

    </Layout>
  );
}