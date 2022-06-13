// data GeoJSON
export const fetchGeoJsonCountry = async () => {
  try {
    const response = await fetch(
      'https://openlayers.org/en/v4.6.5/examples/data/geojson/countries.geojson'
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
