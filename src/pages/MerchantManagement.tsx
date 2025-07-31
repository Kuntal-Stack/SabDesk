import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const SHEET_API_URL =
  "https://sheets.googleapis.com/v4/spreadsheets/1eL5U5lpK_O3RJVCGkNS11C8n-uyRcDzqakPIXGq1MYU/values/Sheet1?key=AIzaSyC5VnCgDA6Tq_lHvKYCD-AHJQ4vq0eK7Jc";

const ROWS_PER_PAGE = 80;

const MerchantManagement = () => {
  const [data, setData] = useState<string[][]>([]);
  const [filteredRows, setFilteredRows] = useState<string[][]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [merchantTypeFilter, setMerchantTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [typeCount, setTypeCount] = useState(0);

  const fetchData = () => {
    fetch(SHEET_API_URL)
      .then((res) => res.json())
      .then((json) => {
        const values = json.values;
        setData(values);
        setFilteredRows(values.slice(1));
      })
      .catch((err) => console.error("Sheet fetch error:", err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data || data.length === 0) return <p>Loading...</p>;

  const headers = data[0];
  const allRows = data.slice(1);

  const statusIndex = headers.findIndex((h) =>
    /NT|WIP|ACTIVE|TRANSACTING/i.test(h)
  );
  const websiteIndex = headers.findIndex((h) =>
    h.toLowerCase().includes("website")
  );
  const merchantTypeIndex = headers.findIndex((h) =>
    h.includes("EXISTING/NEW MERCHANT")
  );

  const total = allRows.length;
  const counts = { NT: 0, WIP: 0, ACTIVE: 0, TRANSACTING: 0 };

  allRows.forEach((row) => {
    const val = row.join(" ").toUpperCase();
    if (val.includes("NT")) counts.NT++;
    if (val.includes("WIP")) counts.WIP++;
    if (val.includes("ACTIVE")) counts.ACTIVE++;
    if (val.includes("TRANSACTING")) counts.TRANSACTING++;
  });

  const handleFilter = (status = statusFilter, type = merchantTypeFilter) => {
    const newFiltered = allRows.filter((row) => {
      const rowText = row.join(" ").toUpperCase();
      const matchesStatus = status ? rowText.includes(status.toUpperCase()) : true;
      const matchesType =
        type && merchantTypeIndex >= 0
          ? (row[merchantTypeIndex] || "").toUpperCase() === type.toUpperCase()
          : true;
      return matchesStatus && matchesType;
    });
    setFilteredRows(newFiltered);
    setPage(1);
    if (merchantTypeIndex >= 0 && type) {
      const count = allRows.filter(row => (row[merchantTypeIndex] || "").toUpperCase() === type.toUpperCase()).length;
      setTypeCount(count);
    } else {
      setTypeCount(0);
    }
  };

  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers, ...filteredRows]);
    XLSX.utils.book_append_sheet(wb, ws, "Merchants");
    XLSX.writeFile(wb, "Merchant_Data.xlsx");
  };

  const pageCount = Math.ceil(filteredRows.length / ROWS_PER_PAGE);
  const currentRows = filteredRows.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <div className="p-4">
      {/* Export & Refresh */}
      <div className="mb-4 flex justify-between items-center flex-wrap gap-2">
        <button
          className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
          onClick={exportToExcel}
        >
          📥 Export to Excel
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={fetchData}
        >
          🔄 Refresh
        </button>
      </div>

      <h2 className="text-2xl font-bold text-blue-700 mb-4">📋 Merchant Management</h2>

      {/* Summary Buttons */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {["Total", "NT", "WIP", "ACTIVE", "TRANSACTING"].map((label) => (
          <button
            key={label}
            className="bg-blue-100 border border-blue-400 px-4 py-2 rounded text-sm font-semibold"
            onClick={() => {
              setStatusFilter(label === "Total" ? "" : label);
              handleFilter(label === "Total" ? "" : label, merchantTypeFilter);
            }}
          >
            {label}: {label === "Total" ? total : counts[label as keyof typeof counts]}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap items-center">
        <div>
          <label className="mr-2 font-semibold">🔽 Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              handleFilter(e.target.value, merchantTypeFilter);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            <option value="NT">NT</option>
            <option value="WIP">WIP</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="TRANSACTING">TRANSACTING</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">🔽 Merchant Type:</label>
          <select
            value={merchantTypeFilter}
            onChange={(e) => {
              setMerchantTypeFilter(e.target.value);
              handleFilter(statusFilter, e.target.value);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            <option value="NEW">NEW</option>
            <option value="EXISTING">EXISTING</option>
            <option value="SELF-SOURCING">SELF-SOURCING</option>
          </select>
          {merchantTypeFilter && (
            <span className="ml-4 font-semibold text-sm text-gray-600">
              Showing {typeCount} {merchantTypeFilter.toLowerCase()} merchants
            </span>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto border border-gray-300 rounded">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={i}
                  className={`border px-2 py-1 font-semibold text-left ${
                    i < 2 ? "sticky left-0 z-10 bg-gray-100" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, i) => (
              <tr key={i}>
                {headers.map((_, j) => {
                  const cell = row[j] || "";
                  const isWebsite = j === websiteIndex && cell.startsWith("http");
                  return (
                    <td
                      key={j}
                      className={`border px-2 py-1 ${
                        j < 2 ? "sticky left-0 bg-white z-0" : ""
                      }`}
                    >
                      {isWebsite ? (
                        <a
                          href={cell}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {cell}
                        </a>
                      ) : (
                        cell
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2 flex-wrap">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MerchantManagement;