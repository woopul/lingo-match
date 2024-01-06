import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { DEFAULT_PLATFORMS_PAGE_LIMIT } from '@lingo-match/constants/requests';
import { cleanStrapiData } from '@lingo-match/helpers/cleanStrapiData';
import { redis } from '@lingo-match/lib/redis';
import { BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import {
  BlogPostDTO,
  HomePageDTO,
  PlatformDTO,
  TranslationsDTO,
} from '@lingo-match/types/strapi/blocks';
import { parseStrapiResponseToData, strapiData } from '@lingo-match/utlis/parseStrapiResponse';
import qs from 'qs';

import { getPlatformsDataConfig } from './dataPupulation.config';

const getStrapiURL = (path: string = '') => {
  return `${process.env.STRAPI_API_URL}${path}`;
};

export const getStrapiMediaURL = (media: any) => {
  const { url } = media.data.attributes;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
};

const fetchAPI = async <RT>(
  path: string,
  urlParamsObject: Record<any, any> = {},
  options: Record<any, any> = {},
): Promise<BaseResponseDataWrapper<RT>> => {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const baseUrl = process.env.STRAPI_API_URL;
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${baseUrl}${path}${queryString ? `?${queryString}` : ''}`;

  // ------------------------------
  //  GET CACHED DATA FROM REDIS
  // ------------------------------
  // try {
  //   const cachedData = await redis.get(requestUrl);

  //   if (cachedData) {
  //     return JSON.parse(cachedData);
  //   }
  // } catch (error) {
  //   console.error('GET ERROR', error);
  // }

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(
      `Error during fetch | url: ${baseUrl}${path} | status: ${response.status} | message: ${
        response.statusText
      } | params: ${JSON.stringify(urlParamsObject)}`,
    );
  }

  const data = await response.json();

  // ------------------------------
  //  SET CACHED DATA IN REDIS
  // ------------------------------
  // try {
  //   await redis.set(requestUrl, JSON.stringify(data));
  // } catch (error) {
  //   console.error(error);
  // }
  return data;
};

const getBlogPosts = async () => {
  try {
    const response = await fetchAPI<BlogPostDTO>('/blogposts', { populate: 'deep,3' });
    return parseStrapiResponseToData<BlogPostDTO>(response);
  } catch (error) {
    console.error(`[BlogPosts Service Error] Cannot get blog posts - ${error.message}`);
    return null;
  }
};

export type GetPlatformsPayloadOptions = {
  filters?: string[];
  pagination?: {
    page?: number;
    pageSize?: number;
  };
};

export type GetLabelsOptions = {
  fields: string[];
};

const getPlatforms = async (options?: GetPlatformsPayloadOptions) => {
  const { filters: filtersArray, pagination } = options || {};
  const filters = filtersArray?.length
    ? { $and: filtersArray.map((filter) => ({ tags: { type: { $eq: filter } } })) }
    : [];
  try {
    const response = await fetchAPI<PlatformDTO[]>('/platforms', {
      ...getPlatformsDataConfig,
      filters,
      pagination: {
        page: 1,
        pageSize: DEFAULT_PLATFORMS_PAGE_LIMIT,
        ...(pagination || {}),
      },
    });

    return { data: response, success: true };
  } catch (error) {
    console.error(
      `[Platforms Service Error] Filter platforms Cannot get platforms - ${error.message}`,
    );
    return { data: null, success: false };
  }
};

const getPlatformBySlug = async (slug: string) => {
  try {
    const blogPostResponse = await fetchAPI<PlatformDTO>(`/platforms/${slug}`, {
      populate: 'deep,4',
    });
    return parseStrapiResponseToData<PlatformDTO>(blogPostResponse);
  } catch (error) {
    console.error(`[Platform Service Error] Cannot get platform - ${error.message}`);
    return null;
  }
};

const getLabels = async ({ fields = [] }: GetLabelsOptions) => {
  try {
    const labelsResponse = await fetchAPI<TranslationsDTO>(`/translation`, {
      populate: fields,
      // populate: 'deep,2',
    });

    console.log('getLabels 1', labelsResponse);
    const parsedData = parseStrapiResponseToData<TranslationsDTO>(labelsResponse);
    console.log('getLabels 2', parsedData);
    return cleanStrapiData(parsedData);
  } catch (error) {
    console.error(`[Platform Service Error] Cannot get labels - ${error.message}`);
    return null;
  }
};

const getBlogPostBySlug = async (slug: string) => {
  try {
    const blogPostsResponse = await fetchAPI<BlogPostDTO>(`/blogposts/${slug}`, {
      populate: 'deep,4',
    });
    return parseStrapiResponseToData<BlogPostDTO>(blogPostsResponse);
  } catch (error) {
    console.error(`[BlogPost Service Error] Cannot get blog post - ${error.message}`);
    return null;
  }
};

const getHomePage = async () => {
  try {
    const homePageResponse = await fetchAPI<HomePageDTO>(`/home-page`, { populate: 'deep,3' });
    return parseStrapiResponseToData<HomePageDTO>(homePageResponse) as HomePageDTO;
  } catch (error) {
    console.error(`[HomePage Service Error] Cannot get home page - ${error.message}`);
    return null;
  }
};

const getLayoutConfig = async () => {
  try {
    const response = await fetchAPI<LayoutConfigDTO>('/layout', {
      populate: 'deep,4',
    });

    return parseStrapiResponseToData(response);
  } catch (error) {
    console.error(`[Layout Service Error] Cannot get layout config - ${error.message}`);
    return null;
  }
};

const getFilteredPlatforms = async (filtersArray: string[]) => {
  try {
    const filters = { $and: filtersArray.map((filter) => ({ tags: { type: { $eq: filter } } })) };
    const response = await fetchAPI<PlatformDTO[]>(`/platforms`, {
      filters,
      ...getPlatformsDataConfig,
    });

    return { data: response, success: true };
  } catch (error) {
    console.error(
      `[Platforms Service Error] Filter platforms Cannot get platforms - ${error.message}`,
    );
    return { data: null, success: false };
  }
};

export {
  fetchAPI,
  getBlogPostBySlug,
  getBlogPosts,
  getFilteredPlatforms,
  getHomePage,
  getLabels,
  getLayoutConfig,
  getPlatformBySlug,
  getPlatforms,
};
