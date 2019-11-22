import path from 'path'
import { ipcMain, BrowserWindow } from 'electron'
import log from 'electron-log'
import { searchFilesAndDir } from '../../utils/imagePathAutoComplement'

ipcMain.on('mt::ask-for-image-auto-path', (e, { pathname, src, id }) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  if (src.endsWith('/') || src.endsWith('\\') || src.endsWith('.')) {
    return win.webContents.send(`mt::response-of-image-path-${id}`, [])
  }
  const fullPath = path.isAbsolute(src) ? src : path.join(path.dirname(pathname), src)
  const dir = path.dirname(fullPath)
  const searchKey = path.basename(fullPath)
  searchFilesAndDir(dir, searchKey)
    .then(files => {
      return win.webContents.send(`mt::response-of-image-path-${id}`, files)
    })
    .catch(err => {
      log.error(err)
      return win.webContents.send(`mt::response-of-image-path-${id}`, [])
    })
})

export const edit = (win, type) => {
  win.webContents.send('AGANI::edit', { type })
}

export const screenshot = (win, type) => {
  ipcMain.emit('screen-capture', win)
}

export const lineEndingNew = (win, lineEnding) => {
  win.webContents.send('AGANI::set-line-ending', { lineEnding, ignoreSaveStatus: false })
}
