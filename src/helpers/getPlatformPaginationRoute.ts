export const getPlatformPaginationRoute = (page: number) => `/platforms/${page === 1 ? '' : page}`;
