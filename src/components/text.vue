<template>
  <div class="text">
    <div class="">

    </div>
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" @keyup="onKeyup"></textarea>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Text',
  data () {
    return {
      content: ''
    }
  },
  methods: {
    ...mapActions([
      'sendMessage'
    ]),
    onKeyup (e) {
      if (e.ctrlKey && e.keyCode === 13 && this.content.length) {
        this.sendMessage(this.content)
        this.content = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.text {
    height: 180px;
    border-top: solid 1px #ddd;

    textarea {
        padding: 10px;
        height: 100%;
        width: 100%;
        border: none;
        outline: none;
        font-family: "Micrsofot Yahei";
        resize: none;
    }
}
</style>