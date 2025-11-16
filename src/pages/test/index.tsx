import React from 'react';
import { Button } from 'antd';

import './index.scss';

import { useNotification } from './compoentns/notification';

const Test = () => {
  const [api, holder] = useNotification();
  const countRef = useRef(0);

  return (
    <div className={'test-wrap'}>
      {holder}

      <Button
        onClick={() => {
          countRef.current = countRef.current + 1;
          api.open({
            message: `第 ${countRef.current} 条消息`,
            description: ' 默认 3 秒关闭',
          });
        }}
      >
        默认 3 秒关闭
      </Button>
      <br />
      <Button
        onClick={() => {
          countRef.current = countRef.current + 1;
          api.success({
            message: `第 ${countRef.current} 条消息`,
            description: '不会自动关闭',
            duration: 0,
          });
        }}
      >
        成功消息，不会自动关闭
      </Button>
      <br />
      <Button
        onClick={() => {
          countRef.current = countRef.current + 1;
          api.warning({
            message: `第 ${countRef.current} 条消息`,
            description: '不会自动关闭',
            duration: 0,
          });
        }}
      >
        警告消息，不会自动关闭
      </Button>
      <br />
      <Button
        onClick={() => {
          countRef.current = countRef.current + 1;
          api.error({
            message: `第 ${countRef.current} 条消息`,
            description: '不会自动关闭',
            duration: 0,
          });
        }}
      >
        失败消息，不会自动关闭
      </Button>
    </div>
  );
};

export default Test;
