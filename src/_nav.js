export default [
  {
    component: 'CNavItem',
    name: 'dashboard.sidebar.dashboard',
    to: 'dashboard.home',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavGroup',
    name: 'dashboard.sidebar.project.title',
    to: '#',
    icon: 'cil-folder-open',
    items: [
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.project.create',
        to: 'projects.create',
      },
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.project.index',
        to: 'projects.index',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'dashboard.sidebar.assembly.title',
    to: '#',
    icon: 'cil-folder-open',
    items: [
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.assembly.create',
        to: 'projects.create',
      },
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.assembly.index',
        to: 'projects.index',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'dashboard.sidebar.assembly.title',
    to: '#',
    icon: 'cil-folder-open',
    items: [
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.assembly.create',
        to: 'projects.create',
      },
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.assembly.index',
        to: 'projects.index',
      },
    ],
  },
]
