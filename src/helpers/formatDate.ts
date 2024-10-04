/* eslint-disable sort-keys */

// localeMatcher?: "best fit" | "lookup" | undefined;
// weekday?: "long" | "short" | "narrow" | undefined;
// era?: "long" | "short" | "narrow" | undefined;
// year?: "numeric" | "2-digit" | undefined;
// month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined;
// day?: "numeric" | "2-digit" | undefined;
// hour?: "numeric" | "2-digit" | undefined;
// minute?: "numeric" | "2-digit" | undefined;
// second?: "numeric" | "2-digit" | undefined;
// timeZoneName?: "short" | "long" | "shortOffset" | "longOffset" | "shortGeneric" | "longGeneric" | undefined;
// formatMatcher?: "best fit" | "basic" | undefined;
// hour12?: boolean | undefined;
// timeZone?: string | undefined;
//
const defaultOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

const defaultLanguage = 'pl-PL';

export const formatDate = (
  dateString?: string,
  options: Intl.DateTimeFormatOptions = defaultOptions,
) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);

  return date.toLocaleString(defaultLanguage, options);
};
