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
            },
            fullscreenChange () {
                this.$emit('fullscreenChange', !!document.fullscreenElement)
            },
            mozFullscreenChange () {
                this.$emit('fullscreenChange', !!document.mozFullscreenElement)
            },
            msFullscreenChange () {
                this.$emit('fullscreenChange', !!document.msFullscreenElement)
            },
            webkitFullscreenChange () {
                this.$emit('fullscreenChange', !!document.webkitFullscreenElement)
            }
        },
        mounted () {
            if (document.fullscreenEnabled) {
                document.addEventListener('fullscreenchange', this.fullscreenChange)
            } else if (document.mozFullscreenEnabled) {
                document.addEventListener('mozfullscreenchange', this.mozFullscreenChange)
            } else if (document.msFullscreenEnabled) {
                document.addEventListener('msfullscreenchange', this.msFullscreenChange)
            } else if (document.webkitFullscreenEnabled) {
                document.addEventListener('webkitfullscreenchange', this.webkitFullscreenChange)
            } else {
                this.fullscreenEnabled = false
            }
        },
        destroyed () {
            if (document.fullscreenEnabled) {
                document.removeEventListener('fullscreenchange', this.fullscreenChange)
            } else if (document.mozFullscreenEnabled) {
                document.removeEventListener('mozfullscreenchange', this.mozFullscreenChange)
            } else if (document.msFullscreenEnabled) {
                document.removeEventListener('msfullscreenchange', this.msFullscreenChange)
            } else if (document.webkitFullscreenEnabled) {
                document.removeEventListener('webkitfullscreenchange', this.webkitFullscreenChange)
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
