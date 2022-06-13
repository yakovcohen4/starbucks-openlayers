// fetchData function
export const fetchStarbucksShops = async () => {
  try {
    const url =
      'https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json';
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
