import useDeviceType from '@src/hook/useDeviceType';
import LayoutHeader from '@src/layout/components/header';
import React from 'react';

import { Layout } from 'antd';

import styles from './index.module.scss';

import '@ant-design/colors';

import LayoutAsideMenu from '@src/layout/components/aside-menu';

export interface LayoutProps {
  children?: React.ReactNode;
}

const LayoutPlus: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children } = props;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { isMobile, isPad, isPc } = useDeviceType();

  const [collapsed, setCollapsed] = useState(false);

  const collapsedOnChange = (collapsed: boolean) => {};

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerPadding: '0 24px',
          },
        },
      }}
    >
      <Layout className={styles['layout-plus']} hasSider={isMobile}>
        <LayoutHeader />
        <Layout className={styles['layout-plus__content']}>
          <Layout>
            {(isPc || isPad) && (
              <Layout.Sider>
                <LayoutAsideMenu />
              </Layout.Sider>
            )}
            <Layout.Content>
              <Layout.Content style={{ margin: '24px 16px 0' }}>
                <div
                  style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  <Suspense fallback={<Spin size={'large'} />}>{children}</Suspense>
                </div>
              </Layout.Content>
              <Layout.Footer className={styles['layout-plus__footer']}>Footer</Layout.Footer>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default React.memo(LayoutPlus);
