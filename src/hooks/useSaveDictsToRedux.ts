import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDictData } from '@/redux/reducers/actions/dictionary';

const useSaveDictsToRedux = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getDictData({ dispatch }); // 获取字典数据
  }, [dispatch]);
};

export default useSaveDictsToRedux;
