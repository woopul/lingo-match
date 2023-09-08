import { HOME_PAGE } from '@lingo-match/constants/routes';

export const getHomeRoute = (path: string | undefined): string =>
  path && path !== '/' ? path : HOME_PAGE;
