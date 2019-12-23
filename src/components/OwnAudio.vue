<template>
    <div class="own-audio">
        <div class="video-area" ref="videoArea"></div>
        <!-- <van-button size="small" :icon="!playedStauts ? 'play-circle-o' : 'pause-circle-o'" type="primary" @click="handlePlayOrPause" /> -->
    </div>
</template>

<script>
const ogv = require('ogv')
const isWeiXin = () => {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}
export default {
    name: 'OwnAudio',
    props: {
        url: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'standard'
        },
        autoPlay: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isIOS: /iPhone|iPad|iPod/i.test(window.navigator.userAgent),
            player: null,
            sound: null,
            playedStauts: false,
            tt: null
        }
    },
    watch: {
        url(nv) {
            console.log('地址已改变：', nv)
            this.$refs['videoArea'].innerHTML = ''
            this.initAudio(nv)
            // this.handlePlay()
            this.$emit('player', this.player)
        }
    },
    mounted() {
        this.initAudio(this.url)
        if (this.autoPlay) {
            if (isWeiXin()) {
                console.log('微信：')
                this.$nextTick(() => {
                    console.log(document)
                    // document.addEventListener(
                    //     'WeixinJSBridgeReady',
                    //     () => {
                    //         this.handlePlay()
                    //     },
                    //     false
                    // )
                })
            } else {
                console.log('其它浏览器：')
                // this.handlePlay()
            }
            // document.addEventListener('touchstart', () => {
            //     console.log(this.player)
            //     if (this.player.paused) {
            //         this.handlePlay()
            //     }
            // })

            // document.addEventListener('click', () => {
            //     if (this.player.paused) {
            //         this.handlePlay()
            //     }
            // })
        }
    },
    methods: {
        // Audio初始化
        initAudio(url) {
            if (this.type === 'standard') {
                console.log('new: audio')
                this.player = new Audio()
                this.player.src = url
                this.player.preload = true
                this.player.controls = false
                this.player.loop = false
            } else {
                console.log('OGVPlayer: audio')
                this.player = new ogv.OGVPlayer({
                    // debug: true
                })
                ogv.OGVLoader.base = 'lib'
                this.player.src = url
            }
            this.player.setAttribute('name', 'currAudio')
            this.$refs['videoArea'].appendChild(this.player)
            this.$emit('player', this.player)
        },
        // 播放
        handlePlay() {
            console.log('播放啦：', this.player.src)
            if (this.player) {
                this.player.play()
                this.playedStauts = true
                this.$emit('onChange', this.playedStauts)
                this.handleEnded()
                this.handelTimeupdate()
            }
        },
        // 暂停
        handlePause() {
            console.log('暂停啦：', this.player.src)
            if (this.player) {
                this.player.pause()
                this.playedStauts = false
                this.$emit('onChange', this.playedStauts)
            }
        },
        // 播放/暂停
        handlePlayOrPause() {
            if (!this.playedStauts) {
                this.handlePlay()
            } else {
                this.handlePause()
            }
        },
        // 播放完
        handleEnded() {
            this.player.addEventListener('ended', (e) => {
                console.log('event ended: ' + new Date().getTime())
                this.playedStauts = false
                this.$emit('onChange', this.playedStauts)
                this.$emit('onEnded', e)
            })
        },
        // 播放时间改变
        handelTimeupdate() {
            this.player.addEventListener('timeupdate', (event) => {
                console.log('event timeupdate: ', event.timeStamp)
            })
        }
    },
    destroyed() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.video-area {
    width: 1px;
    height: 0;
}
</style>
