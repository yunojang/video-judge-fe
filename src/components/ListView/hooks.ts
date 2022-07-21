import { useMemo, useState } from 'react';
import { useQueryParams, NumberParam } from 'use-query-params';

interface PagerProps {
  pageSize: number;
  resourceCount: number;
}

export const useListView = ({ pageSize, resourceCount }: PagerProps) => {
  const [query, setQuery] = useQueryParams({ page: NumberParam });
  const [pageIndex, setPageIndex] = useState(query.page ? query.page - 1 : 0);

  const setPage = (p: number) => {
    setQuery({ page: p + 1 });
    setPageIndex(p);
  };

  const gotoPage = (index: number) => {
    setPage(index);
  };

  const pageCount = useMemo(
    () => Math.ceil(resourceCount / pageSize),
    [pageSize, resourceCount],
  );

  const rowLength = useMemo(
    () => (pageCount - 1 !== pageIndex ? pageSize : resourceCount % pageSize),
    [pageCount, pageIndex, pageSize, resourceCount],
  );

  const canNextPage = useMemo(
    () => pageIndex < pageCount - 1,
    [pageCount, pageIndex],
  );

  const canPreviousPage = useMemo(() => pageIndex > 0, [pageIndex]);

  return {
    pageIndex,
    pageCount,
    gotoPage,
    rowLength,
    state: { canNextPage, canPreviousPage },
  };
};
