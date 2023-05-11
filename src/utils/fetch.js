import fetch from 'isomorphic-fetch';
import { message } from 'antd';

const BASE_URL = '';
// 内容类型
const ContentType = {
  JSON: 'application/json; charset=UTF-8',
  FORM: 'application/x-www-form-urlencoded; charset=UTF-8',
};

/** 检查返回内容的状态码 */
const checkStatus = (response, type) => {
  const { status } = response;
  if (status === 204) return response; // 服务器已成功处理了请求，但未返回任何内容
  if ([200, 201, 202].includes(status)) {
    if (type === 'file') {
      return response;
    }
    return response.json();
  }
  const pureResponse = response.json();
  if (type !== 'ignore') {
    if ([400, 500].includes(status)) {
      pureResponse.then((res) => {
        message.error(res.message || res.msg || '未知异常！');
      });
    } else {
      switch (status) {
        case 404:
          message.error('未找到远程服务器');
          break;
        case 401:
          message.error('会话信息缺失，请重新登录');
          setTimeout(() => {
            localStorage.clear();
            sessionStorage.clear();
            const { href } = window.location;
            window.tabs.jumpToLogin(href);
          }, 800);
          break;
        case 502:
          message.error('Bad Gateway');
          break;
        case 503:
          message.error('Service Unavailable');
          break;
        case 504:
          message.error('Gateway Timeout');
          break;
        default:
          message.error('服务器异常');
          break;
      }
    }
  }
  return Promise.reject(pureResponse);
};

/** 接口返回的内容统一处理 */
const handleError = (promise) =>
  promise
    .then((response) => checkStatus(response))
    .catch((err) => Promise.reject(err));

/** 获取接口url */
const getUrl = (url) => {
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${BASE_URL}${url}`;
};

/** 获取请求头 */
const getRequestHeaders = () => {
  return {
    Accept: ContentType.JSON, // 客户端支持的数据类型
    'Content-Type': ContentType.JSON, // 客户端发送的数据类型
    Token: localStorage.getItem('user_token'),
  };
};

/** GET请求
 * @param url
 * @param params
 * @param headers
 * @returns Promise<any>
 */
function get(url, params, headers = getRequestHeaders(), signal) {
  let requestUrl;
  if (params) {
    const paramsString = Object.keys(params)
      .map((key) => `${key}=${params[key] || ''}`)
      .join('&');
    const joiner = url.search(/\?/) === -1 ? '?' : '&';
    requestUrl = `${url}${joiner}${paramsString}`;
  } else {
    requestUrl = url;
  }
  const promise = fetch(getUrl(requestUrl), {
    method: 'GET',
    headers,
    signal,
  });
  return handleError(promise);
}

/** * POST 请求
 * @param url
 * @param params
 * @param headers
 * @returns Promise<any>
 * */
function post(url, params, headers = getRequestHeaders()) {
  const promise = fetch(getUrl(url), {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(params),
  });
  return handleError(promise);
}

/** * POST 请求(不处理restful的status code = 500错误，直接返回)
 * @param url
 * @param params
 * @param headers
 * @returns Promise<any>
 * */
function postIgnore(url, params, headers = getRequestHeaders()) {
  const promise = fetch(getUrl(url), {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(params),
  });
  return handleError(promise);
}

/** * POST form 请求
 * @param url
 * @param params
 * @param headers
 * @returns Promise<any>
 * */
function postForm(url, params, headers = getRequestHeaders()) {
  const promise = fetch(getUrl(url), {
    method: 'POST',
    headers: {
      Token: headers.Token,
    },
    mode: 'cors',
    body: params,
  });
  return handleError(promise);
}

/** * POST 请求文件
 * @param url
 * @param params
 * @param headers
 * @returns Promise<any>
 * */
function postFile(url, params, headers = getRequestHeaders()) {
  const promise = fetch(getUrl(url), {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(params),
  });
  return handleError(promise, 'file');
}
/** * delete 请求文件
 * @param url
 * @param headers
 * @returns Promise<any>
 * */
function Delete(url, params, headers = getRequestHeaders()) {
  let requestUrl;
  if (params) {
    const paramsString = Object.keys(params)
      .map((key) => `${key}=${params[key] || ''}`)
      .join('&');
    const joiner = url.search(/\?/) === -1 ? '?' : '&';
    requestUrl = `${url}${joiner}${paramsString}`;
  } else {
    requestUrl = url;
  }
  const promise = fetch(getUrl(requestUrl), {
    method: 'delete',
    headers,
  });
  return handleError(promise);
}
/** GET 请求文件
 * @param url: string
 * @param params
 * @param headers
 * @returns Promise<any>
 */
function getDownFiles(url, params, headers = getRequestHeaders()) {
  let requestUrl;
  if (params) {
    const paramsString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const joiner = url.search(/\?/) === -1 ? '?' : '&';
    requestUrl = `${url}${joiner}${paramsString}`;
  } else {
    requestUrl = url;
  }
  const promise = fetch(getUrl(requestUrl), {
    method: 'GET',
    headers,
  });
  return handleError(promise, 'file');
}

/** * POST 请求文件
 * @param url
 * @param params
 * @param headers
 * @returns Promise<any>
 * */
function postDownFile(url, params, headers = getRequestHeaders()) {
  const promise = fetch(getUrl(url), {
    method: 'POST',
    headers,
    mode: 'cors',
    body: JSON.stringify(params),
  });
  return handleError(promise, 'file');
}

export {
  get,
  post,
  postForm,
  postFile,
  getRequestHeaders,
  postIgnore,
  Delete,
  getDownFiles,
  postDownFile,
};
