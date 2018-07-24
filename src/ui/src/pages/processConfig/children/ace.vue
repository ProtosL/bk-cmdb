<template>
    <div class="ace-wrapper" :style="{height: `${aceConfig.height}px`, width: `${aceConfig.width}px`}"></div>
</template>

<script>
    import brace from 'brace'
    class DefaultConfig {
        constructor (userConfig) {
            let config = {
                value: '',
                width: 500,
                height: 300,
                lang: 'sqlserver',
                theme: 'monokai',
                readOnly: false,
                fullScreen: true,
                autoCompletion: false,
                tabSize: 4
            }
            return {...config, ...userConfig}
        }
    }

    export default {
        props: {
            config: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        data () {
            return {
                aceConfig: {...new DefaultConfig(), ...this.config},
                $ace: null
            }
        },
        mounted () {
            this.$ace = brace.edit(this.$el)
            this.$emit('init', this.$ace)

            require(`brace/theme/${this.aceConfig.theme}`)
            // 代码提示与自动补全
            // this.$ace.setOptions({
            //     enableBasicAutocompletion: this.aceConfig.autoCompletion,
            //     enableLiveAutocompletion: this.aceConfig.autoCompletion
            // })

            // session.setMode(`ace/mode/${this.aceConfig.lang}`) // 配置语言
            console.log(`ace/theme/${this.aceConfig.theme}`)
            this.$ace.setTheme(`ace/theme/${this.aceConfig.theme}`) // 配置主题
            this.$ace.setValue(this.aceConfig.value, 1) // 设置默认内容
            this.$ace.setReadOnly(this.aceConfig.readOnly) // 设置是否为只读模式

            let session = this.$ace.getSession()
            session.setTabSize(this.aceConfig.tabSize) // Tab大小
            session.setUseSoftTabs(true)

            this.$ace.setShowPrintMargin(false) // 不显示打印边距
            session.setUseWrapMode(true) // 自动换行
        }
    }
</script>

<style lang="scss" scoped>
    .ace-wrapper {
        width: 100%;
    }
</style>
