import { Badge, Progress } from 'antd';
import { listBoardColor, issueStatusColor } from './color';
import { isNotNull } from '@/utils/tool';

// 渲染方式==================================================================================================
/** 渲染展示 keyLabel */
const getDrawKeyLabel = (props: any) => {
  const { dataIndex, width = 100 } = props;
  return {
    dataIndex,
    width,
    ellipsis: true,
    render: (text: string | number, record: any) => {
      return text ? <span>{record['market_label']}</span> : '--';
    },
  };
};
/** 渲染展示 keyLabel_textColor */
const getDrawKeyLabelAndTextColor = (props: any) => {
  const { dataIndex, width = 100, colorMap } = props;
  return {
    dataIndex,
    width,
    ellipsis: true,
    render: (text: string | number, record: any) => {
      return isNotNull(text) ? (
        <span style={{ color: colorMap[record[dataIndex]] }}>
          {record[`${dataIndex}_label`]}
        </span>
      ) : (
        '--'
      );
    },
  };
};
/** 渲染展示 keyLabel_badgeColor */
const getDrawKeyLabelAndBadgeColor = (props: any) => {
  const { dataIndex, width = 100, colorMap } = props;
  return {
    dataIndex,
    width,
    ellipsis: true,
    render: (text: string | number, record: any) => {
      return isNotNull(text) ? (
        <Badge
          text={record[`${dataIndex}_label`]}
          color={colorMap[record[dataIndex]]}
        />
      ) : (
        '--'
      );
    },
  };
};

// 业务==================================================================================================
/** 交易场所 */
const tradingMarketColItem = getDrawKeyLabel({
  dataIndex: 'market',
});
/** 上市板块 */
const listBoardColItem = getDrawKeyLabelAndTextColor({
  dataIndex: 'listBoard',
  colorMap: listBoardColor,
});
/** 发行状态 */
const issueStatusColItem = getDrawKeyLabelAndBadgeColor({
  dataIndex: 'issueStatus',
  colorMap: issueStatusColor,
});
// 序号->询价进度
const enquiryProgressColItem = {
  dataIndex: 'id',
  width: 150,
  ellipsis: true,
  render: (text: string | number) => {
    return isNotNull(text) ? (
      <Progress
        strokeColor="#CAA982"
        status="normal"
        format={() => Number(text) * 100 + '%'}
        percent={Number(text) * 100}
      />
    ) : (
      '--'
    );
  },
};

export {
  tradingMarketColItem,
  listBoardColItem,
  issueStatusColItem,
  enquiryProgressColItem,
};
