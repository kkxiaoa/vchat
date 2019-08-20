<template>
  <div class="message">
    <happy-scroll color="rgba(0,0,0,0.2)" :resize="true" size="7" :scroll-top="scrollTop" :hide-horizontal="true">
      <ul v-if="session" class="ul_list">
        <li v-for="item in session.messages">
          <p class="time">
            <span>{{ item.date | time }}</span>
          </p>
          <div class="main" :class="{ self: item.self }">
            <img class="avatar" width="40" height="40" :src="item.self ? user.img : session.user.img" />
            <div class="text">{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </happy-scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'message',
  data () {
    return {
      scrollTop: 0
    }
  },
  computed: {
    ...mapGetters([
      'user',
      'session'
    ])
  },
  filters: {
    // 将日期过滤为 hour:minutes
    time (date) {
        if (typeof date === 'string') {
            date = new Date(date)
        }
        return date.getHours() + ':' + date.getMinutes()
    }
  },
  watch: {
    'session.messages': function (newer, older) {
      this.$nextTick(()=> {
        this.scrollTop = document.querySelector('.ul_list').scrollHeight
      })
    }
  }
}
</script>

<style>
.happy-scroll-content {
  border-right: 0 !important;
  border-bottom: 50px solid transparent !important;
}
</style>

<style lang="less" scoped>
.message {
  padding: 10px 1px 0 15px;
  .ul_list {
    width: calc(100% - 40px);
  }
  li {
      margin-bottom: 15px;
  }
  .time {
    margin: 7px 0;
    text-align: center;

    > span {
      display: inline-block;
      padding: 0 18px;
      font-size: 12px;
      color: #fff;
      border-radius: 2px;
      background-color: #dcdcdc;
    }
  }
  .avatar {
    float: left;
    margin: 0 10px 0 0;
    border-radius: 3px;
  }
  .text {
    display: inline-block;
    position: relative;
    padding: 0 10px;
    max-width: ~'calc(100% - 130px)';
    min-height: 30px;
    line-height: 2.5;
    font-size: 12px;
    text-align: left;
    word-break: break-all;
    background-color: #fafafa;
    border-radius: 4px;

    &:before {
      content: " ";
      position: absolute;
      top: 9px;
      right: 100%;
      border: 6px solid transparent;
      border-right-color: #fafafa;
    }
  }

  .self {
    text-align: right;

    .avatar {
      float: right;
      margin: 0 0 0 10px;
    }
    .text {
      background-color: #b2e281;

      &:before {
        right: inherit;
        left: 100%;
        border-right-color: transparent;
        border-left-color: #b2e281;
      }
    }
  }
}
</style>