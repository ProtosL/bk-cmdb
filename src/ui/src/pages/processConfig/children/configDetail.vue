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
        <v-sidebar
            @contrast="contrast"
            @toggleSidebar="resizeEditor"
        ></v-sidebar>
        <div class="editor-wrapper">
            <v-fullscreen class="fullscreen"
                :isFullscreen.sync="editorTab.isFullScreen"
                ref="fullscreen"
                @fullscreenChange="fullscreenChange">
                <bk-tab class="editor-tab" type="fill" :active-name.sync="editorTab.active">
                    <template slot="setting">
                        <div class="setting-wrapper">
                            <div class="question-icon-box">
                                <i class="icon-cc-question" v-if="editorTab.active === 'name'" @click="toggleSample"></i>
                                <template v-if="false">
                                    <div class="first-entry-mask"></div>
                                    <div class="tooltip">{{$t('ConfigTemplate["点此查看进程配置文件示例"]')}}</div>
                                </template>
                            </div>
                            <span class="title">{{$t('ConfigTemplate["高亮风格"]')}}</span>
                            <bk-select class="highlight-select" :selected.sync="highlight.selected" @on-selected="setHighlight">
                                <bk-select-option
                                    v-for="(option, index) of highlight.list"
                                    :key="option"
                                    :value="option"
                                    :label="option">
                                </bk-select-option>
                            </bk-select>
                            <i class="icon-cc-resize icon-cc-resize-full" v-if="!editorTab.isFullScreen" @click="toggleFullScreen"></i>
                            <i class="icon-cc-resize icon-cc-resize-small" v-else @click="toggleFullScreen"></i>
                        </div>
                    </template>
                    <bk-tabpanel name="name" title="name">
                        <div class="editor-box" :class="{'has-sample': sample.isShow}">
                            <div class="editor-content">
                                <p class="editor-title">
                                    <template v-if="editInfo.time">
                                    自动保存草稿 21:28:45
                                    </template>
                                </p>
                                <ace class="ace-editor" 
                                    :config="editConfig"
                                    @init="aceEditInit">
                                </ace>
                            </div>
                            <div v-if="sample.isShow" class="editor-content readonly">
                                <p class="editor-title">
                                    {{$t('ConfigTemplate["示例文件（只读）"]')}}
                                    <i class="bk-icon icon-close" @click="sample.isShow=false"></i>
                                </p>
                                <ace class="ace-editor" 
                                :config="sampleConfig"
                                @init="aceSampleInit">
                                </ace>
                            </div>
                        </div>
                    </bk-tabpanel>
                    <bk-tabpanel name="preview" title="预览">
                        <v-preview></v-preview>
                    </bk-tabpanel>
                </bk-tab>
            </v-fullscreen>
            <section class="editor-footer">
                <div class="editor-btn-group">
                    <bk-button type="default" @click="cancel">返回</bk-button>
                    <bk-button type="primary" @click="saveDraft">保存草稿</bk-button>
                    <bk-button type="primary" @click="online">上线</bk-button>
                </div>
            </section>
        </div>
        <v-online-form 
            v-if="onLineForm.isShow"
            @submitForm="submitOnlineForm"
            @closeForm="onLineForm.isShow = false"
        ></v-online-form>
    </div>
</template>

