import { IHotel } from '../suppliers/supplier';
import { mergeHotel } from '../helpers/mergeHotel';
import { logger } from '../helpers/logger';

export class HotelService {
  private hotelMap: Map<string, IHotel>;
  private hotels: IHotel[];
  constructor() {
    this.hotelMap = new Map();
    this.hotels = [];
  }

  mergeAndSave(hotels: IHotel[]) {
    hotels.forEach((hotel) => {
      if (this.hotelMap.has(hotel.id)) {
        const existingHotel = this.hotelMap.get(hotel.id)!;
        let mergedHotel;
        try {
          mergedHotel = mergeHotel(existingHotel, hotel);
        } catch (error) {
          logger.error(
            'merge',
            `${existingHotel['[supplier]']}-${hotel['[supplier]']}: ${error}`
          );
          mergedHotel = null;
        }
        this.hotelMap.set(hotel.id, mergedHotel as IHotel);
      } else {
        this.hotelMap.set(hotel.id, hotel);
      }
    });
    this.hotels = Array.from(this.hotelMap.values());
  }

  getHotelById(hotelId: string): IHotel | null {
    if (this.hotelMap.has(hotelId)) return this.hotelMap.get(hotelId)!;
    return null;
  }

  getHotels() {
    return this.hotels;
  }
}
