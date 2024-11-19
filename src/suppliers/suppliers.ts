export const suppliers = [
  {
    name: 'acme',
    endpoint: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme',
    dataMap: {
      id: 'Id',
      destination_id: 'DestinationId',
      name: 'Name',
      location: {
        address: 'Address',
        lat: 'Lat',
        lng: 'Lng',
        country: null,
      },
      description: 'Info',
      amenities: {
        general: 'Amenities',
        room: null,
      },
      images: {
        rooms: {
          '[path]': ['Images','Rooms'],
          '[map]': {
            link: 'Url',
            description: 'Description',
          },
        },
        site: null,
        amenities: {
            '[path]': ['Images','Amenities'],
            '[map]': {
            link: 'Url',
            description: 'Description',
          },
        },
      },
      booking_conditions: null,
      '[supplier]': 'acme'
    },
  },
  {
    name: 'paperfiles',
    endpoint: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies',
    dataMap: {
      id: 'hotel_id',
      destination_id: 'destination_id',
      name: 'hotel_name',
      location: {
        lat: null,
        lng: null,
        address: ['location','address'],
        country: ['location','country']
      },
      description: 'details',
      amenities: 'amenities',
      images: {
        rooms: {
          '[path]': ['images','rooms'],
          '[map]': {
            link: 'link',
            description: 'caption',
          },
        },
        site: {
            '[path]':['images','site'],
            '[map]': {
            link: 'link',
            description: 'caption',
          },
        },
        amenities: null
      },
      booking_conditions: 'booking_conditions',
      '[supplier]': 'paperfiles'
    }
  },
  {
    name: 'patagonia',
    endpoint: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia',
    dataMap: {
      id: 'id',
      destination_id: 'destination',
      name: 'name',
      location: {
          lat: 'lat',
          lng: 'lng',
          address: 'address',
          country: null,
      },
      description: 'info',
      amenities: {
          general: 'amenities',
          rooms: null
      },
      images: {
        rooms: {
          '[path]': ['images','rooms'],
          '[map]': {
            link: 'url',
            description: 'description',
          },
        },
        amenities: {
            '[path]': ['images','amenities'],
            '[map]': {
            link: 'url',
            description: 'description',
          },
        },
        site: null
      },
      booking_conditions: null,
      '[supplier]': 'patagoina'
    }
  }
];
