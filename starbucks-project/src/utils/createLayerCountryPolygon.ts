import { Feature } from 'ol';
import { Polygon } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
// types
import { countryGeoDataType } from '../vite-env';

const styleCountryPolygon = new Style({
  stroke: new Stroke({
    color: '#ffcc33',
    width: 2,
  }),
  fill: new Fill({
    color: 'rgba(255, 255, 0, 0.2)',
  }),
});

export const createLayerCountryPolygon = (
  countryName: string,
  countryGeoData: countryGeoDataType
) => {
  const countryFeature = countryGeoData.features.filter(
    (country: { properties: { name: string } }) =>
      country.properties.name === countryName
  )[0];

  if (!countryFeature) return;

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
  const polygonCountryLayer = new VectorLayer({
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

  return polygonCountryLayer;
};
