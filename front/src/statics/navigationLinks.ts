/**
 * @file All the navigation links.
 */

import { SidebarPosition, Role } from 'src/types/enum'

export const SIDEBAR_ARCHITECTURE = [
  {
    position: SidebarPosition.Top,
    links: ['Catalog', 'Courses', 'License'],
  },
  { position: SidebarPosition.Dropdown, links: ['Profil', 'Logout'] },
]

export const ALL_SIDEBAR_LINKS = new Map([
  [
    'License',
    {
      label: 'Les Licences',
      link: 'License',
      role: {
        [Role.Admin]: Role.Admin,
      },
      icon: 'sym_s_workspace_premium',
    },
  ],
  [
    'Catalog',
    {
      label: 'Catalogue',
      link: 'Catalog',
      icon: 'sym_s_video_library',
    },
  ],
  [
    'Courses',
    {
      label: 'Mes cours',
      link: 'Courses',
      role: {
        [Role.Student]: Role.Student,
        [Role.Teacher]: Role.Teacher,
      },
      icon: 'sym_s_school',
    },
  ],
  [
    'Profil',
    {
      label: 'Profil',
      link: 'Profil',
      icon: 'sym_s_person',
    },
  ],
  [
    'Logout',
    {
      label: 'Déconnexion',
      link: 'Logout',
      icon: 'sym_s_logout',
    },
  ],
])
