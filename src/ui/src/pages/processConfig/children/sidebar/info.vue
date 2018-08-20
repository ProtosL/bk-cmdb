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
    <ul class="info-form">
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件描述"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text"
                v-focus 
                v-model="info.template_name" 
                v-if="curEditContent==='template_name'"
                @blur="updateFormData('template_name', info.template_name)">
            <span class="info-content" v-else>
                {{formData.template_name | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('template_name')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件名称"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" 
            v-focus 
            v-model="info.file_name"
            v-if="curEditContent==='file_name'" 
            @blur="updateFormData('file_name', info.file_name)">
            <span class="info-content" v-else>
                {{formData.file_name | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('file_name')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["绝对路径"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" 
            v-focus 
            v-model="info.path"
            v-if="curEditContent==='path'" 
            @blur="updateFormData('path', info.path)">
            <span class="info-content" v-else>
                {{formData.path | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('path')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["所属用户"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" 
            v-focus 
            v-model="info.user"
            v-if="curEditContent==='user'" 
            @blur="updateFormData('user', info.user)">
            <span class="info-content" v-else>
                {{formData.user | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('user')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件权限"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <bk-select v-if="curEditContent==='right'" class="highlight-select" :selected.sync="info.right">
                <bk-select-option
                    v-for="(option, index) of info.rightList"
                    :key="option.id"
                    :value="option.id"
                    :label="option.name">
                </bk-select-option>
            </bk-select>
            <span class="info-content" v-else>
                {{formData.right | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('right')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["输出格式"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <bk-select v-if="curEditContent==='format'" class="highlight-select" :selected.sync="info.format">
                <bk-select-option
                    v-for="(option, index) of info.formatList"
                    :key="option.id"
                    :value="option.id"
                    :label="option.name">
                </bk-select-option>
            </bk-select>
            <span class="info-content" v-else>
                {{formData.format | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('format')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件分组"]')}}</span>
            </label>
            <input class="info-content" type="text" v-if="curEditContent==='group'" v-focus @blur="updateFormData('group', info.group)">
            <span class="info-content" v-else>
                {{formData.group | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('group')"></i>
            </span>
        </li>
    </ul>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data () {
            return {
                attribute: [],
                curEditContent: '',
                info: {
                    file_name: '',
                    template_name: '',
                    path: '',
                    user: '',
                    format: '',
                    right: '',
                    group: '',
                    formatList: [],
                    rightList: []
                }
            }
        },
        computed: {
            ...mapGetters('processConfig', ['formData']),
            ...mapGetters(['bkBizId'])
        },
        filters: {
            isEmpty (data) {
                if (!data.length) {
                    return '--'
                }
                return data
            }
        },
        methods: {
            editContent (key) {
                this.curEditContent = key
                this.info[key] = this.formData[key]
            },
            async updateFormData (key, value) {
                try {
                    let params = {}
                    params[key] = value
                    const res = await this.$store.dispatch('processConfig/editConfigTemplate', {
                        bkBizId: this.bkBizId,
                        templateId: 1,
                        params
                    })
                    if (res.result) {
                        this.curEditContent = ''
                        this.$store.commit('processConfig/setFormData', {key: value})
                    } else {
                        this.$alertMsg(res.data['bk_error_msg'])
                    }
                } catch (e) {
                    this.$alertMsg(e.message || e.data['bk_error_msg'] || e.statusText)
                }
            },
            getFormData () {
                for (let key in this.formData) {
                    this.info[key] = this.formData[key]
                }
            },
            async getAttribute () {
                try {
                    const res = await this.$store.dispatch('object/getAttribute', {objId: 'config_template'})
                    if (res.result) {
                        this.attribute = res.data;
                        ['format', 'right'].map(attr => {
                            let property = this.attribute.find(({bk_property_id: bkPropertyId}) => bkPropertyId === attr)
                            if (property) {
                                this.info[`${attr}List`] = property.option
                                let defaultValue = property.option.find(({is_default: isDefault}) => isDefault)
                                if (defaultValue) {
                                    this.info[attr] = this.info[attr] === '' ? defaultValue.id : this.info[attr]
                                    if (!this.formData[attr]) {
                                        let params = {}
                                        params[attr] = this.info[attr]
                                        this.$store.commit('processConfig/setFormData', params)
                                    }
                                }
                            }
                        })
                    } else {
                        this.$alert(res.data['bk_error_msg'])
                    }
                } catch (e) {
                    this.$alertMsg(e.message || e.data['bk_error_msg'] || e.statusText)
                }
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        created () {
            this.getFormData()
            this.getAttribute()
        }
    }
</script>

<style lang="scss" scoped>
    .info-form {
        padding-top: 15px;
        li {
            height: 34px;
            line-height: 34px;
            font-size: 14px;
            color: #737987;
            &:hover {
                .info-content .icon-cc-edit {
                    display: inline-block;
                }
            }
            label {
                float: left;
                width: 84px;
                height: 34px;
                font-size: 0;
                span {
                    font-size: 14px;
                }
                .title {
                    display: inline-block;
                    width: 60px;
                    @include ellipsis;
                }
            }
            .color-danger {
                position: absolute;
                font-size: 14px;
            }
            .info-content {
                display: inline-block;
                width: 230px;
                @include ellipsis;
                .icon-cc-edit {
                    display: none;
                    cursor: pointer;
                }
            }
            .highlight-select {
                display: inline-block;
                width: 230px;
                line-height: 1;
                vertical-align: middle;
            }
        }
    }
</style>
