/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { css } from '@emotion/css';

import { ListType } from 'src/model/types';
import { useFetchList } from 'src/hooks/list';
import { useListView } from './hooks';

import { Col, Row, useTheme } from '@wizrnd/nx-ui';
import Loading from '../Loading';
import ErrorMsg from '../ErrorMsg';
import { getGridSize } from './utils';
import Pagination from '../Pagination';

interface ListViewProps {
  resource: string;
  pageSize: number;
  fallback?: React.ReactNode;
}

const COLUMN_MAX_WIDTH = 12;
const ListView = <T extends ListType = any>({
  resource,
  columns,
  row,
  pageSize,
  fallback = <Loading />,
}: ListViewProps & {
  columns: {
    Cell: (obj: T) => React.ReactElement;
    header: string;
    size: number;
  }[];
  row: {
    Container: (children: React.ReactChild, obj: T) => React.ReactElement;
  };
}) => {
  const { collection, resourceCount, loading, error } =
    useFetchList<T>(resource);

  const {
    gotoPage,
    pageIndex,
    pageCount,
    rowLength,
    state: { canNextPage, canPreviousPage },
  } = useListView({
    resourceCount,
    pageSize,
  });

  const theme = useTheme();

  return error ? (
    <ErrorMsg error={error} />
  ) : (
    <div className={style}>
      <header style={{ marginBottom: '1em' }}>
        <Row
          spacing={{ col: 2 }}
          wrapper={COLUMN_MAX_WIDTH}
          className={css`
            color: ${theme.palette.primary.main};
          `}
        >
          {columns.map((c, i) => (
            <Col key={i} span={getGridSize(c.size, COLUMN_MAX_WIDTH)}>
              {c.header}
            </Col>
          ))}
        </Row>
      </header>

      {loading || !collection ? (
        fallback
      ) : !resourceCount ? (
        <div>Empty Collection</div>
      ) : (
        collection
          .filter((_, i) => Math.floor(i / pageSize) === pageIndex)
          .map(item =>
            row.Container(
              <Row spacing={{ col: 2 }} wrapper={COLUMN_MAX_WIDTH}>
                {columns.map((col, i) => (
                  <Col key={i} span={getGridSize(col.size, COLUMN_MAX_WIDTH)}>
                    {col.Cell(item)}
                  </Col>
                ))}
              </Row>,
              item,
            ),
          )
      )}

      {resourceCount > 0 && (
        <div className="pagination-container">
          <Pagination
            currentPage={pageIndex + 1}
            totalPage={pageCount}
            onChange={p => gotoPage(p - 1)}
            canNextPage={canNextPage}
            canPreviousPage={canPreviousPage}
          />
          <div className="row-count-container">
            {!loading &&
              `${pageSize * pageIndex + (rowLength && 1)}-${
                pageSize * pageIndex + rowLength
              } of ${resourceCount}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListView;

const style = css`
  .pagination-container {
    text-align: center;
    padding: 1.6em 0;
  }

  .row-count-container {
    margin: 1em 0;
  }
`;
