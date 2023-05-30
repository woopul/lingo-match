import { LayoutConfigDTO } from '@lingo-match/components/Layout';
import { BaseResponseDataWrapper } from '@lingo-match/types/strapi/baseApiResponse';
import { BlogPostDTO, HomePageDTO, PlatformDTO } from '@lingo-match/types/strapi/blocks';
import { parseStrapiResponseToData } from '@lingo-match/utlis/parseStrapiResponse';
import qs from 'qs';

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

  const response = await fetch(requestUrl, mergedOptions);

  if (!response.ok) {
    throw new Error(
      `[FETCH STRAPI] url: ${baseUrl}${path} | status: ${response.status} | message: ${
        response.statusText
      } | params: ${JSON.stringify(urlParamsObject)}`,
    );
  }
  const data = await response.json();
  return data;
};

const getBlogPosts = async () => {
  const response = await fetchAPI<BlogPostDTO>('/blogposts', { populate: 'deep,3' });
  return parseStrapiResponseToData<BlogPostDTO>(response);
};

const getPlatforms = async () => {
  const platformsResponse = await fetchAPI<PlatformDTO[]>('/platforms', { populate: 'deep,3' });
  return parseStrapiResponseToData<PlatformDTO[]>(platformsResponse);
};

const getPlatformBySlug = async (slug: string) => {
  const blogPostResponse = await fetchAPI<BlogPostDTO>(`/platforms/${slug}`, {
    populate: 'deep,3',
  });
  return parseStrapiResponseToData<BlogPostDTO>(blogPostResponse);
};

const getBlogPostBySlug = async (slug: string) => {
  const blogPostsResponse = await fetchAPI<BlogPostDTO>(`/blogposts/${slug}`, {
    populate: 'deep,4',
  });
  return parseStrapiResponseToData<BlogPostDTO>(blogPostsResponse);
};

const getHomePage = async () => {
  const homePageResponse = await fetchAPI<HomePageDTO>(`/home-page`, { populate: 'deep,3' });
  return parseStrapiResponseToData<HomePageDTO>(homePageResponse) as HomePageDTO;
};

const getLayoutConfig = async () => {
  const response = await fetchAPI<LayoutConfigDTO>('/layout', {
    populate: 'deep,4',
  });

  return parseStrapiResponseToData(response);
};

export {
  fetchAPI,
  getBlogPosts,
  getBlogPostBySlug,
  getLayoutConfig,
  getHomePage,
  getPlatforms,
  getPlatformBySlug,
};
