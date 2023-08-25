/**
 * @file A composable to manage state of the side bar.
 */
import { reactive } from 'vue'

const ICON_SIDEBAR = {
  REDUCE: 'sym_s_keyboard_tab_rtl',
  EXPAND: 'sym_s_keyboard_tab',
}

const sidebarState = reactive({
  mini: false,
  show: false,
  icon: ICON_SIDEBAR.REDUCE,
  label: 'reduce_sidebar',
})

type UseSidebarReturn = {
  sidebarState: {
    mini: boolean
    show: boolean
    icon: string
    label: string
  }
  reduceSidebar: () => void
  toggleSidebar: () => boolean
}

export const useSidebar = (): UseSidebarReturn => {
  const toggleSidebar = (): boolean => (sidebarState.show = !sidebarState.show)

  /**
   * Reduce the sidebar.
   */
  const reduceSidebar = (): void => {
    if (sidebarState.mini) {
      sidebarState.mini = false
      sidebarState.icon = ICON_SIDEBAR.REDUCE
    } else {
      sidebarState.mini = true
      sidebarState.icon = ICON_SIDEBAR.EXPAND
    }
  }

  return { sidebarState, reduceSidebar, toggleSidebar }
}
