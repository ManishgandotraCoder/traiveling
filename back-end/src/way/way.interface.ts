// Define the interfaces for travel data
export interface Train {
  departurePlace: string;
  arrivalPlace: string;
  departureDateTime: string;
  arrivalDateTime: string;
}

export interface TravelType {
  currentLocation: string;
  travelLocations: string[];
  minStayHours: number;
  user: string;
  email: string;
}
export interface TrainPathType {
  from: string;
  to: string;
}
