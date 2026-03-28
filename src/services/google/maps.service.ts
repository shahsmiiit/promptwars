export function buildMapsEmbedUrl(careType: string, lat?: number, lng?: number): string {
  const key = import.meta.env.VITE_MAPS_EMBED_KEY || 'MAPS_API_KEY';
  let q = 'pharmacy+near+me';
  
  if (careType === 'ER' || careType === 'call-ambulance' || careType === 'emergency') {
    q = 'emergency+room';
  } else if (careType === 'urgent-care' || careType === 'urgent_care') {
    q = 'urgent+care+near+me';
  }

  let url = `https://www.google.com/maps/embed/v1/search?key=${key}&q=${q}`;
  if (lat && lng) {
    url += `&center=${lat},${lng}&zoom=13`;
  }
  return url;
}

export function buildMapsDirectionsUrl(lat: number, lng: number, careType: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}
