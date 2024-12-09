import { HOME_PAGE_ROUTE } from '@lingo-match/constants/routes';

/**
 * Gets default home page route as /platforms.
 */
export const getHomeRoute = (path: string | undefined): string =>
  path && path !== '/' ? path : HOME_PAGE_ROUTE;
