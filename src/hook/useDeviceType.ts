import { useBreakpoint } from '@ant-design/pro-components';

export interface DeviceType {
  isMobile: boolean;
  isPad: boolean;
  isPc: boolean;
  mobilePoints: string[];
  padPoints: string[];
  pcPoints: string[];
}

const MOBILE_SCREENS = new Set(['xs', 'sm']);
const PAD_SCREENS = new Set(['md']);
const PC_SCREENS = new Set(['lg', 'xl', 'xxl']);

const breakPoints = {
  mobilePoints: Array.from(MOBILE_SCREENS),
  padPoints: Array.from(PAD_SCREENS),
  pcPoints: Array.from(PC_SCREENS),
};

/**
 * xs	窗口宽度 < 576px
 * sm	窗口宽度 ≥ 576px
 * md	窗口宽度 ≥ 768px
 * lg	窗口宽度 ≥ 992px
 * xl	窗口宽度 ≥ 1200px
 * xxl	窗口宽度 ≥ 1600px
 * xxxl	窗口宽度 ≥ 1920px
 */
export const useDeviceType = (): DeviceType => {
  const screen = useBreakpoint();

  if (!screen) {
    return {
      isMobile: false,
      isPad: false,
      isPc: true,
      ...breakPoints,
    };
  }

  return {
    isMobile: MOBILE_SCREENS.has(screen),
    isPad: PAD_SCREENS.has(screen),
    isPc: PC_SCREENS.has(screen),
    ...breakPoints,
  };
};

export default useDeviceType;
