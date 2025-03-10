import { useState } from 'react';

const mockData = [
    { id: 1, title: "Financial Report - Q1", status: "Completed", date: "2025-01-15" },
    { id: 2, title: "Marketing Audit - February", status: "Pending", date: "2025-02-01" },
    { id: 3, title: "Risk Assessment - March", status: "In Progress", date: "2025-03-10" },
];

function Audit() {
    const [reports, setReports] = useState(mockData);

    const handleDownload = (title) => {
        alert(`Downloading: ${title}`);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Audit Reports</h1>

            <div className="bg-white shadow-md rounded-md p-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-3 text-left">Report Title</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <>
                        {reports.map((report) => (
                            <tr key={report.id} className="border-b border-gray-200">
                                <td className="p-3">{report.title}</td>
                                <td className="p-3">
                                    <span
                                        className={py-1 px-3 rounded-md text-sm
                                        ${report.status === 'Completed' ? 'bg-green-200 text-green-800' :
                                            report.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-blue-200 text-blue-800'}}
                                    >
                                        {report.status}
                                    </span>
                                </td>
                                <td className="p-3">{report.date}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleDownload(report.title)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Audit;