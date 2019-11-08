import { ipcMain } from 'electron'
import * as actions from '../actions/view'

export default function (keybindings, userPreference) {
  const { focus, typewriter, sourceCode } = userPreference.getAll()
  const viewMenu = {
    label: '&View',
    submenu: [{
      id: 'sourceCodeModeMenuItem',
      label: 'Source Code Mode',
      accelerator: keybindings.getAccelerator('viewSourceCodeMode'),
      type: 'checkbox',
      checked: sourceCode,
      click (item, browserWindow, event) {
        // if we call this function, the checked state is not set
        if (!event) {
          item.checked = !item.checked
        }
        actions.sourceCode(item, browserWindow, false)
      }
    }, {
      id: 'typewriterModeMenuItem',
      label: 'Typewriter Mode',
      accelerator: keybindings.getAccelerator('viewTypewriterMode'),
      type: 'checkbox',
      checked: typewriter,
      click (item, browserWindow, event) {
        // if we call this function, the checked state is not set
        if (!event) {
          item.checked = !item.checked
        }
        actions.typewriter(item, browserWindow)
      }
    }, {
      id: 'focusModeMenuItem',
      label: 'Focus Mode',
      accelerator: keybindings.getAccelerator('viewFocusMode'),
      type: 'checkbox',
      checked: focus,
      click (item, browserWindow, event) {
        // if we call this function, the checked state is not set
        if (!event) {
          item.checked = !item.checked
        }
        actions.focus(item, browserWindow)
      }
    }, {
      type: 'separator'
    }, {
      label: 'Toggle Side Bar',
      id: 'sideBarMenuItem',
      accelerator: keybindings.getAccelerator('viewToggleSideBar'),
      type: 'checkbox',
      checked: false,
      click (item, browserWindow, event) {
        // if we call this function, the checked state is not set
        if (!event) {
          item.checked = !item.checked
        }

        actions.layout(item, browserWindow, 'showSideBar')
      }
    }, {
      label: 'Toggle Tab Bar',
      id: 'tabBarMenuItem',
      accelerator: keybindings.getAccelerator('viewToggleTabBar'),
      type: 'checkbox',
      checked: false,
      click (item, browserWindow, event) {
        // if we call this function, the checked state is not set
        if (!event) {
          item.checked = !item.checked
        }

        actions.layout(item, browserWindow, 'showTabBar')
      }
    }, {
      type: 'separator'
    }]
  }

  if (global.MARKTEXT_DEBUG) {
    viewMenu.submenu.push({
      label: 'Toggle Developer Tools',
      accelerator: keybindings.getAccelerator('viewDevToggleDeveloperTools'),
      click (item, focusedWindow) {
        if (focusedWindow) {
          focusedWindow.webContents.toggleDevTools()
        }
      }
    })
    viewMenu.submenu.push({
      label: 'Reload',
      accelerator: keybindings.getAccelerator('viewDevReload'),
      click (item, focusedWindow) {
        if (focusedWindow) {
          ipcMain.emit('window-reload-by-id', focusedWindow.id)
        }
      }
    })
  }
  return viewMenu
}
