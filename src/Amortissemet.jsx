import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Amortissement() {
  const [initialCost, setInitialCost] = useState("");
  const [salvageValue, setSalvageValue] = useState("");
  const [usefulLife, setUsefulLife] = useState("");
  const [annualDepreciation, setAnnualDepreciation] = useState(null);
  const [depreciationTable, setDepreciationTable] = useState([]);
  const [error, setError] = useState("");
  const [width] = useOutletContext();

  // Calculate Depreciation
  const calculateAssetDepreciation = () => {
    const cost = parseFloat(initialCost);
    const salvage = parseFloat(salvageValue);
    const life = parseInt(usefulLife);

    // Validation
    if (
      isNaN(cost) ||
      isNaN(salvage) ||
      isNaN(life) ||
      cost <= 0 ||
      salvage < 0 ||
      life <= 0 ||
      salvage >= cost
    ) {
      setError("⚠️ Please enter valid values!");
      setAnnualDepreciation(null);
      setDepreciationTable([]);
      return;
    }

    setError("");

    // Calculate Annual Depreciation
    const depreciation = (cost - salvage) / life;
    setAnnualDepreciation(depreciation.toFixed(2));

    // Generate Depreciation Table
    const tableData = [];
    let bookValue = cost;

    for (let year = 1; year <= life; year++) {
      bookValue -= depreciation;
      if (bookValue < salvage) bookValue = salvage;

      tableData.push({
        year,
        depreciation: depreciation.toFixed(2),
        bookValue: bookValue.toFixed(2),
      });
    }

    setDepreciationTable(tableData);
  };

  return (
    <div
      className=" mx-auto p-6 bg-white shadow-lg rounded-md mt-10  w-full"
      style={{ marginLeft: width }}
    >
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        📊 Asset Depreciation Calculator
      </h1>

      {/* Asset Details Form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700">Initial Cost (DZD)</label>
          <input
            type="number"
            value={initialCost}
            onChange={(e) => setInitialCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 5000"
          />
        </div>

        <div>
          <label className="block text-gray-700">Salvage Value (DZD)</label>
          <input
            type="number"
            value={salvageValue}
            onChange={(e) => setSalvageValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Useful Life (Years)</label>
          <input
            type="number"
            value={usefulLife}
            onChange={(e) => setUsefulLife(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 10"
          />
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateAssetDepreciation}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Calculate
      </button>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Results */}
      {annualDepreciation && (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 rounded-md">
          <h2 className="text-xl font-bold text-green-700">
            Annual Depreciation: {annualDepreciation} DZD
          </h2>
        </div>
      )}

      {/* Depreciation Table */}
      {depreciationTable.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-blue-500 mb-2">
            Depreciation Table
          </h2>
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">
                  Annual Depreciation (DZD)
                </th>
                <th className="border border-gray-300 p-2">Book Value (DZD)</th>
              </tr>
            </thead>
            <tbody>
              {depreciationTable.map((row) => (
                <tr key={row.year} className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-2">{row.year}</td>
                  <td className="border border-gray-300 p-2">
                    {row.depreciation}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {row.bookValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
