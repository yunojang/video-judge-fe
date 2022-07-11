import { css } from '@emotion/css';

const ErrorMsg = ({ msg }: { msg: string }) => {
  return <span className={style}>{msg}</span>;
};

export default ErrorMsg;

const style = css`
  color: #ee6666;
  font-size: 20px;
`;
