export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical': return '#B71C1C';
    case 'high': return '#E65100';
    case 'moderate': return '#F9A825';
    case 'low': return '#2E7D32';
    default: return '#9E9E9E';
  }
}
