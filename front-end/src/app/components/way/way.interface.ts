export interface cityType {
  name: string;
  id: number;
  country: string;
  description: string;
}
export interface planType {
  departurePlace: string;
  arrivalPlace: string;
  departureDateTime: string;
  trainID: string;
  trainName: string;
  price: string;
  arrivalDateTime: string;
}
export interface otherPlansType {
  route: planType[];
  routePath: string;
  time: number;
  startEndTime: string;
  priceRange: string;
  priceEndto?: number;
  priceStartfrom?: number;
}
export interface SuggestedPlan {
  from: string;
  to: string;
}
export interface wayServiceResponseType {
  route: string;
}
export type suggestedPlansType = SuggestedPlan[];
