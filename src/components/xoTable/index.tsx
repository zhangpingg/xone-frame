import { memo, forwardRef } from 'react';
import { XoTableJy } from 'xone-design';
import { commonConfig, columnsConfig, getTableCols } from '@/utils/tableConfig';

const XoTable = forwardRef((props: any, ref: any) => {
  const { colsByInterfaceConfig, ...rest } = props;

  return (
    <XoTableJy
      ref={ref}
      commonConfig={commonConfig}
      columnsConfig={columnsConfig}
      colsByInterfaceConfig={{
        getTableCols,
        ...colsByInterfaceConfig,
      }}
      {...rest}
    />
  );
});

export default memo(XoTable);
