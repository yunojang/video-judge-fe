import { css, cx } from '@emotion/css';
import { IThemeCommon, useTheme } from '@wizrnd/nx-ui';
import React from 'react';

interface PaginatinoProps {
  totalPage: number;
  currentPage: number;
  onChange: (p: number) => void;
  canNextPage: boolean;
  canPreviousPage: boolean;
}

const Pagination = ({
  currentPage,
  totalPage,
  onChange,
  canNextPage,
  canPreviousPage,
}: PaginatinoProps) => {
  const goNext = () => {
    if (canNextPage) {
      onChange(currentPage + 1);
    }
  };

  const goPrevious = () => {
    if (canPreviousPage) {
      onChange(currentPage - 1);
    }
  };

  const makePageList = () => {
    const pageList: React.ReactElement[] = [];

    for (let i = 1; i <= totalPage; i++) {
      const selected = currentPage === i ? 'selected' : '';

      pageList.push(
        <div
          className={cx(selected, 'page-item')}
          key={i}
          onClick={() => onChange(i)}
        >
          {i}
        </div>,
      );
    }
    return pageList;
  };

  return (
    <div className={style(useTheme())}>
      <div className="page-list">
        <div
          className={cx('page-item', !canPreviousPage && 'disabled')}
          onClick={goPrevious}
        >
          «
        </div>
        {makePageList()}
        <div
          className={cx('page-item', !canNextPage && 'disabled')}
          onClick={goNext}
        >
          »
        </div>
      </div>
    </div>
  );
};

export default Pagination;

const style = (theme: IThemeCommon) => css`
  .page-list {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 0 2em;
  }

  .page-item {
    cursor: pointer;
    padding: 9px 14px;
    border-radius: 8px;
    background-color: #fff;
    font-weight: bold;
  }
  .page-item:hover {
    background: ${theme.palette.action.hover};
  }
  .page-item.selected {
    background-color: ${theme.palette.primary.main};
    color: #fff;
  }
  .page-item.disabled {
    opacity: 0.3;
    cursor: default;
  }
`;
