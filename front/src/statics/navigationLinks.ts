/**
 * @file All the navigation links.
 */

import { SidebarPosition } from 'src/types/enum'

export const SIDEBAR_ARCHITECTURE = [
  {
    position: SidebarPosition.Top,
    role: 'STUDENT',
    links: ['Catalog'],
  },
  { position: SidebarPosition.Dropdown, role: 'STUDENT', links: ['Profil', 'Logout'] },
]

export const ALL_SIDEBAR_LINKS = new Map([
  [
    'Catalog',
    {
      label: 'Catalogue',
      link: 'Catalog',
      icon: 'sym_s_video_library',
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
