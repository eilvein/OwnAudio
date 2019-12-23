<template>
    <div class="demo">
        <van-button icon="arrow-left" type="primary" @click="onPlayPrev" />
        <van-button :icon="!playerStauts ? 'play-circle-o' : 'pause-circle-o'" type="primary" @click="onPlayOrPause" />
        <van-button icon="arrow" type="primary" @click="onPlayNext" />
        <OwnAudio
            :url="audioUrl"
            @player="getPlayer"
            @onChange="changePlayer"
            @onEnded="onEnded"
            :type="audioType"
            :autoPlay="autoPlayer"
        ></OwnAudio>
    </div>
</template>

<script>
import OwnAudio from '@/components/OwnAudio'
import { Howl } from 'howler'
export default {
    name: 'home',
    components: {
        OwnAudio
    },
    data() {
        return {
            audioUrl: '',
            audioType: '',
            urls: [
                {
                    type: 'opus',
                    src: 'media/02.opus'
                },
                {
                    type: 'standard',
                    src: 'media/001.mp3'
                },
                {
                    type: 'standard',
                    src: 'media/002.wav'
                },
                {
                    type: 'opus',
                    src: '/res/20191212/1ed6d607e7105de7d2933f545e28ec40.opus'
                }
            ],
            autoPlayer: true,
            currentAudioId: '',
            player: null,
            playerStauts: false,
            playIndex: 0
        }
    },
    created() {
        this.initPlayerList(this.playIndex)
    },
    mounted() {
        // this.init()
    },
    methods: {
        init() {
            const sound = new Howl({
                src: ['media/02.opus']
            })
            sound.play()
        },
        // 获取Player
        getPlayer(val) {
            this.player = val
        },
        // 播放状体
        changePlayer(event) {
            console.log('当前播放状态：', event)
            this.playerStauts = event
        },
        // 播放时间
        timeupdate(event) {
            console.log('当前播放时间：', event)
        },
        // 播放
        onPlay() {
            if (this.player) {
                console.log('我要播放', this.player)

                this.player.play()
                this.playerStauts = true
            }
            this.onEnded()
        },
        // 暂停
        onPause() {
            if (this.player) {
                this.player.pause()
                this.playerStauts = false
            }
        },
        // 播放暂停
        onPlayOrPause() {
            if (!this.playerStauts) {
                this.onPlay()
            } else {
                this.onPause()
            }
        },
        // 初始播放
        initPlayerList(idx) {
            this.audioUrl = this.urls[idx].src
            this.audioType = this.urls[idx].type
        },
        // 播放完
        onEnded() {
            let isObj = Object.prototype.toString.call(this.player) === '[object Object]'
            console.log(isObj)
            this.player.addEventListener('ended', (e) => {
                console.log(e)
                this.playIndex++
                if (this.playIndex < this.urls.length) {
                    this.initPlayerList(this.playIndex)
                    this.$nextTick(() => {
                        this.onPlay()
                    })
                }
                console.log(this.playIndex)
            })
        },
        // 上一首
        onPlayPrev() {
            if (this.playIndex === 0) {
                this.$toast('无上一首')
                return
            }
            this.playIndex--
            this.initPlayerList(this.playIndex)
            if (this.playIndex < this.urls.length) {
                this.$nextTick(() => {
                    this.onPlay()
                })
            }
        },
        // 下一首
        onPlayNext() {
            this.playIndex++
            if (this.playIndex >= this.urls.length) {
                this.$toast('最后一首')
                return
            }
            this.initPlayerList(this.playIndex)
            if (this.playIndex < this.urls.length) {
                this.$nextTick(() => {
                    this.onPlay()
                })
            }
        }
    }
}
</script>
<style lang="scss">
.demo {
    & > .van-button {
        margin: 0 1px;
    }
}
</style>
