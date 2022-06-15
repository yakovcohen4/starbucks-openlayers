import { shopType } from '../../vite-env';

export const getStarbucksShopsByCountry = (
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

  return starbucksShops;
};
