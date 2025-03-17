import { useState } from "react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import notify from "./reusableCode";
import { useOutletContext } from "react-router-dom";
function Audit() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [reviewRequests, setReviewRequests] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [width] = useOutletContext();
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    const validFiles = files.filter(
      (file) =>
        file.type === "application/pdf" ||
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    if (validFiles.length !== files.length) {
      notify("Error", "error", "Only PDF and Excel files are allowed.");
    }

    const newFiles = validFiles.map((file) => ({
      id: uploadedFiles.length + 1,
      name: file.name,
      type: file.type.includes("pdf") ? "PDF" : "Excel",
      file, // تخزين الملف الأصلي لمعالجة محتواه لاحقًا
      url: URL.createObjectURL(file), // لإنشاء رابط معاينة
      date: new Date().toLocaleDateString(),
    }));

    setUploadedFiles([...uploadedFiles, ...newFiles]);
  };

  // عرض المعاينة
  const handlePreview = (file) => {
    if (file.type === "PDF") {
      setPdfPreview(file.url);
      setExcelData([]);
    } else if (file.type == "Excel") {
      previewExcelFile(file); // معاينة ملف Excel
      setPdfPreview(null);
    }
  };

  // تحليل ملفات Excel باستخدام مكتبة xlsx
  const previewExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("start loading.....");
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(jsonData);
      // استخراج البيانات المالية
      const revenue = jsonData.find((row) => row[0] === "Revenue")?.[1] || 0;
      const expenses = jsonData.find((row) => row[0] === "Expenses")?.[1] || 0;
      const loss = jsonData.find((row) => row[0] === "Losses")?.[1] || 0;
      const netProfit = revenue - expenses;
      const expensePercentage =
        revenue > 0 ? ((expenses / revenue) * 100).toFixed(2) : 0;
      const hasRisk = (loss > 10000) || (expensePercentage > 80);
      console.log(hasRisk)
      if(hasRisk)
        notify("Alert", "error", "Risks Found IN File : "+ file.fileName);
      // ✅ استدعاء setReportData هنا بشكل صحيح
      setReportData({
        fileName: file.name,
        type: "Excel",
        revenue,
        expenses,
        netProfit,
        expensePercentage,
        hasRisk,
      });
    };
    reader.readAsArrayBuffer(file.file);
  };
  // طلب مراجعة خبير خارجي
  const handleRequestReview = (file) => {
    const newRequest = {
      id: reviewRequests.length + 1,
      title: file.name,
      date: new Date().toLocaleDateString(),
      status: "Pending",
    };
    for (let ele of reviewRequests) {
      if (ele.title === newRequest.title) {
        notify("Error", "error", "Request is alearedy sent");
        return;
      }
    }

    setReviewRequests([...reviewRequests, newRequest]);
    notify(
      "success",
      "success",
      `Review request for "${file.name}" has been sent successfully.`
    );
  };

  const generatePDFReport = () => {
    if (!reportData) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("AuditReport", 10, 10);
    doc.setFontSize(12);

    doc.text(`File Name: ${reportData.fileName}`, 10, 20);

    doc.text(`Date: ${new Date().toLocaleDateString()}`, 10, 30);

    doc.text("Financial Analysis:", 10, 40);
    doc.setFontSize(12);
    doc.text(`- Revenue: ${reportData.revenue} DZD`, 10, 50);
    doc.text(`- Expenses: ${reportData.expenses} DZD`, 10, 60);
    doc.text(`- Net Profit: ${reportData.netProfit} DZD`, 10, 70);
    doc.text(`- Expense Percentage: ${reportData.expensePercentage}%`, 10, 80);

    doc.setFontSize(14);
    doc.text("Risk Assessment:", 10, 90);
    doc.setFontSize(12);

    if (reportData.hasRisk) {
      doc.setTextColor(255, 0, 0); // أحمر
      doc.text("⚠️ Potential Risk Detected in the Data!", 10, 100);
    } else {
      doc.setTextColor(0, 128, 0); // أخضر
      doc.text("✅ No significant risks detected.", 10, 100);
    }

    doc.save("Audit_Report.pdf");
  };
 
  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full" style={{ marginLeft : width }}>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Audit Reports</h1>

      {/* زر رفع الملفات */}
      <div className="bg-white p-4 rounded-md shadow-md mb-6">
        <label className="block text-gray-700 mb-2">
          Upload Files (PDF or Excel only)
        </label>
        <input
          type="file"
          multiple
          accept=".pdf, .xlsx"
          onChange={handleFileUpload}
          className="w-full border border-gray-300 p-2 rounded-md cursor-pointer"
        />
      </div>

      {/* قائمة الملفات المرفوعة */}
      <div className="bg-white shadow-md rounded-md p-4 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Uploaded Files</h2>

        {uploadedFiles.length === 0 ? (
          <p className="text-gray-600">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {uploadedFiles.map((file) => (
              <li
                key={file.id}
                className="bg-gray-200 p-3 rounded-md flex flex-col items-start md:flex-row gap-4 justify-between items-center"
              >
                <span>
                  {file.name} ({file.type})
                </span>
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handlePreview(file)}
                  >
                    Preview
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                    onClick={() => handleRequestReview(file)}
                  >
                    Request Review
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                    onClick={generatePDFReport}
                  >
                    Generate Report
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* معاينة ملف PDF */}
      {pdfPreview && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">PDF Preview</h2>
          <iframe src={pdfPreview} className="w-full h-96 border" />
        </div>
      )}

      {/* معاينة ملف Excel */}
      {excelData.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Excel Preview
          </h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                {excelData[0].map((header, index) => (
                  <th key={index} className="p-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex} className="border-t border-gray-300">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* قائمة طلبات المراجعة */}
      <div className="bg-white shadow-md rounded-md p-4 my-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Review Requests
        </h2>

        {reviewRequests.length === 0 ? (
          <p className="text-gray-600">
            No review requests have been made yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {reviewRequests.map((request) => (
              <li
                key={request.id}
                className="bg-gray-200 p-3 rounded-md flex justify-between items-center"
              >
                <span>{request.title}</span>
                <span className="text-sm text-blue-600">{request.status}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {reportData && (
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Report Summary
          </h2>
          <p>Revenue: {reportData.revenue} DZD</p>
          <p>Expenses: {reportData.expenses} DZD</p>
          <p>Net Profit: {reportData.netProfit} DZD</p>
          <p>Expense Percentage: {reportData.expensePercentage}%</p>
          <p className={reportData.hasRisk ? "text-red-500" : "text-green-500"}>
            {reportData.hasRisk
              ? "⚠️ Potential Risk Detected"
              : "✅ No significant risks"}
          </p>

          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
            onClick={generatePDFReport}
          >
            Download PDF Report
          </button>
        </div>
      )}
    </div>
  );
}

export default Audit;
