import { Checkbox } from 'antd';
import { XoNumber } from 'xone-design';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import styles from './index.module.less';

const MultipleNumberJoin = (props: any) => {
  const { list = [], setChildrenCalculate, Form } = props;
  const { formItemAttr: formItemAttr1, ...lastProps1 } = list?.[0];
  const { formItemAttr: formItemAttr2, ...lastProps2 } = list?.[1];
  const { formItemAttr: formItemAttr3, ...lastProps3 } = list?.[2];

  const calculateFn = (e: CheckboxChangeEvent) => {
    setChildrenCalculate?.(e.target?.checked);
  };

  return (
    <div className={styles['mnj-wrap']}>
      <div>
        <Form.Item {...formItemAttr1}>
          <XoNumber precision={2} {...lastProps1} />
        </Form.Item>
      </div>
      <span style={{ margin: '0 5px' }}>/</span>
      <div>
        <Form.Item {...formItemAttr2}>
          <XoNumber precision={3} {...lastProps2} />
        </Form.Item>
      </div>
      <div className={styles['mnj-wrap-checkbox']}>
        <Form.Item valuePropName="checked" {...formItemAttr3}>
          <Checkbox onChange={calculateFn} {...lastProps3}>
            联动
          </Checkbox>
        </Form.Item>
      </div>
    </div>
  );
};

export default MultipleNumberJoin;