<script>
    import ace from './ace'
    import vSidebar from './sidebar'
    import vOnlineForm from './onlineForm'
    import vPreview from './preview'
    import vFullscreen from '@/components/fullscreen/fullscreen'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                attribute: [],
                editConfig: {
                    mode: ''
                },
                sampleConfig: {
                    mode: '',
                    readOnly: true
                },
                editorTab: {
                    active: 'name',
                    isFullScreen: false
                },
                onLineForm: {
                    isShow: false
                },
                sample: {
                    isShow: false
                },
                highlight: {
                    selected: '',
                    list: [
                        'yaml',
                        'json'
                    ]
                },
                $aceEdit: null,
                $aceSample: null,
                editInfo: {
                    time: '',
                    timer: null,
                    isAutoSave: false
                }
            }
        },
        computed: {
            ...mapGetters(['bkBizId']),
            ...mapGetters('configTemplate', [
                'formData',
                'currentVersion'
            ])
        },
        watch: {
            'sample.isShow' () {
                this.resizeEditor()
            }
        },
        methods: {
            ...mapActions('configTemplate', [
                'editConfigTemplateVersion',
                'getConfigTemplateVersion',
                'createConfigTemplateVersion'
            ]),
            ...mapMutations('configTemplate', [
                'setTemplateVersion'
            ]),
            resizeEditor () {
                this.$nextTick(() => {
                    this.$aceEdit.resize()
                })
            },
            contrast (item) {
                this.sample.isShow = true
                this.$nextTick(() => {
                    this.$aceSample.setValue(item.content, 1)
                })
            },
            submitOnlineForm () {
                this.onLineForm.isShow = false
                clearTimeout(this.editInfo.timer)
                this.editInfo.timer = null
            },
            toggleFullScreen () {
                this.editorTab.isFullScreen = !this.editorTab.isFullScreen
                if (this.editorTab.isFullScreen) {
                    this.$refs.fullscreen.launchFullscreen()
                }
            },
            fullscreenChange (isFullscreen) {
                this.editorTab.isFullScreen = isFullscreen
            },
            toggleSample () {
                this.sample.isShow = !this.sample.isShow
            },
            setHighlight (mode) {
                this.config.mode = mode.value
            },
            aceSampleInit ($ace) {
                this.$aceSample = $ace
            },
            aceEditInit ($ace) {
                this.$aceEdit = $ace
                this.$aceEdit.on('change', () => {
                    if (this.editInfo.timer === null && this.editInfo.isAutoSave) {
                        this.autoSave()
                    }
                })
            },
            online () {
                this.onLineForm.isShow = true
            },
            saveDraft () {
                clearTimeout(this.editInfo.timer)
                this.editInfo.timer = null
                this.updateConfig()
            },
            async createTemplateVersion () {
                await this.createConfigTemplateVersion({
                    bkBizId: this.bkBizId,
                    templateId: this.formData['template_id'],
                    params: {
                        content: this.$aceEdit.getValue(),
                        status: 'draft'
                    }
                })
                await this.getTemplateVersion()
                this.autoSave()
            },
            async editTemplateVersion () {
                const res = await this.editConfigTemplateVersion({
                    bkBizId: this.bkBizId,
                    templateId: this.formData['template_id'],
                    versionId: this.currentVersion['version_id'],
                    params: {
                        content: this.$aceEdit.getValue()
                    }
                })
                this.autoSave()
                if (!res.result) {
                    this.$alertMsg(res.data['bk_error_msg'])
                }
            },
            updateConfig () {
                if (this.currentVersion === null || this.currentVersion.status !== 'draft') {
                    this.createTemplateVersion()
                } else {
                    this.editTemplateVersion()
                }
            },
            async getTemplateVersion () {
                let params = {
                    page: {
                        start: 0,
                        limit: 1,
                        sort: '-version_id'
                    },
                    condition: {}
                }
                const res = await this.getConfigTemplateVersion({bkBizId: this.bkBizId, templateId: this.formData['template_id'], params})
                this.setTemplateVersion(res.data.info)
            },
            cancel () {
                this.$emit('cancel')
            },
            autoSave () {
                this.editInfo.timer = setTimeout(() => {
                    this.updateConfig()
                }, 10000)
            },
            setValue () {
                if (this.currentVersion) {
                    this.$aceEdit.setValue(this.currentVersion['content'], 1)
                }
                this.editInfo.isAutoSave = true
            }
        },
        async created () {
            await this.getTemplateVersion()
            this.setValue()
        },
        destroyed () {
            clearTimeout(this.editInfo.timer)
            this.editInfo.timer = null
        },
        components: {
            ace,
            vSidebar,
            vOnlineForm,
            vPreview,
            vFullscreen
        }
    }
</script>

<style lang="scss" scoped>
    .config-detail-wrapper {
        height: 100%;
        .editor-wrapper {
            height: 100%;
            overflow: hidden;
            .fullscreen {
                height: calc(100% - 80px);
                margin: 20px 20px 0;
            }
        }
        .editor-tab {
            height: 100%;
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
                    animation: tooltip-animation 1.8s infinite cubic-bezier(0.61, 0.84, 0.83, 0.99);
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
            .icon-cc-resize {
                position: relative;
                top: -1px;
                font-size: 18px;
                color: #c3cdd7;
                vertical-align: middle;
                cursor: pointer;
            }
            .icon-cc-resize {
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
                        cursor: pointer;
                        &:hover {
                            color: #c3cdd7;
                        }
                    }
                }
            }
            &.has-sample {
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
