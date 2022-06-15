import { map, shopsData, countryGeoData } from '../main';
import countries from '../data/countryAlpha2.json';
// helper function
import { clearMapForChooseCountry } from './helpers/clearMapForChooseCountry';
import { createLayerOfShopsByCountry } from './createLayerOfShopsByCountry';
import { createLayerCountryPolygon } from './createLayerCountryPolygon';

export const chooseCountry = (event: any) => {
  const countryCodeAlpha2 = event.target.value;
  let countryName: string = '';
  if (countryCodeAlpha2 !== 'all-world') {
    countryName = countries.filter(
      (country1: { code: string }) => country1.code === countryCodeAlpha2
    )[0].name;
  }

  // * * * Clear map * * *
  clearMapForChooseCountry();
  // * * * Clear map * * *

  // Add new layer Country Polygon
  const countryPolygonLayer = createLayerCountryPolygon(
    countryName,
    countryGeoData
  );
  if (countryPolygonLayer) {
    // if countryPolygonLayer is not null
    map.addLayer(countryPolygonLayer);
  }

  // Add new layer of shops by country
  const vectorLayerByCountry = createLayerOfShopsByCountry(
    countryCodeAlpha2,
    shopsData
  );
  map.addLayer(vectorLayerByCountry);
};
