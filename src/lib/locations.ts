export interface Location {
  city: string;
  state: string;
  stateAbbr: string;
  slug: string;
  stateSlug: string;
  lat: number;
  lng: number;
  driveTime?: string;
  nearby?: string;
}

function toSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const RAW_LOCATIONS: Omit<Location, "slug" | "stateSlug">[] = [
  // Indiana -- home state
  { city: "Indianapolis", state: "Indiana", stateAbbr: "IN", lat: 39.7684, lng: -86.1581, driveTime: "2.5 hours" },
  { city: "Fort Wayne", state: "Indiana", stateAbbr: "IN", lat: 41.0793, lng: -85.1394, driveTime: "2 hours" },
  { city: "South Bend", state: "Indiana", stateAbbr: "IN", lat: 41.6764, lng: -86.2520, driveTime: "1.5 hours" },
  { city: "Valparaiso", state: "Indiana", stateAbbr: "IN", lat: 41.4731, lng: -87.0611, driveTime: "45 minutes" },
  { city: "Lafayette", state: "Indiana", stateAbbr: "IN", lat: 40.4167, lng: -86.8753, driveTime: "2 hours" },
  { city: "Bloomington", state: "Indiana", stateAbbr: "IN", lat: 39.1653, lng: -86.5264, driveTime: "3.5 hours" },
  { city: "Evansville", state: "Indiana", stateAbbr: "IN", lat: 37.9716, lng: -87.5711, driveTime: "5 hours" },
  { city: "Carmel", state: "Indiana", stateAbbr: "IN", lat: 39.9784, lng: -86.1180, driveTime: "2.5 hours" },
  { city: "Fishers", state: "Indiana", stateAbbr: "IN", lat: 39.9568, lng: -86.0133, driveTime: "2.5 hours" },
  { city: "Muncie", state: "Indiana", stateAbbr: "IN", lat: 40.1934, lng: -85.3864, driveTime: "3 hours" },

  // Illinois
  { city: "Chicago", state: "Illinois", stateAbbr: "IL", lat: 41.8781, lng: -87.6298, driveTime: "2 hours" },
  { city: "Naperville", state: "Illinois", stateAbbr: "IL", lat: 41.7508, lng: -88.1535, driveTime: "2.5 hours" },
  { city: "Rockford", state: "Illinois", stateAbbr: "IL", lat: 42.2711, lng: -89.0940, driveTime: "3.5 hours" },
  { city: "Springfield", state: "Illinois", stateAbbr: "IL", lat: 39.7817, lng: -89.6501, driveTime: "4.5 hours" },
  { city: "Champaign", state: "Illinois", stateAbbr: "IL", lat: 40.1164, lng: -88.2434, driveTime: "3.5 hours" },

  // Michigan
  { city: "Detroit", state: "Michigan", stateAbbr: "MI", lat: 42.3314, lng: -83.0458, driveTime: "4 hours" },
  { city: "Grand Rapids", state: "Michigan", stateAbbr: "MI", lat: 42.9634, lng: -85.6681, driveTime: "3 hours" },
  { city: "Ann Arbor", state: "Michigan", stateAbbr: "MI", lat: 42.2808, lng: -83.7430, driveTime: "3.5 hours" },
  { city: "Kalamazoo", state: "Michigan", stateAbbr: "MI", lat: 42.2917, lng: -85.5872, driveTime: "2.5 hours" },
  { city: "Traverse City", state: "Michigan", stateAbbr: "MI", lat: 44.7631, lng: -85.6206, driveTime: "5 hours" },

  // Ohio
  { city: "Columbus", state: "Ohio", stateAbbr: "OH", lat: 39.9612, lng: -82.9988, driveTime: "4 hours" },
  { city: "Cincinnati", state: "Ohio", stateAbbr: "OH", lat: 39.1031, lng: -84.5120, driveTime: "4.5 hours" },
  { city: "Cleveland", state: "Ohio", stateAbbr: "OH", lat: 41.4993, lng: -81.6944, driveTime: "4.5 hours" },
  { city: "Toledo", state: "Ohio", stateAbbr: "OH", lat: 41.6528, lng: -83.5379, driveTime: "3.5 hours" },
  { city: "Dayton", state: "Ohio", stateAbbr: "OH", lat: 39.7589, lng: -84.1916, driveTime: "4 hours" },

  // Kentucky
  { city: "Louisville", state: "Kentucky", stateAbbr: "KY", lat: 38.2527, lng: -85.7585, driveTime: "4 hours" },
  { city: "Lexington", state: "Kentucky", stateAbbr: "KY", lat: 38.0406, lng: -84.5037, driveTime: "4.5 hours" },

  // Wisconsin
  { city: "Milwaukee", state: "Wisconsin", stateAbbr: "WI", lat: 43.0389, lng: -87.9065, driveTime: "3 hours" },
  { city: "Madison", state: "Wisconsin", stateAbbr: "WI", lat: 43.0731, lng: -89.4012, driveTime: "4 hours" },

  // Minnesota
  { city: "Minneapolis", state: "Minnesota", stateAbbr: "MN", lat: 44.9778, lng: -93.2650, driveTime: "7 hours" },
  { city: "St Paul", state: "Minnesota", stateAbbr: "MN", lat: 44.9537, lng: -93.0900, driveTime: "7 hours" },

  // Missouri
  { city: "St Louis", state: "Missouri", stateAbbr: "MO", lat: 38.6270, lng: -90.1994, driveTime: "5 hours" },
  { city: "Kansas City", state: "Missouri", stateAbbr: "MO", lat: 39.0997, lng: -94.5786 },

  // Tennessee
  { city: "Nashville", state: "Tennessee", stateAbbr: "TN", lat: 36.1627, lng: -86.7816, driveTime: "5 hours" },

  // Major metros -- flight nanny
  { city: "New York", state: "New York", stateAbbr: "NY", lat: 40.7128, lng: -74.0060, nearby: "We deliver via flight nanny to all NYC-area airports" },
  { city: "Los Angeles", state: "California", stateAbbr: "CA", lat: 34.0522, lng: -118.2437, nearby: "Flight nanny delivery to LAX" },
  { city: "Houston", state: "Texas", stateAbbr: "TX", lat: 29.7604, lng: -95.3698, nearby: "Flight nanny delivery to IAH and HOU" },
  { city: "Dallas", state: "Texas", stateAbbr: "TX", lat: 32.7767, lng: -96.7970, nearby: "Flight nanny delivery to DFW" },
  { city: "Austin", state: "Texas", stateAbbr: "TX", lat: 30.2672, lng: -97.7431, nearby: "Flight nanny delivery to AUS" },
  { city: "San Antonio", state: "Texas", stateAbbr: "TX", lat: 29.4241, lng: -98.4936, nearby: "Flight nanny delivery to SAT" },
  { city: "Phoenix", state: "Arizona", stateAbbr: "AZ", lat: 33.4484, lng: -112.0740, nearby: "Flight nanny delivery to PHX" },
  { city: "Denver", state: "Colorado", stateAbbr: "CO", lat: 39.7392, lng: -104.9903, nearby: "Flight nanny delivery to DEN" },
  { city: "Seattle", state: "Washington", stateAbbr: "WA", lat: 47.6062, lng: -122.3321, nearby: "Flight nanny delivery to SEA" },
  { city: "Portland", state: "Oregon", stateAbbr: "OR", lat: 45.5152, lng: -122.6784, nearby: "Flight nanny delivery to PDX" },
  { city: "Atlanta", state: "Georgia", stateAbbr: "GA", lat: 33.7490, lng: -84.3880, nearby: "Flight nanny delivery to ATL" },
  { city: "Charlotte", state: "North Carolina", stateAbbr: "NC", lat: 35.2271, lng: -80.8431, nearby: "Flight nanny delivery to CLT" },
  { city: "Raleigh", state: "North Carolina", stateAbbr: "NC", lat: 35.7796, lng: -78.6382, nearby: "Flight nanny delivery to RDU" },
  { city: "Tampa", state: "Florida", stateAbbr: "FL", lat: 27.9506, lng: -82.4572, nearby: "Flight nanny delivery to TPA" },
  { city: "Orlando", state: "Florida", stateAbbr: "FL", lat: 28.5383, lng: -81.3792, nearby: "Flight nanny delivery to MCO" },
  { city: "Miami", state: "Florida", stateAbbr: "FL", lat: 25.7617, lng: -80.1918, nearby: "Flight nanny delivery to MIA" },
  { city: "Washington", state: "District of Columbia", stateAbbr: "DC", lat: 38.9072, lng: -77.0369, nearby: "Flight nanny delivery to DCA, IAD, and BWI" },
  { city: "Boston", state: "Massachusetts", stateAbbr: "MA", lat: 42.3601, lng: -71.0589, nearby: "Flight nanny delivery to BOS" },
  { city: "Philadelphia", state: "Pennsylvania", stateAbbr: "PA", lat: 39.9526, lng: -75.1652, nearby: "Flight nanny delivery to PHL" },
  { city: "Pittsburgh", state: "Pennsylvania", stateAbbr: "PA", lat: 40.4406, lng: -79.9959, nearby: "Flight nanny delivery to PIT" },
  { city: "San Francisco", state: "California", stateAbbr: "CA", lat: 37.7749, lng: -122.4194, nearby: "Flight nanny delivery to SFO" },
  { city: "San Diego", state: "California", stateAbbr: "CA", lat: 32.7157, lng: -117.1611, nearby: "Flight nanny delivery to SAN" },
  { city: "Salt Lake City", state: "Utah", stateAbbr: "UT", lat: 40.7608, lng: -111.8910, nearby: "Flight nanny delivery to SLC" },
];

export const LOCATIONS: Location[] = RAW_LOCATIONS.map((loc) => ({
  ...loc,
  slug: toSlug(loc.city),
  stateSlug: toSlug(loc.state),
}));

export function getLocation(stateSlug: string, citySlug: string): Location | undefined {
  return LOCATIONS.find((l) => l.stateSlug === stateSlug && l.slug === citySlug);
}

export function getLocationsByState(): Record<string, Location[]> {
  const grouped: Record<string, Location[]> = {};
  for (const loc of LOCATIONS) {
    if (!grouped[loc.state]) grouped[loc.state] = [];
    grouped[loc.state].push(loc);
  }
  return grouped;
}

export function distanceFromKnox(lat: number, lng: number): number {
  // Haversine formula -- returns miles
  const R = 3959;
  const dLat = ((lat - 41.3092) * Math.PI) / 180;
  const dLng = ((lng - -86.62) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((41.3092 * Math.PI) / 180) *
      Math.cos((lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
