import { IHotel } from '../suppliers/supplier';
import { mergeStringArray, mergeObjectArray } from './combineAndDeduplicate';

const getStringValue = (strA: string, strB: string) => {
    const trimmedStrA = strA?.trim();
    const trimmedStrB = strB?.trim();
    if(!strA || !strB) return trimmedStrA ?? trimmedStrB;
    if(trimmedStrA.length > trimmedStrB.length) return trimmedStrA;
    return trimmedStrB;
};
const processAmenityString = (str: string) => {
    return str.trim().toLocaleLowerCase();
}
const mergeAndRemoveDuplicatedAmenities = (hotelA: IHotel, hotelB: IHotel) => {
    const mergedRooms = mergeStringArray(hotelA.amenities.room, hotelB.amenities.room, processAmenityString);
    const mergedGeneral = mergeStringArray(hotelA.amenities.general, hotelB.amenities.general,processAmenityString);
    const roomSet = new Set(mergedRooms);
    const validGeneral= mergedGeneral.filter((item) => !roomSet.has(item));
    return ({
        room: mergedRooms,
        general: validGeneral
    })
}

export const mergeHotel = (hotelA: IHotel, hotelB: IHotel) => {

    return({
        id: hotelB.id,
        destination_id: hotelB.destination_id,
        name: getStringValue(hotelA.name, hotelB.name),
        location: {
            lat: (hotelA.location.lat) || (hotelB.location.lat),
            lng: (hotelA.location.lng) || (hotelB.location.lng),
            address: getStringValue(hotelA.location.address, hotelB.location.address),
            city: getStringValue(hotelA.location.city, hotelB.location.city),
            country: getStringValue(hotelA.location.country, hotelB.location.country)
        },
        description: getStringValue(hotelA.description, hotelB.description),
        amenities: mergeAndRemoveDuplicatedAmenities(hotelA, hotelB),
        images: ['site', 'rooms', 'amenities'].reduce((acc,item) => {
            // @ts-ignore
            acc[item] = mergeObjectArray(hotelA.images[item], hotelB.images[item], 'link');
            return acc;
        },{}),
     
        booking_conditions: mergeStringArray(hotelA.booking_conditions,hotelB.booking_conditions)
})
}