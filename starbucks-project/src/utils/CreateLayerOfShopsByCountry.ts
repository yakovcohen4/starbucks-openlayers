import { Feature } from 'ol';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { view } from '../main';
// type
import { shopType } from '../vite-env';
// helper function
import { getAllPointShopsByData } from './helpers/getAllPointShopsByData';

export const createLayerOfShopsByCountry = (
  countryCodeAlpha2: string,
  shopsData: shopType[]
) => {
  let starbucksShops;
  if (countryCodeAlpha2 === 'all-world') {
    starbucksShops = shopsData;
  } else {
    starbucksShops = shopsData.filter(
      shop => shop.country === countryCodeAlpha2
    );
  }

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
