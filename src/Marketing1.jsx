import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import notify from "./reusableCode";
import Ad from "./Ad";
import {generateText} from "./reusableCode";
import Loader from './Loader'


function MarketingPage() {
  const [width] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [isLoad, setLoad] = useState(false);
  const addAd = () => setOpen((o) => !o);
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "Summer Sale",
      platform: "Facebook",
      budget: 2000,
      clicks: 300,
      cpc: 5,
      ctr: "2.5%",
      roi: "120%",
      status: "Successful",
    },
    {
      id: 2,
      name: "Back to School",
      platform: "Google",
      budget: 3000,
      clicks: 600,
      cpc: 4,
      ctr: "1.8%",
      roi: "90%",
      status: "In Progress",
    },
  ]);

  const handleAddCampaign = (e, newCampaign) => {
    e.preventDefault();

    if (!newCampaign.name || !newCampaign.platform || !newCampaign.budget) {
      notify("Error", "error", "Please fill in all fields.");
      return;
    }

    const newEntry = {
      ...newCampaign,
      id: campaigns.length + 1,
      ctr: "N/A",
      roi: "N/A",
      status: "In Progress",
    };

    setCampaigns([newEntry, ...campaigns]);
    notify("Success", "success", "Campaign added successfully!");
  };

  const calculateActualCost = (clicks, cpc) => clicks * cpc;

  const getBudgetStatus = (budget, actualCost) => {
    if (actualCost <= budget) return "Within The Budgeet";
    return "Exceeded The Limit";
  };

  const calculateROI = (budget, actualCost) => {
    if (!actualCost) return "0%";
    const roi = ((budget - actualCost) / actualCost) * 100;

    return roi.toFixed(2) + "%";
  };

  const calculateProgress = (budget, actualCost) => {
    return Math.min((actualCost / budget) * 100, 100); // يقيد الشريط إلى 100%
  };
  const [recommendations, setRecommendations] = useState([]);
  const errorCase = [
    "Increase social media engagement by boosting posts on weekends.",
    "Optimize your Google Ads budget to target high-conversion keyword",
    "Focus on video content for improved Facebook campaign performance.",
  ];
  useEffect(() => {
    async function fetching() {
      setLoad(true);
      try {
        const output = [];
        for (let i = 1; i <= 4; i++) {
          const text = await generateText();
          output.push(text[0].message.content);
          if (i == 4) {
            setRecommendations(output);
            setLoad(false);
          }
        }
      } catch {
        setRecommendations(errorCase);
        setLoad(false);
      }
    }
    fetching();
  }, []);


  return (
    <div className=" mx-auto p-6 bg-white shadow-md rounded-md mt-10 w-full" style={{ marginLeft : width }}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">
          Marketing Management
        </h1>
        <button
          type="button"
          className="w-fit bg-green-400 p-1 my-3 rounded-md duration-300 hover:bg-green-600"
          onClick={addAd}
        >
          + Ad
        </button>
      </div>
      {open && (
        <div className="modal" onClick={addAd}>
          <Ad handleAddCampaign={handleAddCampaign} hide={addAd} />
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          Campaign Overview
        </h2>
        {campaigns.map((campaign) => {
          const actualCost = calculateActualCost(campaign.clicks, campaign.cpc);
          return (
            <div
              key={campaign.id}
              className="border border-gray-300 rounded-md p-4 mb-4"
            >
              <h3 className="font-bold text-lg text-blue-500">
                {campaign.name}
              </h3>
              <p className="text-gray-700">
                <strong>Platform:</strong> {campaign.platform}
              </p>
              <p className="text-gray-700">
                <strong>Budget:</strong> {campaign.budget} DZD
              </p>
              <p className="text-gray-700">
                <strong>Clicks:</strong> {campaign.clicks}
              </p>
              <p className="text-gray-700">
                <strong>CPC:</strong> {campaign.cpc} DZD
              </p>
              <p className="text-gray-700">
                <strong>Actual Cost:</strong> {actualCost} DZD
              </p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className={`h-4 rounded-full ${
                    actualCost <= campaign.budget
                      ? "bg-green-500"
                      : actualCost <= campaign.budget * 1.2
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${calculateProgress(
                      campaign.budget,
                      actualCost
                    )}% `,
                  }}
                ></div>
              </div>
              <p className="text-gray-700">
                <strong>CTR:</strong> {campaign.ctr}
              </p>
              <p className="text-gray-700">
                <strong>ROI:</strong>{" "}
                {calculateROI(campaign.budget, actualCost)}
              </p>
              <p className="font-bold">
                {getBudgetStatus(campaign.budget, actualCost)}
              </p>
              <p
                className={`font-bold ${
                  campaign.status === "Successful"
                    ? "text-green-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {campaign.status}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">
          AI Recommendations
        </h2>{!isLoad ?
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))} 
        </ul>:<div className='w-full flex justify-center py-7 '> <Loader /> </div>
        }
      </div>
    </div>
  );
}

export default MarketingPage;
