import { remote } from 'electron'
import {
  CUT,
  COPY,
  PASTE,
  COPY_TABLE,
  COPY_AS_MARKDOWN,
  COPY_AS_HTML,
  PASTE_AS_PLAIN_TEXT,
  SEPARATOR,
  INSERT_BEFORE,
  INSERT_AFTER,
  INSERT_ROW,
  REMOVE_ROW,
  INSERT_COLUMN,
  REMOVE_COLUMN
} from './menuItems'
import spellcheckMenuBuilder from './spellcheck'

const { Menu, MenuItem } = remote

export const showContextMenu = (event, selectionChanges, spellchecker, selectedWord, wordSuggestions, replaceCallback) => {
  const { start, end } = selectionChanges
  const menu = new Menu()
  const win = remote.getCurrentWindow()
  const disableCutAndCopy = start.key === end.key && start.offset === end.offset
  const CONTEXT_ITEMS = [INSERT_BEFORE, INSERT_AFTER, SEPARATOR, CUT, COPY, PASTE, SEPARATOR, COPY_AS_MARKDOWN, COPY_AS_HTML, PASTE_AS_PLAIN_TEXT]

  const spellingSubmenu = spellcheckMenuBuilder(spellchecker, selectedWord, wordSuggestions, replaceCallback)
  if (spellingSubmenu) {
    menu.append(new MenuItem({
      label: 'Spelling...',
      submenu: spellingSubmenu
    }))
    menu.append(new MenuItem(SEPARATOR))
  }

  if (/th|td/.test(start.block.type) && start.key === end.key) {
    CONTEXT_ITEMS.unshift(
      INSERT_ROW,
      REMOVE_ROW,
      INSERT_COLUMN,
      REMOVE_COLUMN,
      SEPARATOR,
      COPY_TABLE,
      SEPARATOR
    )
  }

  [CUT, COPY, COPY_AS_HTML, COPY_AS_MARKDOWN].forEach(item => {
    item.enabled = !disableCutAndCopy
  })

  CONTEXT_ITEMS.forEach(item => {
    menu.append(new MenuItem(item))
  })
  menu.popup({ window: win, x: event.clientX, y: event.clientY })
}
