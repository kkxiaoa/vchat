/**
 * Vuex
 * http://vuex.vuejs.org/zh-cn/intro.html
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const now = new Date()
const store = new Vuex.Store({
    state: {
        // 当前用户
        user: {
          name: 'YYY',
          img: 'static/img/webwxgeticon.jpg'
        },
        // 会话列表
        sessions: [
          {
            id: 1,
            user: {
              name: '示例介绍',
              img: 'static/img/2.png'
            },
            messages: [
              {
                content: 'Hi, 这是一款使用soctet.io及Vue搭建的多人在线聊天室小应用目前正处于完善当中.',
                date: now
              }, {
                content: '项目地址: https://github.com/kkxiaoa/vchat',
                date: now
              }
            ]
          },
          {
            id: 2,
            user: {
              name: 'webpack',
              img: 'static/img/3.jpg'
            },
            messages: []
          }
        ],
        // 当前选中的会话
        currentSessionId: 1,
        // 过滤出只包含这个key的会话
        filterKey: ''
    },
    mutations: {
      INIT_DATA (state) {
        let data = localStorage.getItem('vue-chat-session')
        if (data) {
          state.sessions = JSON.parse(data)
        }
      },
      // 发送消息
      SEND_MESSAGE ({ sessions, currentSessionId }, content) {
          let session = sessions.find(item => item.id === currentSessionId)
          session.messages.push({
              content: content,
              date: new Date(),
              self: true
          })
      },
      // 选择会话
      SELECT_SESSION (state, id) {
          state.currentSessionId = id
      } ,
      // 搜索
      SET_FILTER_KEY (state, value) {
          state.filterKey = value
      }
    },
    getters: {
      user (state) {
        return state.user
      },
      session (state) {
        return state.sessions.find(session => session.id === state.currentSessionId)
      },
      currentId (state) {
        return state.currentSessionId
      },
      sessionList (state) {
        return state.sessions.filter(session => session.user.name.includes(state.filterKey))
      }
    },
    actions: {
      initData: ({ commit }) => commit('INIT_DATA'),
      sendMessage: ({ commit }, content) => commit('SEND_MESSAGE', content),
      selectSession: ({ commit }, id) => commit('SELECT_SESSION', id),
      search: ({ commit }, value) => commit('SET_FILTER_KEY', value)
    }
})

store.watch(
    (state) => state.sessions,
    (val) => {
        console.log('CHANGE: ', val)
        localStorage.setItem('vue-chat-session', JSON.stringify(val))
    },
    {
        deep: true
    }
)

export default store
