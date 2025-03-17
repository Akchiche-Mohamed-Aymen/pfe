import { useState } from "react";
import * as XLSX from "xlsx";
import { useOutletContext } from "react-router-dom";

function AccountingPage() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
    purchasePrice: "",
    usefulLife: "",
  });
  const [width] = useOutletContext();

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new expense
  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount || !formData.category) {
      alert("Please fill in all required fields.");
      return;
    }

    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount),
      purchasePrice: parseFloat(formData.purchasePrice) || 0,
      usefulLife: parseInt(formData.usefulLife) || 0,
      id: expenses.length + 1,
    };

    setExpenses([...expenses, newExpense]);

    setFormData({
      name: "",
      amount: "",
      category: "",
      purchasePrice: "",
      usefulLife: "",
    });
  };

  // Calculate depreciation using the Straight-Line Method
  const calculateDepreciation = (purchasePrice, usefulLife) => {
    if (!purchasePrice || !usefulLife) return 0;
    return (purchasePrice / usefulLife).toFixed(2);
  };

  // Calculate total expenses
  const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);

  // Calculate total depreciation
  const totalDepreciation = expenses.reduce((total, exp) => {
    return (
      total +
      parseFloat(calculateDepreciation(exp.purchasePrice, exp.usefulLife))
    );
  }, 0);

  // Export data to Excel
  const handleExportToExcel = () => {
    const data = expenses.map((expense) => ({
      Name: expense.name,
      Amount: `${expense.amount} DZD`,
      Category: expense.category,
      "Annual Depreciation": `${calculateDepreciation(
        expense.purchasePrice,
        expense.usefulLife
      )} DZD`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

    XLSX.writeFile(workbook, "Accounting_Report.xlsx");
  };

  return (
    <div className="  p-6 bg-white shadow-md rounded-md mt-10 w-full"  style={{ marginLeft : width }}>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Accounting & Depreciation
      </h1>

      {/* Form to Add Expenses */}
      <form onSubmit={handleAddExpense} className="space-y-4">
        <div>
          <label className="block text-gray-700">Expense Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter expense name"
          />
        </div>

        <div>
          <label className="block text-gray-700">Amount (DZD)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter amount"
          />
        </div>

        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., Utilities, Equipment, Salaries"
          />
        </div>

        <div>
          <label className="block text-gray-700">
            Purchase Price (For Assets)
          </label>
          <input
            type="number"
            name="purchasePrice"
            value={formData.purchasePrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter asset purchase price"
          />
        </div>

        <div>
          <label className="block text-gray-700">Useful Life (Years)</label>
          <input
            type="number"
            name="usefulLife"
            value={formData.usefulLife}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter useful life in years"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Expense
        </button>
      </form>

      {/* Expense List */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-blue-500 mb-4">Expense List</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-600">No expenses added yet.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Amount</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">
                  Annual Depreciation
                </th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-blue-50">
                  <td className="border border-gray-300 p-2">{expense.name}</td>
                  <td className="border border-gray-300 p-2">
                    {expense.amount} DZD
                  </td>
                  <td className="border border-gray-300 p-2">
                    {expense.category}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {calculateDepreciation(
                      expense.purchasePrice,
                      expense.usefulLife
                    )}{" "}
                    DZD
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {expenses.length > 0 && (
        <div className="mt-10 bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-blue-500 mb-2">
            Financial Summary
          </h2>
          <p className="text-gray-700">
            <strong>Total Expenses:</strong> {totalExpenses} DZD
          </p>
          <p className="text-gray-700">
            <strong>Total Depreciation:</strong> {totalDepreciation} DZD
          </p>
          <button
            onClick={handleExportToExcel}
            className="mt-4 bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Download as Excel
          </button>
        </div>
      )}
    </div>
  );
}

export default AccountingPage;
