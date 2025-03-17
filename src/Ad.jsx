import { useState } from "react";
export default function Ad({ handleAddCampaign, hide }) {
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    platform: "",
    budget: "",
    clicks: "",
    cpc: "",
  });

  const handleChange = (e) => {
    setNewCampaign({ ...newCampaign, [e.target.name]: e.target.value });
  };
  const handleSubmission = (e) => {
    handleAddCampaign(e, newCampaign);
    setNewCampaign({ name: "", platform: "", budget: "", clicks: "", cpc: "" });
    hide();
  };
  return (
    <form
      onSubmit={handleSubmission}
      className="mb-10 space-y-4 bg-white p-4 ad"
      onClick={(e) => e.stopPropagation()}
    >
      <label className="block text-gray-700">Campaign Name</label>

      <input
        type="text"
        name="name"
        value={newCampaign.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <div>
        <label className="block text-gray-700">Platform</label>

        <select
          name="platform"
          value={newCampaign.platform}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select a platform</option>
          <option value="Google">Google</option>
          <option value="Facebook">Facebook</option>
          <option value="LinkedIn">LinkedIn</option>
        </select>
      </div>
      <label className="block text-gray-700">Budget</label>

      <input
        type="number"
        name="budget"
        value={newCampaign.budget}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-gray-700">Clicks</label>

      <input
        type="number"
        name="clicks"
        value={newCampaign.clicks}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <label className="block text-gray-700">CPC</label>

      <input
        type="number"
        name="cpc"
        value={newCampaign.cpc}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
      >
        Add Campaign
      </button>
    </form>
  );
}
