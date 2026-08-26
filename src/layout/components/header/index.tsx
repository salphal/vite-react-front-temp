import LanguageSwitcher from '@src/components/language-switcher';
import ThemeSwitcher from '@src/components/theme-switcher';
import useDeviceType from '@src/hook/useDeviceType';
import LayoutAsideMenu from '@src/layout/components/aside-menu';
import HeaderLogo from '@src/layout/components/header/components/logo.tsx';
import HeaderSearch from '@src/layout/components/header/components/search.tsx';
import { setLocale } from '@src/store/language';
import { setThemeStore } from '@src/store/theme';
import i18n from 'i18next';
import React, { ReactNode, Ref, useState } from 'react';

import { MenuOutlined } from '@ant-design/icons';
import { Layout as AntdLayout, Button, Drawer } from 'antd';

import classNames from 'classnames';

const { Header } = AntdLayout;

export interface LayoutHeaderProps {
  children?: ReactNode;
}

export type LayoutHeaderRef = object;

const LayoutHeader: React.ForwardRefRenderFunction<LayoutHeaderRef, LayoutHeaderProps> = (
  props: LayoutHeaderProps,
  ref: Ref<LayoutHeaderRef | HTMLDivElement>,
) => {
  const { isMobile, isPad, isPc } = useDeviceType();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useImperativeHandle(ref, () => ({}));

  const themeOnChange = (mode: string) => {
    setThemeStore({ mode });
  };

  const languageOnChange = (lang: string) => {
    console.log(22222, lang);
    i18n.changeLanguage(lang);
    setLocale(lang);
  };

  return (
    <Header className={classNames([['layout-header']])}>
      <Row justify={'space-between'} align={'middle'} wrap={isMobile || isPad}>
        {isPc && (
          <>
            <Col span={14}>
              <Flex justify={'start'} align={'center'} wrap={false}>
                <HeaderLogo />
                <HeaderSearch />
              </Flex>
            </Col>
            <Col span={10}>
              <Flex justify={'end'} align={'center'} wrap={false}>
                <Space align={'center'} split={<Divider type="vertical" />}>
                  <ThemeSwitcher onChange={themeOnChange} />
                  <LanguageSwitcher onChange={languageOnChange} />
                </Space>
              </Flex>
            </Col>
          </>
        )}
        {isMobile && (
          <Col span={24} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Flex align={'center'}>
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerOpen(true)}
                style={{ fontSize: 18 }}
              />
              <HeaderLogo />
            </Flex>
            <Flex justify={'end'} align={'middle'}>
              <Space>
                <ThemeSwitcher onChange={themeOnChange} />
                <LanguageSwitcher onChange={languageOnChange} />
              </Space>
            </Flex>
          </Col>
        )}
      </Row>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={240}
        styles={{ body: { padding: 0 } }}
      >
        <LayoutAsideMenu />
      </Drawer>
    </Header>
  );
};

export default React.forwardRef(LayoutHeader);
