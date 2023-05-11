import React, { memo, useMemo } from 'react';
import { XoAuthButton } from 'xone-design';
import type { XoAuthButtonProps } from 'xone-design';

interface IPAuthButton {
  hasAuth?: Boolean;
}

type T = XoAuthButtonProps & IPAuthButton;

const AuthButton: React.FC<T> = (props) => {
  const { buttonVisible } = window.$webConfig;
  const { hasAuth = true, ...restProps } = props;

  /** 权限集合 */
  // const auths = window.authority.getAuthOld();
  const auths = {
    查询: 1,
    重置: 1,
    编辑: 1,
    删除: 1,
  };
  /** 是否开启按钮权限 */
  const hasAuthority = useMemo(() => {
    if (!hasAuth) {
      return false;
    }
    return buttonVisible;
  }, [buttonVisible, hasAuth]);

  return (
    <XoAuthButton auths={auths} hasAuthority={hasAuthority} {...restProps} />
  );
};

export default memo(AuthButton);
