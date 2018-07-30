<template>
    <div class="fullscreen-wrapper">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            isFullscreen: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {
                fullscreenEnabled: true
            }
        },
        watch: {
            isFullscreen (isFullscreen) {
                if (!isFullscreen) {
                    this.exitFullscreen()
                }
            }
        },
        methods: {
            launchFullscreen () {
                let elem = this.$el
                if (elem.requestFullscreen) {
                    elem.requestFullscreen()
                } else if (elem.mozRequestFullscreen) {
                    elem.mozRequestFullscreen()
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen()
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen()
                }
            },
            exitFullscreen () {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.mozExitFullscreen) {
                    document.mozExitFullscreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen()
                }
            }
        },
        mounted () {
            if (document.fullscreenEnabled) {
                document.addEventListener('fullscreenchange', e => this.$emit('fullscreenChange', !!this.fullscreenElement))
            } else if (document.mozFullscreenEnabled) {
                document.addEventListener('mozfullscreenchange', e => this.$emit('fullscreenChange', !!this.mozFullscreenElement))
            } else if (document.msFullscreenEnabled) {
                document.addEventListener('msfullscreenchange', e => this.$emit('fullscreenChange', !!this.msFullscreenElement))
            } else if (document.webkitFullscreenEnabled) {
                document.addEventListener('webkitfullscreenchange', e => {
                    this.$emit('fullscreenChange', !!document.webkitFullscreenElement)
                })
            } else {
                this.fullscreenEnabled = false
            }
        },
        destroyed () {
            if (document.fullscreenEnabled) {
                document.removeEventListener('fullscreenchange')
            } else if (document.mozFullscreenEnabled) {
                document.removeEventListener('mozfullscreenchange')
            } else if (document.msFullscreenEnabled) {
                document.removeEventListener('msfullscreenchange')
            } else if (document.webkitFullscreenEnabled) {
                document.removeEventListener('webkitfullscreenchange')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .fullscreen-wrapper {
        &:-moz-full-screen {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
        }
        &:-ms-full-screen {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
        }
        &:-webkit-full-screen {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
        }
        &:fullscreen {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
        }
    }
</style>
