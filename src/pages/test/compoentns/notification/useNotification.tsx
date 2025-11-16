import * as React from 'react';
import { useNotification as useRcNotification } from 'rc-notification';

import type { ArgsProps, HookNotifyApi, StaticFn } from './interface';
import PurePanel from './PurePanel.tsx';

let seed = 0;

export default function useNotification(
  options: { maxCount?: number } = {},
): [HookNotifyApi, React.ReactElement | null] {
  const maxCount = options.maxCount ?? 5;

  const [rcApi, holder] = useRcNotification();
  const keysRef = React.useRef<React.Key[]>([]);

  const open: StaticFn = (config: ArgsProps) => {
    const key = `notice_${Date.now()}_${seed++}`;

    /** FIFO：超出数量时删除最早的通知 */
    if (keysRef.current.length >= maxCount) {
      const firstKey = keysRef.current.shift();
      if (firstKey !== undefined) {
        rcApi.close(firstKey);
      }
    }

    keysRef.current.push(key);

    rcApi.open({
      key,
      content: (
        <PurePanel
          {...config}
          noticeKey={key}
          onClose={(k) => {
            rcApi.close(k);
            keysRef.current = keysRef.current.filter((item) => item !== k);
            config.onClose?.(k);
          }}
        />
      ),
      duration: config.duration === 0 ? null : (config.duration ?? 3),

      /** 自动关闭时 */
      onClose: () => {
        keysRef.current = keysRef.current.filter((item) => item !== key);
        config.onClose?.(key);
      },
    });
  };

  const destroy = (key?: React.Key) => {
    if (key) {
      rcApi.close(key);
      keysRef.current = keysRef.current.filter((k) => k !== key);
    } else {
      rcApi.destroy();
      keysRef.current = [];
    }
  };

  return [
    {
      open,
      destroy,
      success: (c) => open({ ...c, type: 'success' }),
      info: (c) => open({ ...c, type: 'info' }),
      warning: (c) => open({ ...c, type: 'warning' }),
      error: (c) => open({ ...c, type: 'error' }),
    },
    holder,
  ];
}
