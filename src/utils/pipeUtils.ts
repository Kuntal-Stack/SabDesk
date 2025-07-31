export function normalizeStatus(val: string): "success" | "failed" | "other" {
  const lower = val.toLowerCase();
  if (lower.includes("success")) return "success";
  if (lower.includes("fail")) return "failed";
  return "other";
}

export function getStatus(successPercent: number): "Healthy" | "Warning" | "Critical" {
  if (successPercent >= 90) return "Healthy";
  if (successPercent >= 70) return "Warning";
  return "Critical";
}
