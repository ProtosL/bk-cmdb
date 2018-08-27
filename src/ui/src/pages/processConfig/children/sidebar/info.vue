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
                <span class="title">{{$t('ConfigTemplate["文件描述"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">
                {{formData.template_name | isEmpty}}
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ConfigTemplate["文件名称"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <div class="input-box" v-if="curEditContent==='file_name'">
                <input class="info-content" type="text" 
                v-focus 
                v-model="info.file_name"
                :data-vv-name="$t('ConfigTemplate[\'文件名称\']')"
                v-validate="'singlechar'"
                @blur="validateValue('file_name', info.file_name)">
                <span v-show="errors.has($t('ConfigTemplate[\'文件名称\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'文件名称\']')) }}</span>
            </div>
            <span class="info-content" v-else>
                {{formData.file_name | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('file_name')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ConfigTemplate["绝对路径"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <div class="input-box" v-if="curEditContent==='path'">
                <input class="info-content" type="text" 
                v-focus 
                v-model="info.path"
                :data-vv-name="$t('ConfigTemplate[\'绝对路径\']')"
                v-validate="'singlechar'"
                @blur="validateValue('path', info.path)">
                <span v-show="errors.has($t('ConfigTemplate[\'绝对路径\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'绝对路径\']')) }}</span>
            </div>
            <span class="info-content" v-else>
                {{formData.path | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('path')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ConfigTemplate["所属用户"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <div class="input-box" v-if="curEditContent==='user'">
                <input class="info-content" type="text" 
                v-focus 
                v-model="info.user"
                :data-vv-name="$t('ConfigTemplate[\'所属用户\']')"
                v-validate="'singlechar'"
                @blur="validateValue('user', info.user)">
                <span v-show="errors.has($t('ConfigTemplate[\'所属用户\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'所属用户\']')) }}</span>
            </div>
            <span class="info-content" v-else>
                {{formData.user | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('user')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ConfigTemplate["文件权限"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <div class="select-wrapper" v-if="curEditContent==='right'">
                <bk-select class="highlight-select" :selected.sync="info.right">
                    <bk-select-option
                        v-for="(option, index) of info.rightList"
                        :key="option.id"
                        :value="option.id"
                        :label="option.name">
                    </bk-select-option>
                </bk-select>
                <div class="mask" @click="updateFormData('right', info.right)"></div>
            </div>
            <span class="info-content" v-else>
                {{formData.right | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('right')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ConfigTemplate["输出格式"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <div class="select-wrapper" v-if="curEditContent==='format'">
                <bk-select class="highlight-select" :selected.sync="info.format">
                    <bk-select-option
                        v-for="(option, index) of info.formatList"
                        :key="option.id"
                        :value="option.id"
                        :label="option.name">
                    </bk-select-option>
                </bk-select>
                <div class="mask" @click="updateFormData('format', info.format)"></div>
            </div>
            <span class="info-content" v-else>
                {{formData.format | isEmpty}}
                <i class="icon-cc-edit" @click="editContent('format')"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ConfigTemplate["文件分组"]')}}</span>
            </label>
            <div class="input-box" v-if="curEditContent==='group'">
                <input class="info-content" type="text"
                    v-focus 
                    v-model="info.group" 
                    :data-vv-name="$t('ConfigTemplate[\'文件分组\']')"
                    v-validate="'singlechar'"
                    @blur="validateValue('group', info.template_name)">
                    <span v-show="errors.has($t('ConfigTemplate[\'文件分组\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'文件分组\']')) }}</span>
            </div>
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
                    description: '',
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
            ...mapGetters('configTemplate', ['formData']),
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
            validateValue (key, value) {
                this.$validator.validateAll().then(res => {
                    if (res) {
                        this.updateFormData(key, value)
                    }
                })
            },
            async updateFormData (key, value) {
                let params = {}
                params[key] = value
                const res = await this.$store.dispatch('configTemplate/editConfigTemplate', {
                    bkBizId: this.bkBizId,
                    templateId: this.formData['template_id'],
                    params
                })
                if (res.result) {
                    this.curEditContent = ''
                    this.$store.commit('configTemplate/setFormData', params)
                } else {
                    this.$alertMsg(res.data['bk_error_msg'])
                }
            },
            getFormData () {
                for (let key in this.formData) {
                    this.info[key] = this.formData[key]
                }
            },
            async getAttribute () {
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
                                    this.$store.commit('configTemplate/setFormData', params)
                                }
                            }
                        }
                    })
                } else {
                    this.$alert(res.data['bk_error_msg'])
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
                line-height: 34px;
                vertical-align: middle;
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
            .input-box{
                display: inline-block;
                line-height: 34px;
                .info-content{
                    line-height: 1;
                }
                .error-msg{
                    display: block;
                    line-height: 1;
                }
            }
            .info-content {
                display: inline-block;
                width: 230px;
                @include ellipsis;
                line-height: 34px;
                vertical-align: middle;
                .icon-cc-edit {
                    display: none;
                    cursor: pointer;
                }
            }
            .select-wrapper {
                .mask {
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                }
            }
            .highlight-select {
                display: inline-block;
                width: 230px;
                padding-top: 4px;
                height: 34px;
                vertical-align: middle;
            }
        }
    }
</style>
