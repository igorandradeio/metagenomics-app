export default [
  {
    component: 'CNavItem',
    name: 'dashboard.sidebar.dashboard',
    to: 'dashboard.home',
    icon: 'cil-speedometer',
  },
  {
    component: 'CNavGroup',
    name: 'dashboard.sidebar.project.title',
    to: '#',
    icon: 'cil-folder-open',
    items: [
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.project.index',
        to: 'projects.index',
      },
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.project.create',
        to: 'projects.create',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'dashboard.sidebar.task.title',
    to: '#',
    icon: 'cil-clipboard',
    items: [
      {
        component: 'CNavItem',
        name: 'dashboard.sidebar.task.index',
        to: 'tasks.index',
      },
    ],
  },
]
