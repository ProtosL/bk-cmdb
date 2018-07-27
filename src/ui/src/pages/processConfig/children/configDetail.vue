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
    <div class="config-detail-wrapper">
        <v-sidebar></v-sidebar>
        <div class="editor-wrapper">
            <bk-tab class="editor-tab" type="fill" :active-name.sync="editorTab.active">
                <template slot="setting">
                    <div class="setting-wrapper">
                        <!-- <div class="question-icon-box">
                            <i class="icon-cc-question" v-if="editorTab.active === 'name'"></i>
                            <div class="first-entry-mask"></div>
                            <div class="tooltip">点此查看进程配置文件示例</div>
                        </div> -->
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
                    <v-preview></v-preview>
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
            :isShow="false"
        ></v-online-form>
    </div>
</template>

<script>
    import ace from './ace'
    import vSidebar from './sidebar'
    import vOnlineForm from './onlineForm'
    import vPreview from './preview'
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
            vOnlineForm,
            vPreview
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
            .question-icon-box {
                position: relative;
                display: inline-block;
                .icon-cc-question {
                    display: inline-block;
                    z-index: 1203;
                    margin-right: 20px;
                    padding: 3px;
                    border-radius: 50%;
                    background: #fafbfd;
                }
                .first-entry-mask {
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: rgba(0, 0, 0, .5);
                    z-index: 1202;
                }
                .tooltip {
                    position: absolute;
                    margin-left: -108px;
                    padding: 20px 36px;
                    top: 50px;
                    left: 0;
                    width: 240px;
                    min-height: 60px;
                    background: #fff;
                    border-radius: 2px;
                    color: #737987;
                    font-size: 14px;
                    line-height: 20px;
                    animation: tooltip-animation 1.8s infinite;
                    &:before {
                        position: absolute;
                        content: "";
                        width: 0;
                        height: 0;
                        border: 7px solid transparent;
                        border-bottom-color: #fff;
                        top: -14px;
                        left: 113px;
                    }
                }
            }
            .icon-cc-question,
            .icon-cc-resize-full {
                position: relative;
                top: -1px;
                font-size: 18px;
                color: #c3cdd7;
                vertical-align: middle;
                cursor: pointer;
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
