import { CustomResponseDataType } from '@lingo-match/types/strapi/baseApiResponse';
import { ApiError } from 'next/dist/server/api-utils';

const supportedCurrencies = ['USD', 'EUR', 'GBP'];
const baseExchangeApiUrl = process.env.EXCHANGE_API_URL;

export type CurrencyResponseType = {
  code: string;
  currency: string;
  mid: number;
};

type ResponseCurrenciesTableType = {
  effectiveDate: string;
  no: string;
  rates: CurrencyResponseType[];
  table: string;
};

const baseFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(`${baseExchangeApiUrl}${url}`, options);
    if (!response.ok) {
      throw new ApiError(response.status, response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getCurrenciesExchangeRate = async () => {
  try {
    const responseData = await baseFetch<ResponseCurrenciesTableType[]>('/tables/a/');

    const parsedCurrenciesRate = supportedCurrencies.map((currency) =>
      responseData[0].rates.find((item) => item.code === currency),
    );

    return { data: parsedCurrenciesRate, success: true };
  } catch (error) {
    console.error(
      `[Exchange Service Error] Cannot get currencies data - ${error.message} | ${error.status}`,
    );
    return { data: null, success: false };
  }
};
