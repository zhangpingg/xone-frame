import { message } from 'antd';
import { fileDownloadApi } from '@/apiUrl/index.js';

/** 下载文件（规范） */
const downLoadFc = (res: any, messageText = '文件导出成功') => {
  const disposition = res.headers.get('content-disposition');
  if (disposition && disposition.match(/attachment;/)) {
    const filename = disposition
      .replace(/attachment;.*filename=/, '')
      .replace(/"/g, '');
    res.blob().then((data: any) => {
      const blobUrl = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.download = decodeURIComponent(filename);
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      });
    });
    message.success(messageText);
  } else {
    message.warning('获取不到文件');
  }
};

/** 下载文件-处理文件 */
const handleFileDownload = (res: any) => {
  const disposition = res.headers.get('content-disposition');
  if (disposition && disposition.match(/attachment;/)) {
    const filename = decodeURIComponent(
      disposition
        .replace(/attachment;.*filename=/, '')
        .replace(/"/g, '')
        .replace(/\+/g, '%20'),
    );
    res.blob().then((data: any) => {
      const blobUrl = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.download = filename;
      a.href = blobUrl;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
      });
    });
  } else {
    message.warning('获取不到下载文件');
  }
};
/** 下载文件-调接口 */
const downloadFile = (item: any) => {
  const { name, uri } = item;
  const [fileGroup] = uri.split('/');
  const reg = new RegExp(`^${fileGroup}/`, 'g');
  const fileName = encodeURIComponent(name); // 对文件名转码
  fileDownloadApi({
    fileName,
    group: fileGroup,
    path: encodeURIComponent(uri.replace(reg, '')),
  })
    .then((res: any) => {
      handleFileDownload(res);
    })
    .catch(() => {
      message.error('获取不到下载文件');
    });
};

export { downLoadFc, downloadFile };
