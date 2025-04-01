import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import Intro from "./Intro";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import Service from "./Service";
import { services, testimontials } from "./reusableCode";
import Testimon from "./Testimon";
export default function Dashboard() {
  // Sample data for financial, marketing, and audit insights
  const [width] = useOutletContext();

  const [data] = useState({
    financial: {
      revenue: 50000,
      expenses: 35000,
      profit: 15000,
    },
    marketing: {
      campaigns: 12,
      clicks: 4500,
      roi: "120%",
    },
    audit: {
      completedAudits: 8,
      pendingAudits: 3,
    },
  });

  // Chart Data (Bar Chart for Financial Performance)
  const financialChartData = {
    labels: ["Revenue", "Expenses", "Profit"],
    datasets: [
      {
        label: "Amount (DZD)",
        data: [
          data.financial.revenue,
          data.financial.expenses,
          data.financial.profit,
        ],
        backgroundColor: ["#4A90E2", "#FF6B6B", "#1FAD66"],
      },
    ],
  };
  const x = null;
  // Chart Data (Pie Chart for Marketing Campaigns)
  const marketingChartData = {
    labels: ["Active Campaigns", "Total Clicks"],
    datasets: [
      {
        data: [data.marketing.campaigns, data.marketing.clicks],
        backgroundColor: ["#4A90E2", "#F4A261"],
      },
    ],
  };

  return (
    <div
      className=" min-h-screen bg-gray-100 w-full p-6 dash"
      style={{ marginLeft: width }}
    >
      <Intro />

      {/*Performance Overview*/}
      {x && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Financial Overview*/}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-blue-500">
              💰 Financial Overview
            </h3>
            <Bar data={financialChartData} />
          </div>

          {/* Marketing Overview*/}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-blue-500">
              📈 Marketing Overview
            </h3>
            <Pie data={marketingChartData} />
          </div>

          {/* Audit Overview */}
          <div className="bg-white p-4 rounded-md shadow-md">
            <h3 className="text-xl font-bold text-blue-500">
              📋 Audit Overview
            </h3>
            <ul className="text-gray-600 mt-3 space-y-2">
              <li>✅ Completed Audits: {data.audit.completedAudits}</li>
              <li>⏳ Pending Audits: {data.audit.pendingAudits}</li>
            </ul>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center my-5  gap-3">
        <h1 className="font-bold text-4xl">Our Core Services</h1>
        <h2 className="text-xl">
          Designed to meet the diverse needs of businesses.
        </h2>
      </div>
      {services.map((service , index ) => (
        <Service key={index} service={service} />
      ))}
      <div className="flex flex-col items-center mt-20  gap-3">
        <h1 className="font-bold text-4xl">What Our Clients Say</h1>
        <h2 className="text-xl">Feedback from those who trust us.</h2>
      </div>
      <div className="flex  justify-center gap-4 flex-wrap ">
        {testimontials.map((testimo) => (
          <Testimon testimo={testimo} />
        ))}
      </div>
      <p className="text-center py-10 bg-white font-bold">&copy;2025 - Proudly built with Strikingly</p>
    </div>
  );
}
