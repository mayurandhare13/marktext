import { ipcRenderer } from 'electron'

const width = localStorage.getItem('side-bar-width')
const sideBarWidth = typeof +width === 'number' ? Math.max(+width, 220) : 280

// messages from main process, and do not change the state
const state = {
  rightColumn: 'files',
  showSideBar: false,
  showTabBar: false,
  sideBarWidth
}

const getters = {}

const mutations = {
  SET_LAYOUT (projState, layout) {
    Object.assign(projState, layout)
  },
  SET_SIDE_BAR_WIDTH (projState, barWidth) {
    // TODO: Add side bar to session (GH#732).
    localStorage.setItem('side-bar-width', Math.max(+barWidth, 220))
    projState.sideBarWidth = barWidth
  }
}

const actions = {
  LISTEN_FOR_LAYOUT ({ commit }) {
    ipcRenderer.on('AGANI::listen-for-view-layout', (e, layout) => {
      commit('SET_LAYOUT', layout)
    })
  },
  LISTEN_FOR_REQUEST_LAYOUT ({ dispatch }) {
    ipcRenderer.on('AGANI::request-for-view-layout', () => {
      dispatch('SET_LAYOUT_MENU_ITEM')
    })
  },
  SET_LAYOUT_MENU_ITEM ({ projState }) {
    const { windowId } = global.marktext.env
    const { showTabBar, showSideBar } = projState
    ipcRenderer.send('mt::view-layout-changed', windowId, { showTabBar, showSideBar })
  },
  CHANGE_SIDE_BAR_WIDTH ({ commit }, barWidth) {
    if (barWidth < 220) {
      commit('SET_LAYOUT', { showSideBar: false })
      const { windowId } = global.marktext.env
      const { showTabBar, showSideBar } = state
      ipcRenderer.send('mt::view-layout-changed', windowId, { showTabBar, showSideBar })
    } else {
      commit('SET_SIDE_BAR_WIDTH', barWidth)
    }
  }
}

export default { state, getters, mutations, actions }
