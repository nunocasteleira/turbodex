import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Button, buttonClassName } from "../button";
import { usePagination, DOTS } from "./usePagination";

export type PaginationProps = {
  count: number;
  currentPage: number;
  first: number;
  last: number;
  siblingCount?: number;
  size: number;
  className?: string;
  onNextPage: string | (() => void);
  onPage: ((page: number) => string) | ((page: number) => void);
  onPreviousPage: string | (() => void);
};

const Pagination: React.FC<PaginationProps> = ({
  count,
  currentPage,
  first,
  last,
  onNextPage,
  onPage,
  onPreviousPage,
  className,
  size,
  siblingCount = 1,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount: count,
    siblingCount,
    pageSize: size,
  });

  function hasPreviousPage() {
    return currentPage !== first;
  }

  function hasNextPage() {
    return currentPage !== last;
  }

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  return (
    <div
      className={clsx(
        "mx-auto flex items-center justify-center border-t border-slate-200 px-4 py-3 sm:px-6 ",
        className
      )}
    >
      <div className="flex flex-1 justify-around sm:hidden">
        <Actionable
          action={hasPreviousPage() ? onPreviousPage : undefined}
          className="rounded-md"
        >
          Previous
        </Actionable>
        <Actionable
          action={hasNextPage() ? onNextPage : undefined}
          className="rounded-md"
        >
          Next
        </Actionable>
      </div>
      <div className="hidden sm:flex sm:w-full sm:items-center sm:justify-between">
        {size > 1 ? (
          <div className="w-full">
            <p className="text-sm">
              Showing <span className="font-medium">{first}</span> to{" "}
              <span className="font-medium">{last}</span> of{" "}
              <span className="font-medium">{count}</span> results
            </p>
          </div>
        ) : null}
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <Actionable
            action={hasPreviousPage() ? onPreviousPage : undefined}
            className="rounded-none rounded-l-md"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </Actionable>
          {paginationRange?.map((pageNumber) => {
            if (pageNumber === DOTS) {
              return (
                <Button as="span" key={pageNumber} className="rounded-none">
                  &#8230;
                </Button>
              );
            }
            if (typeof pageNumber === "string") {
              return;
            }
            const onPageString = onPage(pageNumber - 1);
            return (
              <Actionable
                key={pageNumber}
                action={
                  typeof onPageString === "string"
                    ? onPageString
                    : () => onPage(pageNumber - 1)
                }
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className={clsx(
                  pageNumber === currentPage &&
                    "z-10 border-red-500 bg-red-50 text-red-600",
                  "rounded-none"
                )}
              >
                {pageNumber}
              </Actionable>
            );
          })}
          <Actionable
            action={hasNextPage() ? onNextPage : undefined}
            className="rounded-none rounded-r-md"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </Actionable>
        </nav>
      </div>
    </div>
  );
};
type ActionableProps = {
  children: React.ReactNode;
  className?: string;
  action: string | (() => void) | undefined;
};

function Actionable({ className, children, action }: ActionableProps) {
  if (typeof action === "string") {
    return (
      <Link href={action} className={clsx(buttonClassName, className)}>
        {children}
      </Link>
    );
  }
  if (typeof action === "function") {
    return (
      <Button onClick={action} className={clsx(buttonClassName, className)}>
        {children}
      </Button>
    );
  }
  return (
    <Button
      disabled
      className={clsx(buttonClassName, "text-slate-300", className)}
    >
      {children}
    </Button>
  );
}

export { Pagination };
