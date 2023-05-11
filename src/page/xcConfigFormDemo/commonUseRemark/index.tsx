import { useCallback, useMemo } from 'react';
import { XoTextArea } from 'xone-design';
import {
  addCommonWord,
  deleteCommonWord,
  modifyCommonWord,
  getCommonWords,
} from '@/api/index.js';

const CommonUseRemark = (props: any) => {
  const { busiVar, Form, list = [] } = props;
  const { formItemAttr: formItemAttr1, ...lastProps1 } = list?.[0];

  /** 用户Id */
  const userId = useMemo(() => Number(localStorage.getItem('userId')), []);

  // 备注-增
  const handleCreate = useCallback(({ text }) => {
    return addCommonWord({
      userId,
      memoCont: text,
      busiVar: busiVar,
    });
  }, []);
  // 备注-删
  const handleDelete = useCallback((id) => {
    return deleteCommonWord(id);
  }, []);
  // 备注-改
  const handleModify = useCallback(({ text, memoId }) => {
    return modifyCommonWord({
      memoCont: text,
      memoId,
    });
  }, []);
  // 备注-查
  const handleGet = useCallback(() => {
    return getCommonWords({
      userId,
      busiVar: busiVar,
    });
  }, []);

  return (
    <>
      <Form.Item {...formItemAttr1}>
        <XoTextArea.XoMemoryTextArea
          mode="memory"
          commonWords={{
            addFn: handleCreate,
            deleteFn: handleDelete,
            updateFn: handleModify,
            getListFn: handleGet,
          }}
          {...lastProps1}
        />
      </Form.Item>
    </>
  );
};

export default CommonUseRemark;
