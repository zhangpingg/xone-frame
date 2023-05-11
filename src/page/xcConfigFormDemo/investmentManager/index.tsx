import React, {
  FC,
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { XoSelect, XoNumber, XoForm, XoNums } from 'xone-design';
import { getUserInfoList } from '@/api/index.js';
import { getRoleName } from '@/utils/systemConfig.js';
import cn from 'classnames';
import { IObject } from '@/common/interface';
import styles from './index.module.less';

const { InvestmentManagerSelect } = XoSelect as any;
const { minus } = XoNums;

interface InvestmentManagerProps {
  value?: any;
  id?: string;
  disabled?: boolean;
  listLength?: number;
  ref?: any;
}

const InvestmentManager: FC<InvestmentManagerProps> = forwardRef(
  (props, ref) => {
    const { id: formItemKey, value, disabled, listLength } = props;
    const form = XoForm.useFormInstance(); // 获取form实例
    const allMoney = XoForm.useWatch('a1', form) || 0;

    const [rowIds, setRowIds] = useState<number[]>([]); // 数组下标

    /** 剩余可分配金额 */
    const surplusMoney = useMemo(() => {
      const entryMoney = value
        .filter((item: IObject) => item?.money)
        .map((item: IObject) => Number(item.money))
        .reduce((prev: number, curr: number) => prev + curr, 0);
      return minus(allMoney, entryMoney);
    }, [allMoney, value]);
    /** 添加新行 */
    const addRow = useCallback(() => {
      setRowIds((prev) => [...prev, prev[prev.length - 1] + 1]);
    }, []);
    /** 删除当前行 */
    const deleteRow = useCallback(
      (index: number) => {
        const newValue: IObject[] = [];
        value?.map((item: IObject, i: number) => {
          if (i !== index) {
            newValue.push(item);
          }
        });
        form.setFieldValue(formItemKey!, newValue);
        setRowIds((prev) => prev.slice(0, prev.length - 1));
      },
      [value],
    );
    /** 获取加减符号 */
    const getOperateIconNode = useCallback(
      (index: number) => {
        const iconDisabledFlag = disabled || (listLength && index < listLength);
        return (
          <>
            {rowIds.length > 1 && (
              <MinusCircleOutlined
                className={cn({
                  [styles['im-wrap-operate-icon']]: true,
                  [styles['im-wrap-operate-iconDisabled']]: iconDisabledFlag,
                })}
                onClick={() => {
                  if (iconDisabledFlag) return;
                  deleteRow(index);
                }}
              />
            )}
            {rowIds.length - 1 === index && (
              <PlusCircleOutlined
                className={cn({
                  [styles['im-wrap-operate-icon']]: true,
                })}
                onClick={addRow}
              />
            )}
          </>
        );
      },
      [rowIds, addRow, deleteRow, disabled, listLength],
    );
    /** 获取剩余可分配金额 */
    const getSurplusMoneyNode = useCallback(
      (index: number) => {
        return (
          rowIds.length - 1 === index && (
            <div
              className={cn({
                df: true,
                [styles['im-wrap-describe']]: true,
              })}
            >
              剩余可分配
              <span className={styles['im-wrap-describe-num']}>
                {surplusMoney}
              </span>
              万元
            </div>
          )
        );
      },
      [rowIds, surplusMoney],
    );

    /** 向父级暴露值 */
    useImperativeHandle(ref, () => ({
      surplusMoney,
    }));

    useEffect(() => {
      const list = value.map((item: IObject, i: number) => i);
      setRowIds(list);
    }, [value]);

    return (
      <div className={`cw ${styles['im-wrap']}`}>
        {rowIds?.map((item: number, index: number) => (
          <div
            key={index}
            className={`df w100 ${rowIds.length - 1 !== index && 'mb10'}`}
          >
            <div className="df">
              <div className={`df ${styles['im-wrap-flex1']}`}>
                <XoForm.Item
                  name={[formItemKey!, index, 'investmentManagerId']}
                  rules={[{ required: true, message: '请选择投资经理' }]}
                  preserve={false}
                  className={cn({
                    [styles['im-wrap-flex1']]: true,
                    [styles['im-wrap-investmentManager']]: true,
                  })}
                >
                  <InvestmentManagerSelect
                    disabled={disabled || (listLength && index < listLength)}
                    queryFn={getUserInfoList}
                    extraPayLoads={{
                      roleName: getRoleName(),
                    }}
                  />
                </XoForm.Item>
                <span style={{ width: '8px' }}></span>
                <XoForm.Item
                  name={[formItemKey!, index, 'money']}
                  rules={[{ required: true, message: '请输入投资金额' }]}
                  preserve={false}
                  className={styles['im-wrap-flex1']}
                >
                  <XoNumber unit="万元" />
                </XoForm.Item>
              </div>
              <div className={styles['im-wrap-operate']}>
                {getOperateIconNode(index)}
              </div>
            </div>
            {getSurplusMoneyNode(index)}
          </div>
        ))}
      </div>
    );
  },
);

export default memo(InvestmentManager);
