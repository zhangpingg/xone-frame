import React from 'react';
import { Button } from 'antd';
import { useSetInterval } from '@/hooks';

const Index = () => {
  const fn1 = () => {
    console.log('定时刷新列表');
  };
  const { startInterval, stopInterval, clearIntervalRef } = useSetInterval({
    callback: fn1,
    delay: 2000,
  });

  const fn2 = () => {
    startInterval();
  };
  const fn3 = () => {
    stopInterval();
  };
  const fn4 = () => {
    clearIntervalRef();
  };

  return (
    <div>
      <Button onClick={fn2}>定时刷新列表</Button>
      <Button onClick={fn3}>暂时刷新列表</Button>
      <Button onClick={fn4}>清空定时器</Button>
    </div>
  );
};

export default Index;
