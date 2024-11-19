import { logger } from "../helpers/logger";
import { parseHotel } from "../helpers/parseHotel";
import { validateHotel } from "../helpers/validateHotel";

export interface IHotel {
  id: string;
  destination_id: number;
  name: string;
  location: {
      lat: number|null;
      lng: number|null;
      address: string;
      city: string;
      country: string;
  };
  description: string;
  amenities: {
      general: string[];
      room: string[];
  };
  images: {
      rooms: {
          link: string;
          description: string;
      }[];
      site: {
          link: string;
          description: string;
      }[];
      amenities: {
          link: string;
          description: string;
      }[];
  };
  booking_conditions: string[];
  '[supplier]'?: string
};
export class Supplier {
  private static instances: { [key: string]: Supplier } = {};
  name: string;
  endpoint: string;
  dataMap: any;
  cache: IHotel[] | null
  private constructor(name: string, endpoint: string, dataMap: any) {
    this.name = name;
    this.endpoint = endpoint;
    this.dataMap = dataMap;
    this.cache = null
  }

  public static getInstance(name: string, endpoint: string, dataMap: any): Supplier {
    if (!Supplier.instances[name]) {
      Supplier.instances[name] = new Supplier(name, endpoint, dataMap);
    }
    return Supplier.instances[name];
  }

  parse(data: any): IHotel | null {
    try {
      return parseHotel(data, this.dataMap) as IHotel;
    } catch (error) {
      logger.error(this.name, "Supplier.parse: " + error);
      return null;
    }
  }
  async fetch() {
    if(this.cache) {
      console.log('use cache for' + this.name)
      return this.cache;
    }
    try {
      const response = await fetch(this.endpoint);
      const data = await response.json();
      let parsedHotels = [];

      if (Array.isArray(data)) {
        parsedHotels =
          data
            .map((hotel: any) => {
              const parsedHotel = this.parse(hotel);
              return validateHotel(parsedHotel);
            })
            .filter((a) => a) || [];
      } else {
        throw new Error("Data not found");
      }

      this.cache = parsedHotels as IHotel[];
      return parsedHotels;
    } catch (error) {
      logger.error(this.name, "Supplier.fetch: " + error);
      return [];
    }
  }
}
