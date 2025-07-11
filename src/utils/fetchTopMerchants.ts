// src/utils/fetchTopMerchants.ts
import axios from "axios";

export interface Merchant {
  rank: number;
  name: string;
  code: string;
  segment: string;
  gmv: number;
  lastMonthTxns: number;
  transactions: number;
  growth: string;
}

const API_KEY = "AIzaSyCyl7rF6nsledoEDIVRTwQwPU6bTbdwIgA";
const SHEET_ID = "1KVrOqoLKkHXpHfzZMQcwHfDERDTekbScQ3y1TFaT6j4";
const RANGE = "TopMerchants!A2:H"; // ✅ Ensure tab is named 'TopMerchants'

export const fetchTopMerchants = async (): Promise<Merchant[]> => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    const res = await axios.get(url);

    console.log("✅ Sheet API data:", res.data);

    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      console.warn("⚠️ No merchant rows found");
      return [];
    }

    const merchants: Merchant[] = rows.map((row: string[]) => ({
      rank: parseInt(row[0]) || 0,
      name: row[1] || "N/A",
      code: row[2] || "N/A",
      segment: row[3] || "Unknown",
      gmv: parseFloat(row[4]) || 0,
      lastMonthTxns: parseInt(row[5]) || 0,
      transactions: parseInt(row[6]) || 0,
      growth: row[7] || "0%",
    }));

    return merchants;
  } catch (error) {
    console.error("❌ Error fetching merchants:", error);
    return [];
  }
};
