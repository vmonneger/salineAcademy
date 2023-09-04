/**
 * @file A composable to display navigation links and get access to the navigation logic.
 */
import { computed } from 'vue'
import { Navigation } from 'src/types/navigation'
import { getFileFromAssets } from 'src/helpers/files'
import { SIDEBAR_ARCHITECTURE, ALL_SIDEBAR_LINKS } from 'src/statics/navigationLinks'
import { useUserStore } from 'stores/user'

/**
 * Give access to the navigation logic of the application.
 */
export const useNavigation = () => {
  const userStore = useUserStore()
  const userRole = computed(() => userStore.role)

  /**
   * Get navigation links from map.
   */
  const getLinksFromString = (links: Array<string>) => {
    const linksArray = [] as Array<Navigation>

    links.forEach((linkName) => {
      if (ALL_SIDEBAR_LINKS.has(linkName)) {
        let temp = ALL_SIDEBAR_LINKS.get(linkName) as Navigation

        if (temp?.role && !temp?.role.hasOwnProperty(userRole.value)) {
          return
        } else {
          temp = { ...temp, link: { name: temp?.link as string } }
        }

        linksArray.push(temp)
      }
    })
    return linksArray
  }

  /**
   * The list of link for the sidebar.
   */
  const sidebarLinks = computed(() => {
    const sidebarMap = new Map()

    SIDEBAR_ARCHITECTURE.forEach((data) => {
      sidebarMap.set(data.position, getLinksFromString(data.links))
    })

    return sidebarMap
  })

  /**
   * The name and image for the dropdownProfile.
   */
  const dropdownLabel = computed(() => {
    return {
      name: userStore.getFullName,
      loading: false,
      image: getFileFromAssets('jobpass-avatar.svg'),
    }
  })

  return {
    dropdownLabel,
    sidebarLinks,
  }
}
