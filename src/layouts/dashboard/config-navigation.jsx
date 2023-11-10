import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'home',
    path: '/',
    icon: icon('ic_home'),
  },
  {
    title: 'reader',
    path: '/reader',
    icon: icon('ic_user'),
  },
  {
    title: 'library',
    path: '/products',
    icon: icon('ic_books'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_login'),
  // },
];

export default navConfig;
