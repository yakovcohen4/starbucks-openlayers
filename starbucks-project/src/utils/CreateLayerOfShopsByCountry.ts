import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
// type
import { shopType } from '../vite-env';
// helper function
import { getAllPointShopsByData } from './helpers/getAllPointShopsByData';
import { getStarbucksShopsByCountry } from './helpers/getStarbucksShopsByCountry';
import { moveMapByCoordinate } from './helpers/moveMapByCoordinate';

export const createLayerOfShopsByCountry = (
  countryCodeAlpha2: string,
  shopsData: shopType[]
) => {
  // get all shops by country
  const starbucksShops = getStarbucksShopsByCountry(
    countryCodeAlpha2,
    shopsData
  );

  // move map view to the country
  moveMapByCoordinate(starbucksShops[0].longitude, starbucksShops[0].latitude);

  const countryShops: Feature<Point>[] = getAllPointShopsByData(starbucksShops);

  const vectorSourceByCountry = new VectorSource({
    features: countryShops,
  });
  const vectorLayerByCountry = new VectorLayer({
    source: vectorSourceByCountry,
    className: 'starbucks-by-country',
  });

  return vectorLayerByCountry;
};
