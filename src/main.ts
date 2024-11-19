import { suppliers } from './suppliers/suppliers';
import { logger } from './helpers/logger';
import { HotelService } from './services/hotelService';
import { Supplier } from './suppliers/supplier';

async function main(agrs: string[]) {
  async function myHotelMerger(hotelIds: string, destinationIds: string) {
    const allSupplierData = (
      await Promise.all(
        suppliers.map(({ name, endpoint, dataMap }) => {
          const supplierInstance = Supplier.getInstance(
            name,
            endpoint,
            dataMap
          );
          return supplierInstance.fetch();
        })
      )
    ).flat();

    const hotelService = new HotelService();
    // @ts-ignore
    hotelService.mergeAndSave(allSupplierData);

    console.log('hotelIds: ' + hotelIds);
    console.log('destinationIds: ' + destinationIds);

    if (hotelIds === 'none' || destinationIds === 'none')
      return hotelService.getHotels();

    const arrHotelIds = hotelIds.split(',');
    const destinationIdsSet = new Set(destinationIds.split(','));
    const result = [];
    for (const hotelId of arrHotelIds) {
      const hotel = hotelService.getHotelById(hotelId);
      if (
        hotel &&
        hotel.destination_id &&
        destinationIdsSet.has(hotel.destination_id.toString())
      ) {
        result.push(hotel);
      }
    }

    return result;
  }

  if (agrs.length < 2) {
    console.log('Please provide enough 2 parameters');
  } else {
    myHotelMerger(agrs[0], agrs[1]).then((res) => {
      logger.json('result', res);
      console.log('See logs/result.json for result');
    });
    // await new Promise(resolve => setTimeout(resolve, 3000));
    // await myHotelMerger(agrs[0], agrs[1]);
    // await myHotelMerger(agrs[0], agrs[1]);
  }
}

main(process.argv.slice(2));
