import { LaundryItems } from "./laundry-items";
import { Room } from "./room";

export class NewBooking {
  service!: string;
  frequency!: string;
  arrivalTime!: string;
  period!: string;
  dates!: string[];
  days?: string[];
  errandType?: string;
  items: LaundryItems[] = [];
  storeLocation?: string;
  deliveryAddress?: string;
  pickupAddress?: string;
  shoppingItems?: string;
  address!: string;
  cost!: number;
  servicePrice!: number;
  rooms: Room[] = [];
  buildingType?: string;
  extraInformation?: string;
  percentageDiscount!: number;
  discountedPrice!: number;
  officeLocation?: string;
  officeEmail?: string;
  officeContact?: string;
  paymentStatus?: string;
  userId?: string;
}
