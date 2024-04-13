// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },

  {
    title: 'specialisation',
    path: '/dashboard/specialise',
    icon: icon('ic_lock'),
  },
  {
    title: 'doctors',
    path: '/dashboard/doctors',
    icon: icon('ic_user'),
  },
  {
    title: 'patients',
    path: '/dashboard/patients',
    icon: icon('ic_user'),
  },
  {
    title: 'request',
    path: '/dashboard/request',
    icon: icon('ic_user'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
