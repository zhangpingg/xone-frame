import { useSaveDictsToRedux } from '@/hooks';

const LayoutWrap: React.FC = ({ children }) => {
  useSaveDictsToRedux(); // 初始化获取字典

  return <>{children}</>;
};

export default LayoutWrap;
