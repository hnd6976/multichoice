import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
//import { navigations } from 'app/navigations';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import useAuth from 'app/hooks/useAuth';
import { useEffect, useState } from 'react';
const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { user } = useAuth();
  const [navigations, setNavigations] = useState([
    {
      name: 'Tài liệu',
      icon: 'library_books',
      children: [
        { name: 'Thống kê', iconText: '-', path: '/document/charts' },
        { name: 'Quản lý', iconText: '-', path: '/document/list' },
      ],
    },
    {
      name: 'Trắc nghiệm',
      icon: 'widgets',
      children: [
        { name: 'Thống kê', iconText: '-', path: '/exam/charts' },
        { name: 'Quản lý đề trắc nghiệm', iconText: '-', path: '/exam/list' },
        { name: 'Quản lý câu hỏi', iconText: '-', path: '/exam/listQuestion' },
      ],
    },
  ]);
  useEffect(() => {
    if (user.authorities.filter((e) => e.authority == 'ROLE_ROOT').length > 0) {
      let nav = navigations;
      nav[2] = {
        name: 'Tài khoản',
        icon: 'people',
        children: [
          { name: 'Thống kê', iconText: '-', path: '/user/charts' },
          { name: 'Quản lý tài khoản', iconText: '-', path: '/user/list' },
        ],
      };
      setNavigations(nav);
    } else {
      let nav = navigations;
      nav.splice(2, 1);
      setNavigations(nav);
    }
  }, []);
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={navigations} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
