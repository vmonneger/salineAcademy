/**
 * @file All the navigation links.
 */

import { SidebarPosition, Role } from 'src/types/enum'

export const SIDEBAR_ARCHITECTURE = [
  {
    position: SidebarPosition.Top,
    links: ['Catalog', 'CoursesTeacher', 'CoursesStudent', 'License'],
  },
  { position: SidebarPosition.Dropdown, links: ['Profile', 'Logout'] },
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
    'CoursesTeacher',
    {
      label: 'Mes cours',
      link: 'CoursesTeacher',
      role: {
        [Role.Teacher]: Role.Teacher,
      },
      icon: 'sym_s_school',
    },
  ],
  [
    'CoursesStudent',
    {
      label: 'Mes cours',
      link: 'CoursesStudent',
      role: {
        [Role.Student]: Role.Student,
      },
      icon: 'sym_s_school',
    },
  ],
  [
    'Profile',
    {
      label: 'Profil',
      link: 'Profile',
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
