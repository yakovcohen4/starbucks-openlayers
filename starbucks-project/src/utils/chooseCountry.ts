import { Feature } from 'ol';
import { Point, Polygon } from 'ol/geom';
import { Fill, Stroke, Style } from 'ol/style';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import BaseLayer from 'ol/layer/Base';
import { map, starbucksShopLayer, shopsData, countryGeoData } from '../main';
import { getAllPointShopsByData } from './getAllPointShopsByData';
import countries from '../data/countryAlpha2.json';
import { getLayerByClassName } from './getLayerByClassName';

const styleCountryPolygon = new Style({
  stroke: new Stroke({
    color: '#ffcc33',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.2)',
  }),
});

export const chooseCountry = (event: any) => {
  const countryCodeAlpha2 = event.target.value;
  let countryName: string;
  if (countryCodeAlpha2 !== 'all-world') {
    countryName = countries.filter(
      (country1: { code: string }) => country1.code === countryCodeAlpha2
    )[0].name;
  }

  // * * * Clear map * * *
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
  // * * * Clear map * * *

  // Add Country Polygon layer
  const countryFeature = countryGeoData.features.filter(
    (country2: { properties: { name: string } }) =>
      country2.properties.name === countryName
  )[0];

  if (!countryFeature) {
    return;
  }

  const countryCoordinatesArrayLength =
    countryFeature.geometry.coordinates.length;

  let coordinatesCountry;
  if (countryCoordinatesArrayLength === 1) {
    coordinatesCountry = countryFeature.geometry.coordinates.map(
      (coordinate: number[][]) => {
        return coordinate.map((coordinate1: number[]) => {
          return fromLonLat(coordinate1);
        });
      }
    );
  } else {
    coordinatesCountry = countryFeature.geometry.coordinates.map(
      (coordinate: number[][][]) => {
        return coordinate.map((coordinate1: number[][]) => {
          return coordinate1.map((coordinate2: number[]) => {
            return fromLonLat(coordinate2);
          });
        });
      }
    );
  }
  const polygonLayer = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Polygon(coordinatesCountry),
        }),
      ],
    }),
    style: styleCountryPolygon,
    className: 'country-polygon',
  });
  map.addLayer(polygonLayer);

  // Add new layer of shops by country
  let starbucksShops;
  if (countryCodeAlpha2 === 'all-world') {
    starbucksShops = shopsData;
  } else {
    starbucksShops = shopsData.filter(
      shop => shop.country === countryCodeAlpha2
    );
  }

  const countryShops: Feature<Point>[] = getAllPointShopsByData(starbucksShops);

  const vectorSourceByCountry = new VectorSource({
    features: countryShops,
  });
  const vectorLayerByCountry = new VectorLayer({
    source: vectorSourceByCountry,
    className: 'starbucks-by-country',
  });
  map.addLayer(vectorLayerByCountry);
};
