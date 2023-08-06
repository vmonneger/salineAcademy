/**
 * @file A composable to display navigation links and get access to the navigation logic.
 */
import { computed } from 'vue'
import { Navigation } from 'src/types/navigation'
import { getFileFromAssets } from 'src/helpers/files'
import { SIDEBAR_ARCHITECTURE, ALL_SIDEBAR_LINKS } from 'src/statics/navigationLinks'

/**
 * Give access to the navigation logic of the application.
 */
export const useNavigation = () => {
  /**
   * Get navigation links from map.
   */
  const getLinksFromString = (links: Array<string>) => {
    const linksArray = [] as Array<Navigation>
    links.forEach((linkName) => {
      if (ALL_SIDEBAR_LINKS.has(linkName)) {
        let temp = { ...ALL_SIDEBAR_LINKS.get(linkName) } as Navigation
        if (temp?.link) {
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
   * The name and image for the dropdownProfile depending if you are on the user side or the recruiter side.
   *
   * @returns {object} Label.
   */
  const dropdownLabel = computed(() => {
    return {
      name: 'Test name',
      loading: false,
      image: getFileFromAssets('jobpass-avatar.svg'),
    }
  })

  return {
    dropdownLabel,
    sidebarLinks,
  }
}
