import { dotts, usePagination } from '@lingo-match/hooks/usePagination';
import { cn } from '@lingo-match/utlis/cn';
import Link from 'next/link';
import React from 'react';

export type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  pageCount: number;
  renderPageLink: (page: number) => string;
  totalItems: number;
};

const Pagination = ({
  currentPage,
  itemsPerPage,
  pageCount,
  renderPageLink,
  totalItems,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage);
  if (pageCount <= 1) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-center gap-1">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span className="rounded-full px-4 py-2 text-sm font-semibold text-black" key={i}>
            {pageNumber}
          </span>
        ) : (
          <Link
            className={cn(
              'justify-centerrounded-md flex h-4 w-4 items-center justify-center border text-sm font-semibold no-underline opacity-30 hover:opacity-100',
              pageNumber === currentPage && 'border-primary-500 text-primary-500 opacity-100',
            )}
            href={renderPageLink(pageNumber as number)}
            key={i}
          >
            {pageNumber}
          </Link>
        ),
      )}
    </div>
  );
};

export default Pagination;
