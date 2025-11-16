import 'rc-notification/assets/index.css';

import * as React from 'react';
import classNames from 'classnames';

import type { IconType } from './interface';

import './index.scss';

const prefixCls = 'workspace-notification';

export const TypeIcon = {
  info: () => <span>ℹ️</span>,
  success: () => <span>✅</span>,
  error: () => <span>❌</span>,
  warning: () => <span>⚠️</span>,
};

export interface PurePanelProps {
  icon?: React.ReactNode;
  message?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  type?: IconType;
  duration?: number;

  /** useNotification 传进来的 key，用于关闭 */
  noticeKey: React.Key;

  /** 必须回传 key */
  onClose?: (key: React.Key) => void;

  /** 默认显示关闭按钮 */
  closable?: boolean;
}

const PurePanel: React.FC<PurePanelProps> = (props) => {
  const {
    icon,
    type,
    message,
    description,
    actions,
    onClose,
    noticeKey,
    duration = 3000,
    closable = true,
  } = props;

  /** 自动关闭 */
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.(noticeKey);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, noticeKey]);

  /** 图标渲染 */
  let iconNode: React.ReactNode = null;

  if (icon) {
    iconNode = <span className={`${prefixCls}-icon`}>{icon}</span>;
  } else if (type) {
    const IconRender = TypeIcon[type];
    iconNode = (
      <span className={`${prefixCls}-icon ${prefixCls}-icon-${type}`}>
        <IconRender />
      </span>
    );
  }

  const handleOnClose = () => {
    onClose?.(noticeKey);
  };

  return (
    <div className={classNames(`${prefixCls}`)}>
      <div className={classNames(`${prefixCls}__header`)}>
        <div className={classNames(`${prefixCls}__title`)}>
          {iconNode && <span className={`${prefixCls}__icon-status`}> {iconNode}</span>}
          {message && <span className={`${prefixCls}__message`}>{message}</span>}
        </div>
        {closable && (
          <button type="button" className={`${prefixCls}__icon-close`} onClick={handleOnClose}>
            X
          </button>
        )}
      </div>
      <div className={`${prefixCls}__content`}>
        {description && <div className={`${prefixCls}__description`}>{description}</div>}
      </div>
      {actions && <div className={`${prefixCls}__footer`}>{actions}</div>}
    </div>
  );
};

export default PurePanel;
