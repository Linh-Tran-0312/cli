import { IHotel } from '../suppliers/supplier';

// Geo coordinates validation
const isValidLat = (lat: any) => {
    if(!lat || isNaN(Number(lat))) return false;
    return lat >= -90 && lat <= 90;
}
const getValidLat = (lat: any) => {
    if(!isValidLat(lat)) return null;
    return lat;
}

const isValidLng = (lng: any) => {
    if(!lng || isNaN(Number(lng))) return false;
    return lng >= -180 && lng <= 180;
}
 const getValidLng = (lng: any) => {
    if(!isValidLng(lng)) return null;
    return lng;
}

export const validateHotel = (hotel: IHotel|null) => {
    if(!hotel) return null;
    hotel.location.lat = getValidLat(hotel.location.lat);
    hotel.location.lng = getValidLng(hotel.location.lng);
    return hotel;
}