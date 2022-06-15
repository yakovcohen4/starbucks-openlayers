import { map, starbucksShopLayer } from '../../main';
import { getLayerByClassName } from './getLayerByClassName';

export const clearMapForChooseCountry = () => {
  map.removeLayer(starbucksShopLayer);
  const allMapLayers = map.getLayers().getArray();

  const starbucksShopCountryLayer = getLayerByClassName(
    allMapLayers,
    'starbucks-by-country'
  );
  const polygonShopCountryLayer = getLayerByClassName(
    allMapLayers,
    'country-polygon'
  );

  if (starbucksShopCountryLayer) {
    map.removeLayer(starbucksShopCountryLayer);
  }
  if (polygonShopCountryLayer) {
    map.removeLayer(polygonShopCountryLayer);
  }
};
