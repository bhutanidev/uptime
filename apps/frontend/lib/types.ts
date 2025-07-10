export type Website = {
  id: number;
  url: string;
  status: 'up' | 'down' | 'unknown';
  response_time_in_ms: number;
  lastChecked: string;
}