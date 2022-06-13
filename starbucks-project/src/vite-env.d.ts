/// <reference types="vite/client" />

import { Coordinates } from 'ol/coordinate';

export type shopType = {
  city: string;
  name: string;
  country: string;
  longitude: number;
  latitude: number;
  store_id: number;
};

export type countryGeoType = {
  geometry: {
    coordinates: Coordinates;
    type: string;
  };
  id: string;
  properties: {
    name: string;
  };
  type: string;
};
export type countryGeoDataType = {
  features: countryGeoType[];
};
