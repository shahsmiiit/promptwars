import { Facility } from './types';

export async function getNearbyFacilities(lat: number, lng: number, careType: string): Promise<Facility[]> {
  // TODO: Replace with Places API /nearbysearch when backend proxy is ready
  return [
    { name: "City Hospital", type: "ER", eta: "10 min", distance: "2 mi", mapsUrl: "https://www.google.com/maps/search" },
    { name: "Downtown Urgent Care", type: "urgent-care", eta: "5 min", distance: "1 mi", mapsUrl: "https://www.google.com/maps/search" },
    { name: "General Clinic", type: "primary-care", eta: "15 min", distance: "3 mi", mapsUrl: "https://www.google.com/maps/search" }
  ];
}
