const mockRes = {
  code: 200,
  data: {
    pageIndex: 1,
    pageSize: 20,
    records: [
      {
        shortName: '简称1',
        stockCode: '证券代码1',
        quoteEndTime: 20230101,
        listingDate: 20230110,
        newStockIssueMode: '发行方式1',
        issuePrice: '100',
        market: 1,
        listBoard: 1,
        issueStatus: 1,
        id: null,
      },
      {
        shortName: '简称2',
        stockCode: '证券代码2',
        quoteEndTime: 20230102,
        listingDate: 20230111,
        newStockIssueMode: '发行方式2',
        issuePrice: '200',
        market: 2,
        listBoard: 2,
        issueStatus: 2,
        id: 0,
      },
      {
        shortName: '简称3',
        stockCode: '证券代码3',
        quoteEndTime: 20230103,
        listingDate: 20230113,
        newStockIssueMode: '发行方式3',
        issuePrice: '300',
        market: 5,
        listBoard: 3,
        issueStatus: 3,
        id: 0.6,
      },
    ],
    totalCount: 100,
  },
};

export { mockRes };
