// 📁 File: src/pages/PipeAnalysis.tsx
import { db, pipeBucket } from "../firebase";
import React, { useEffect, useState } from "react";
import {
  ref as storageRef,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import * as XLSX from "xlsx";
import { normalizeStatus, getStatus } from "../utils/pipeUtils";
import { PipeSummary } from "../types/pipe";
import Papa from "papaparse";

const PipeAnalysis: React.FC = () => {
  const [fileDates, setFileDates] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string>("");
  const [summary, setSummary] = useState<PipeSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">("default");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [clientFilter, setClientFilter] = useState<string>("All");
  const [pgModeFilter, setPgModeFilter] = useState<string>("All");
  const [searchCode, setSearchCode] = useState<string>("");

  const fetchAvailableFiles = async () => {
    try {
      const prefix = "pipe_data/";
      const result = await listAll(storageRef(pipeBucket, prefix));
      const csvs = result.items
        .filter((item) => item.name.endsWith(".csv"))
        .map((item) => item.name.replace(".csv", ""));
      setFileDates(csvs.sort());
      setSelectedDates(csvs.length ? csvs[csvs.length - 1] : "");
    } catch (err) {
      console.error("❌ Error fetching file list:", err);
    }
  };

  const loadCSVs = React.useCallback(async () => {
    if (!selectedDates || loading) return;
    setLoading(true);
    try {
      const allData: any[] = [];
      const filePath = `pipe_data/${selectedDates}.csv`;
      const fileRef = storageRef(pipeBucket, filePath);
      const url = await getDownloadURL(fileRef);
      const response = await fetch(url);
      const csvText = await response.text();
      const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      for (const row of parsed.data as any[]) {
        allData.push({ ...row, __source_date: selectedDates });
      }

      const cleaned = allData.filter(
        (row) => row && ["success", "failed"].includes(normalizeStatus(row.status))
      );

      const grouped = new Map<string, any>();
      cleaned.forEach((row) => {
        const key = `${row.client_name}_${row.client_code}_${row.pg_pay_mode}_${row.payment_mode}`;
        const normalized = normalizeStatus(row.status);
        if (!grouped.has(key)) {
          grouped.set(key, {
            client_name: row.client_name || "Unknown",
            client_code: row.client_code,
            pg_pay_mode: row.pg_pay_mode,
            payment_mode: row.payment_mode,
            success: 0,
            failed: 0,
          });
        }
        if (normalized === "success") grouped.get(key).success++;
        if (normalized === "failed") grouped.get(key).failed++;
      });

      const summaryArray: PipeSummary[] = Array.from(grouped.values()).map((row) => {
        const total = row.success + row.failed;
        const successPercent = total ? (row.success / total) * 100 : 0;
        return {
          ...row,
          TotalTxn: total,
          SuccessPercent: +successPercent.toFixed(2),
          Status: getStatus(successPercent),
        };
      });

      if (sortOrder === "asc") summaryArray.sort((a, b) => a.SuccessPercent - b.SuccessPercent);
      if (sortOrder === "desc") summaryArray.sort((a, b) => b.SuccessPercent - a.SuccessPercent);

      setSummary(summaryArray);
    } catch (err) {
      console.error("❌ Error loading CSVs:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedDates, sortOrder, loading]);

  const handleUpload = async () => {
    const colRef = collection(db, "pipe_summary");
    const docs = await getDocs(colRef);
    for (const d of docs.docs) await deleteDoc(d.ref);
    for (const row of summary) {
      const id = `${row.client_code}_${row.pg_pay_mode}_${row.payment_mode}`;
      await setDoc(doc(db, "pipe_summary", id), row);
    }
    alert("✅ Uploaded to Firestore");
  };

  const downloadCSV = () => {
    const ws = XLSX.utils.json_to_sheet(summary);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Summary");
    XLSX.writeFile(wb, `PIPE_Analysis_${selectedDates}.xlsx`);
  };

  useEffect(() => {
    fetchAvailableFiles();
  }, []);

  useEffect(() => {
    loadCSVs();
  }, [loadCSVs]);

  const totalSuccess = summary.reduce((acc, s) => acc + s.success, 0);
  const totalFailed = summary.reduce((acc, s) => acc + s.failed, 0);
  const totalTransactions = totalSuccess + totalFailed;
  const successRate = totalTransactions ? ((totalSuccess / totalTransactions) * 100).toFixed(2) : 0;
  const failedRate = totalTransactions ? ((totalFailed / totalTransactions) * 100).toFixed(2) : 0;

  const filteredSummary = summary.filter((s) =>
    (statusFilter === "All" || s.Status === statusFilter) &&
    (clientFilter === "All" || s.client_name === clientFilter) &&
    (pgModeFilter === "All" || s.pg_pay_mode === pgModeFilter) &&
    (!searchCode || s.client_code?.toLowerCase().includes(searchCode.toLowerCase()))
  );

  const uniqueStatuses = ["All", ...Array.from(new Set(summary.map((s) => s.Status)))];
  const uniqueClients = ["All", ...Array.from(new Set(summary.map((s) => s.client_name)))];
  const uniquePgModes = ["All", ...Array.from(new Set(summary.map((s) => s.pg_pay_mode)))];

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 gap-4">
        <a href="https://www.sabpaisa.in" target="_blank">
          <img src="https://services.sabpaisa.in/pages/images/Sab-Paisa-small.png" width={90} />
        </a>
        <h1 className="text-2xl font-bold">🔌 PIPE ANALYSIS</h1>
      </div>

      {summary.length > 0 && (
        <div className="mb-4 text-sm font-semibold">
          📊 Total Txn: {totalTransactions} | ✅ Success: {totalSuccess} ({successRate}%) | ❌ Failed: {totalFailed} ({failedRate}%)
        </div>
      )}

      {loading && <p className="text-blue-500 font-semibold mb-4">Loading data, please wait...</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={loadCSVs} className="btn btn-outline">🔁 Refresh</button>
        <button onClick={() => setSummary(summary.filter((s) => s.Status === "Critical"))} className="btn btn-error">
          🔔 Alert (Critical Only)
        </button>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as any)} className="select select-bordered">
          <option value="default">Default</option>
          <option value="asc">🔼 Lowest to Highest</option>
          <option value="desc">🔽 Highest to Lowest</option>
        </select>
        <select value={selectedDates} onChange={(e) => setSelectedDates(e.target.value)} className="select select-bordered">
          {fileDates.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="select select-bordered">
          {uniqueStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="select select-bordered">
          {uniqueClients.map((client) => <option key={client} value={client}>{client}</option>)}
        </select>
        <select value={pgModeFilter} onChange={(e) => setPgModeFilter(e.target.value)} className="select select-bordered">
          {uniquePgModes.map((mode) => <option key={mode} value={mode}>{mode}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search by Client Code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          className="input input-bordered"
        />
      </div>

      <div className="overflow-x-auto">
        {filteredSummary.length > 0 ? (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Client</th>
                <th>Code</th>
                <th>PG Pay Mode</th>
                <th>Payment Mode</th>
                <th>Success</th>
                <th>Failed</th>
                <th>Total</th>
                <th>Success %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSummary.map((s, i) => (
                <tr key={i} className={s.Status === "Critical" ? "bg-red-100" : ""}>
                  <td>{s.client_name}</td>
                  <td>{s.client_code}</td>
                  <td>{s.pg_pay_mode}</td>
                  <td>{s.payment_mode}</td>
                  <td>{s.success}</td>
                  <td>{s.failed}</td>
                  <td>{s.TotalTxn}</td>
                  <td>{s.SuccessPercent}%</td>
                  <td>{s.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-gray-500">📂 No data loaded yet. Select a date above.
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-4">
        <button onClick={downloadCSV} className="btn btn-success">📅 Download Summary</button>
        <button onClick={handleUpload} className="btn btn-info">📄 Upload to Firestore</button>
      </div>
    </div>
  );
};

export default PipeAnalysis;
