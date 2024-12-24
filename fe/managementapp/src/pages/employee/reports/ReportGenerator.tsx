import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiFileText, FiLoader, FiDownload } from "react-icons/fi";

interface ReportData {
  date: Date;
  products: {
    id: string;
    name: string;
    category: string;
    quantity: number;
    status: string;
  }[];
  imports: { id: number; source: string; amount: string }[];
  exports: { id: number; destination: string; amount: string }[];
}

const ReportGenerator = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedContents, setSelectedContents] = useState({
    products: false,
    imports: false,
    exports: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleContentChange = (content: keyof typeof selectedContents) => {
    setSelectedContents({
      ...selectedContents,
      [content]: !selectedContents[content],
    });
  };

  const generateDummyReport = () => {
    const report = {
      date: selectedDate,
      products: selectedContents.products
        ? [
            {
              id: "PRD001",
              name: "Product A",
              category: "Electronics",
              quantity: 100,
              status: "In Stock",
            },
            {
              id: "PRD002",
              name: "Product B",
              category: "Furniture",
              quantity: 150,
              status: "Low Stock",
            },
          ]
        : [],
      imports: selectedContents.imports
        ? [
            { id: 1, source: "Supplier X", amount: "$5000" },
            { id: 2, source: "Supplier Y", amount: "$3500" },
          ]
        : [],
      exports: selectedContents.exports
        ? [
            { id: 1, destination: "Client A", amount: "$7500" },
            { id: 2, destination: "Client B", amount: "$4200" },
          ]
        : [],
    };
    return report;
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const report = generateDummyReport();
      setReportData(report);
      setReportGenerated(true);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadReport = () => {
    if (!reportData) return;

    const reportString = JSON.stringify(reportData, null, 2);
    const blob = new Blob([reportString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${reportData.date.toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Report Generator
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="relative">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date || new Date())}
                  dateFormat="MMMM d, yyyy"
                  className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FiCalendar className="absolute right-3 top-2.5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Contents
              </label>
              <div className="space-y-3">
                {[
                  { id: "products", label: "Products" },
                  { id: "imports", label: "Imports" },
                  { id: "exports", label: "Exports" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={
                        selectedContents[
                          item.id as keyof typeof selectedContents
                        ]
                      }
                      onChange={() =>
                        handleContentChange(
                          item.id as keyof typeof selectedContents
                        )
                      }
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={item.id}
                      className="ml-3 text-sm text-gray-700"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={
                isLoading || !Object.values(selectedContents).some(Boolean)
              }
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <FiLoader className="animate-spin h-5 w-5" />
              ) : (
                "Generate Report"
              )}
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Report Preview
            </h3>
            <div className="flex items-center space-x-4">
              {reportGenerated && reportData && (
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <FiDownload className="h-5 w-5 mr-1" />
                  Download
                </button>
              )}
              <FiFileText className="h-6 w-6 text-gray-400" />
            </div>
          </div>

          {!reportGenerated ? (
            <p className="text-gray-500 text-center py-8">
              No report generated yet. Please select options and generate a
              report.
            </p>
          ) : (
            reportData && (
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <p className="text-sm text-gray-600">
                    Generated on:{" "}
                    {reportData.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {selectedContents.products && (
                  <div>
                    <h4 className="font-medium text-lg mb-3">Products</h4>
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="grid grid-cols-5 gap-4 font-semibold text-gray-700 mb-2 border-b pb-2">
                        <div>Item ID</div>
                        <div>Name</div>
                        <div>Category</div>
                        <div>Quantity</div>
                        <div>Status</div>
                      </div>
                      {reportData.products.map((product) => (
                        <div
                          key={product.id}
                          className="grid grid-cols-5 gap-4 py-2 items-center text-gray-600"
                        >
                          <div>{product.id}</div>
                          <div>{product.name}</div>
                          <div>{product.category}</div>
                          <div>{product.quantity} units</div>
                          <div>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === "In Stock"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {product.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedContents.imports && (
                  <div>
                    <h4 className="font-medium text-lg mb-3">Imports</h4>
                    <div className="bg-gray-50 rounded-md p-4">
                      {reportData.imports.map((import_) => (
                        <div
                          key={import_.id}
                          className="flex justify-between py-2"
                        >
                          <span>{import_.source}</span>
                          <span>{import_.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedContents.exports && (
                  <div>
                    <h4 className="font-medium text-lg mb-3">Exports</h4>
                    <div className="bg-gray-50 rounded-md p-4">
                      {reportData.exports.map((export_) => (
                        <div
                          key={export_.id}
                          className="flex justify-between py-2"
                        >
                          <span>{export_.destination}</span>
                          <span>{export_.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
