import { getMenuItemById } from '../../menu'
import { ipcMain } from 'electron'

const typewriterModeMenuItemId = 'typewriterModeMenuItem'
const focusModeMenuItemId = 'focusModeMenuItem'

// export const typeMode = (win, type, item) => {
//   const { checked } = item
//   win.webContents.send('AGANI::view', { type, checked })
//   if (type === 'sourceCode') {
//     const typewriterModeMenuItem = getMenuItemById(typewriterModeMenuItemId)
//     const focusModeMenuItem = getMenuItemById(focusModeMenuItemId)
//     typewriterModeMenuItem.enabled = !checked
//     focusModeMenuItem.enabled = !checked
//   }
// }

export const focus = (item, browserWindow) => {
  const { checked } = item
  ipcMain.emit('set-user-preference', { focus: checked })
  browserWindow.webContents.send('AGANI::view', { focus, checked })
}

export const typewriter = (item, browserWindow) => {
  const { checked } = item
  ipcMain.emit('set-user-preference', { typewriter: checked })
  browserWindow.webContents.send('AGANI::view', { typewriter, checked })
}

export const sourceCode = (item, browserWindow, val) => {
  const { checked } = item
  ipcMain.emit('set-user-preference', { sourceCode: checked })
  browserWindow.webContents.send('AGANI::view', { sourceCode, checked })
  browserWindow.webContents.send('AGANI::view', { typewriter, val })
  browserWindow.webContents.send('AGANI::view', { focus, val })
  const typewriterModeMenuItem = getMenuItemById(typewriterModeMenuItemId)
  const focusModeMenuItem = getMenuItemById(focusModeMenuItemId)
  typewriterModeMenuItem.enabled = !checked
  focusModeMenuItem.enabled = !checked
}

export const layout = (item, win, type) => {
  win.webContents.send('AGANI::listen-for-view-layout', { [type]: item.checked })
}

export const showTabBar = win => {
  const tabBarMenuItem = getMenuItemById('tabBarMenuItem')
  if (tabBarMenuItem && !tabBarMenuItem.checked && tabBarMenuItem.click) {
    tabBarMenuItem.click(tabBarMenuItem, win)
  }
}

// --- IPC events -------------------------------------------------------------

// NOTE: Don't use static `getMenuItemById` here, instead request the menu by
//       window id from `AppMenu` manager.

export const viewLayoutChanged = (applicationMenu, { showSideBar, showTabBar }) => {
  const sideBarMenuItem = applicationMenu.getMenuItemById('sideBarMenuItem')
  const tabBarMenuItem = applicationMenu.getMenuItemById('tabBarMenuItem')
  sideBarMenuItem.checked = showSideBar
  tabBarMenuItem.checked = showTabBar
}
