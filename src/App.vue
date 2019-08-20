
<template>
  <div class="app">
    <div class="sidebar">
      <card></card>
      <list></list>
    </div>
    <div class="main">
      <message></message>
      <text-box></text-box>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex'
import Card from './components/card'
import List from './components/list'
import TextBox from './components/text'
import Message from './components/message'

export default {
  components: { Card, List, TextBox, Message },
  methods: {
    ...mapActions([
      'initData'
    ])
  },
  created () {
    this.initData()
  }
}
</script>

<style lang="less" scoped>
.app {
  margin: 110px auto;
  max-width: 1000px;
  min-width: 800px;
  height: 800px;
  overflow: hidden;
  border-radius: 3px;

  .sidebar, .main {
      height: 100%;
  }
  .sidebar {
    float: left;
    width: 280px;
    color: #f4f4f4;
    background-color: #2e3238;
  }
  .main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
  }
  .text {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  }
  .message {
    height: ~'calc(100% - 160px)';
  }
}
</style>
