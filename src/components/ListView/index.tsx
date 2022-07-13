/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { ListType } from 'src/model/types';
import { useFetchList } from 'src/views/hooks';

import { Col, Row, useTheme } from '@wizrnd/nx-ui';
import Loading from '../Loading';
import ErrorMsg from '../ErrorMsg';
import { css } from '@emotion/css';
import { getSize } from './grid';

interface ListViewProps {
  resource: string;
  fallback?: React.ReactNode;
}

const MAX_SIZE = 12;
const ListView = <T extends ListType = any>({
  resource,
  columns,
  row,
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
  const { collection, loading, error } = useFetchList<T>(resource);
  const theme = useTheme();

  return error ? (
    <ErrorMsg msg={error} />
  ) : (
    <>
      <header style={{ marginBottom: '1em' }}>
        <Row
          spacing={{ col: 2 }}
          wrapper={MAX_SIZE}
          className={css`
            /* text-align: center; */
            color: ${theme.palette.primary.main};
          `}
        >
          {columns.map((c, i) => (
            <Col key={i} span={getSize(c.size, MAX_SIZE)}>
              {c.header}
            </Col>
          ))}
        </Row>
      </header>

      {loading || !collection
        ? fallback
        : collection.map(item =>
            row.Container(
              <Row spacing={{ col: 2 }} wrapper={MAX_SIZE}>
                {columns.map((col, i) => (
                  <Col key={i} span={getSize(col.size, MAX_SIZE)}>
                    {col.Cell(item)}
                  </Col>
                ))}
              </Row>,
              item,
            ),
          )}
    </>
  );
};

export default ListView;
