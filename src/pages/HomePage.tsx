import React, { useEffect, useState } from "react";
import { fetchTopMerchants, Merchant } from "../utils/fetchTopMerchants";

const HomePage: React.FC = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTopMerchants();
        console.log("✅ Loaded merchants:", data);

        // Sort by GMV descending
        const sorted = data.sort((a, b) => b.gmv - a.gmv);
        setMerchants(sorted);
      } catch (error) {
        console.error("❌ Error fetching merchants:", error);
        setError("Failed to load merchant data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div className="p-6 text-lg">⏳ Loading Top Merchants...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2">
        🏆 Top 10 Merchants by GMV
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded-lg shadow bg-white">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 font-semibold">
            <tr>
              <th className="p-3 text-left">🏅 Rank</th>
              <th className="p-3 text-left">🏢 Merchant Name</th>
              <th className="p-3 text-left">🔢 Code</th>
              <th className="p-3 text-left">📦 Segment</th>
              <th className="p-3 text-left">💰 GMV</th>
              <th className="p-3 text-left">📆 Last Month</th>
              <th className="p-3 text-left">📈 Transactions</th>
              <th className="p-3 text-left">📊 Growth</th>
            </tr>
          </thead>
          <tbody>
            {merchants.map((m, index) => (
              <tr
                key={m.code || m.name || index}
                className={`border-t hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3 font-semibold">{index + 1}</td>
                <td className="p-3">{m.name || "-"}</td>
                <td className="p-3">{m.code || "-"}</td>
                <td className="p-3">{m.segment || "-"}</td>
                <td className="p-3 text-green-700 font-medium">
                  ₹{m.gmv ? (m.gmv / 100000).toFixed(1) : "0"}L
                </td>
                <td className="p-3">{m.lastMonthTxns?.toLocaleString() || "-"}</td>
                <td className="p-3">{m.transactions?.toLocaleString() || "-"}</td>
                <td
                  className={`p-3 font-semibold ${
                    m.growth?.includes("-") ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {m.growth || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
