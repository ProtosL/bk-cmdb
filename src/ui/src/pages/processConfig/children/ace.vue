/*
 * Tencent is pleased to support the open source community by making 蓝鲸 available.
 * Copyright (C) 2017-2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */
 
<template>
    <div class="ace-wrapper"></div>
</template>

<script>
    import brace from 'brace'
    class DefaultConfig {
        constructor (userConfig) {
            let config = {
                value: '',
                width: 500,
                height: 300,
                mode: 'sqlserver',
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
        watch: {
            'config.lang' () {

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
        height: 100%;
    }
</style>
