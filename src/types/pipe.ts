export interface PipeSummary {
  client_name: string;
  client_code: string;
  pg_pay_mode: string;
  payment_mode: string;
  success: number;
  failed: number;
  TotalTxn: number;
  SuccessPercent: number;
  Status: "Healthy" | "Warning" | "Critical";
}
