<template>
    <div class="config-detail-wrapper">
        <div class="info-wrapper fr">
            <v-sidebar></v-sidebar>
        </div>
        <div class="editor-wrapper">
            <bk-tab class="editor-tab" type="fill" :active-name.sync="editorTab.active">
                <template slot="setting">
                    <div class="setting-wrapper">
                        <i class="icon-cc-question"></i>
                        <span class="title">高亮风格</span>
                        <bk-select class="highlight-select" :selected.sync="highlight.selected" @on-selected="setHighlight">
                            <bk-select-option
                                v-for="(option, index) of highlight.list"
                                :key="option"
                                :value="option"
                                :label="option">
                            </bk-select-option>
                        </bk-select>
                        <i class="icon-cc-resize-full"></i>
                    </div>
                </template>
                <bk-tabpanel name="name" title="name">
                    <div class="editor-box" :class="{'has-readonly': true}">
                        <div class="editor-content">
                            <p class="editor-title">自动保存草稿 21:28:45</p>
                            <ace class="ace-editor" :config="config">
                            </ace>
                        </div>
                        <div class="editor-content readonly">
                            <p class="editor-title">
                                示例文件（只读）
                                <i class="bk-icon icon-close"></i>
                            </p>
                            <ace class="ace-editor" :config="config">
                            </ace>
                        </div>
                    </div>
                </bk-tabpanel>
                <bk-tabpanel name="preview" title="预览">

                </bk-tabpanel>
            </bk-tab>
            <section class="editor-footer">
                <div class="editor-btn-group">
                    <bk-button type="default">返回</bk-button>
                    <bk-button type="primary">保存草稿</bk-button>
                    <bk-button type="primary">上线</bk-button>
                </div>
            </section>
        </div>
        <v-online-form 
            :isShow="true"
        ></v-online-form>
    </div>
</template>

<script>
    import ace from './ace'
    import vSidebar from './sidebar'
    import vOnlineForm from './onlineForm'
    export default {
        data () {
            return {
                config: {
                },
                editorTab: {
                    active: 'name'
                },
                highlight: {
                    selected: '',
                    list: [
                        'yaml',
                        'json'
                    ]
                }
            }
        },
        methods: {
            setHighlight () {

            }
        },
        components: {
            ace,
            vSidebar,
            vOnlineForm
        }
    }
</script>

<style lang="scss" scoped>
    .config-detail-wrapper {
        height: 100%;
        .editor-wrapper {
            height: 100%;
            overflow: hidden;
        }
        .editor-tab {
            margin: 20px 20px 0;
            height: calc(100% - 80px);
            border-bottom: none;
        }
        .info-wrapper {
            height: 100%;
        }
        .setting-wrapper {
            color: #737987;
            font-size: 0;
            .icon-cc-question,
            .icon-cc-resize-full {
                position: relative;
                top: -1px;
                font-size: 18px;
                color: #c3cdd7;
                vertical-align: middle;
                cursor: pointer;
            }
            .icon-cc-question {
                margin-right: 20px;
            }
            .icon-cc-resize-full {
                margin-left: 20px;
            }
            .title {
                display: inline-block;
                margin-right: 10px;
                font-size: 12px;
                vertical-align: bottom;
            }
            .highlight-select {
                display: inline-block;
                width: 80px;
                height: 26px;
                line-height: 1;
                font-size: 12px;
                vertical-align: middle;
            }
        }
        .editor-box {
            display: flex;
            height: 100%;
            .editor-content {
                flex: 1;
                height: 100%;
                .editor-title {
                    margin: 0;
                    padding-left: 20px;
                    height: 42px;
                    font-size: 14px;
                    line-height: 42px;
                    color: #c3cdd7;
                    background: #333c48;
                    border-bottom: 1px solid #737987;
                }
                .ace-editor {
                    height: calc(100% - 42px);
                }
                &.readonly {
                    .editor-title {
                        color: #737987;
                    }
                    .icon-close {
                        float: right;
                        font-size: 16px;
                        font-weight: bold;
                        margin: 13px 20px 0 0;
                        &:hover {
                            color: #c3cdd7;
                        }
                    }
                }
            }
            &.has-readonly {
                .editor-content {
                    &:first-child {
                        margin-right: 5px;
                    }
                    &:last-child {
                        margin-left: 5px;
                    }
                }
            }
        }
        .editor-footer {
            height: 60px;
            padding: 12px 20px;
            border-top: 1px solid #dde4eb;
            .editor-btn-group {
                float: right;
            }
        }
    }
</style>
