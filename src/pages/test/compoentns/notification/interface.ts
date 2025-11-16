import * as React from 'react';

export type IconType = 'success' | 'info' | 'error' | 'warning';

export interface ArgsProps {
  message: React.ReactNode;
  description?: React.ReactNode;
  type?: IconType;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  duration?: number;
  onClose?: (key: React.Key) => void;
}

export type StaticFn = (config: ArgsProps) => void;

export interface NoticeMethods {
  success: StaticFn;
  info: StaticFn;
  warning: StaticFn;
  error: StaticFn;
}

export interface HookNotifyApi extends NoticeMethods {
  open: StaticFn;
  destroy: (key?: React.Key) => void;
}
