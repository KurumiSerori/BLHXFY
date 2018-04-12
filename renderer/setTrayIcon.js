const { Menu, app, Tray } = require('electron')
const path = require('path')

const setTrayIcon = (win) => {
  let isQuiting = false
  win.on('close', (event) => {
    if (!isQuiting) {
      event.preventDefault()
      win.hide()
    }
    return false
  })
  const contextMenu = Menu.buildFromTemplate([
    { 
      label: '显示', 
      click:  function() {
        win.show()
      } 
    },
    { 
      label: '退出', 
      click:  function() {
        isQuiting = true
        app.quit()
      } 
    }
  ])
  const tray = new Tray(path.resolve(__dirname, '../assets/icon.ico'))
  tray.setToolTip('碧蓝幻想翻译')
  tray.setContextMenu(contextMenu)
  tray.on('click', () => {
    win.isVisible() ? win.hide() : win.show()
  })
}

module.exports = setTrayIcon