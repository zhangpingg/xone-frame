import { FC } from 'react';
import { Spin } from 'antd';
import styles from './index.module.less';

const Loading: FC = () => {
  return (
    <div className={styles['loading-wrap']}>
      <Spin size="large" />
    </div>
  );
};
export default Loading;
