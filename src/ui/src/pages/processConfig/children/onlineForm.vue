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
    <bk-dialog
        :is-show.sync="isShow" 
        :has-header="false" 
        :has-footer="false" 
        :quick-close="false"
        :width="590" 
        :padding="0">
        <div class="form-content" slot="content">
            <p class="form-title">{{$t('ConfigTemplate["上线"]')}}aaa</p>
            <ul class="content-group clearfix">
                <li>
                    <label for="desc">
                        {{$t('ConfigTemplate["文件名称"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" v-model="info.file_name" class="bk-form-input" placeholder="请输入"
                        @blur="validate"
                        :data-vv-name="$t('ConfigTemplate[\'文件名称\']')"
                        v-validate="'required|singlechar'">
                    <span v-show="errors.has($t('ConfigTemplate[\'文件名称\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'文件名称\']')) }}</span>
                </li>
                <li>
                    <label for="desc">
                        {{$t('ConfigTemplate["绝对路径"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" v-model="info.path" class="bk-form-input" placeholder="请输入"
                        @blur="validate"
                        :data-vv-name="$t('ConfigTemplate[\'绝对路径\']')"
                        v-validate="'required|singlechar'">
                    <span v-show="errors.has($t('ConfigTemplate[\'绝对路径\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'绝对路径\']')) }}</span>
                </li>
                <li>
                    <label for="desc">
                        {{$t('ConfigTemplate["所属用户"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" v-model="info.user" class="bk-form-input" placeholder="请输入"
                        @blur="validate"
                        :data-vv-name="$t('ConfigTemplate[\'所属用户\']')"
                        v-validate="'required|singlechar'">
                    <span v-show="errors.has($t('ConfigTemplate[\'所属用户\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'所属用户\']')) }}</span>
                </li>
                <li>
                    <label for="desc">
                        {{$t('ConfigTemplate["文件权限"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <bk-select class="select-box" :selected.sync="info.right">
                        <bk-select-option
                            v-for="(option, index) of info.rightList"
                            :key="option.id"
                            :value="option.id"
                            :label="option.name">
                        </bk-select-option>
                    </bk-select>
                </li>
                <li>
                    <label for="desc">
                        {{$t('ConfigTemplate["输出格式"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <bk-select class="select-box" :selected.sync="info.format">
                        <bk-select-option
                            v-for="(option, index) of info.formatList"
                            :key="option.id"
                            :value="option.id"
                            :label="option.name">
                        </bk-select-option>
                    </bk-select>
                </li>
                <li>
                    <label for="desc">
                        {{$t('ConfigTemplate["文件分组"]')}}
                    </label>
                    <input id="desc" type="text" v-model="info.group" class="bk-form-input" placeholder="请输入">
                </li>
            </ul>
            <div class="form-btn-group clearfix">
                <div class="fr">
                    <bk-button type="primary" class="form-btn" @click="submitForm">{{$t('Common["保存"]')}}</bk-button>
                    <bk-button type="default" class="form-btn vice-btn" @click="closeForm">{{$t('Common["取消"]')}}</bk-button>
                </div>
            </div>
        </div>
    </bk-dialog>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                isShow: true,
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
            ...mapGetters([
                'bkBizId'
            ]),
            ...mapGetters('configTemplate', [
                'formData',
                'templateVersion'
            ])
        },
        methods: {
            ...mapActions('configTemplate', [
                'editConfigTemplate',
                'editConfigTemplateVersion'
            ]),
            ...mapMutations('configTemplate', [
                'setFormData'
            ]),
            validate () {
                this.$validator.validateAll()
            },
            submitForm () {
                this.$validator.validateAll().then(async res => {
                    if (res) {
                        this.$emit('submitForm')
                        let editParams = {
                            file_name: this.info['file_name'],
                            format: this.info.format,
                            group: this.info.group,
                            path: this.info.path,
                            user: this.info.user,
                            right: this.info.right
                        }
                        await this.editConfigTemplate({
                            bkBizId: this.bkBizId,
                            templateId: this.info['template_id'],
                            params: editParams
                        })
                        this.setFormData(editParams)
                        this.editConfigTemplateVersion({
                            bkBizId: this.bkBizId,
                            templateId: this.info['template_id'],
                            versionId: this.templateVersion[0]['version_id'],
                            params: {
                                status: 'online'
                            }
                        })
                    }
                })
            },
            closeForm () {
                this.isShow = false
                setTimeout(() => {
                    this.$emit('closeForm')
                }, 300)
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
                            }
                        }
                    })
                } else {
                    this.$alert(res.data['bk_error_msg'])
                }
            }
        },
        created () {
            this.getAttribute()
            this.getFormData()
        }
    }
</script>

<style lang="scss" scoped>
    .form-content {
        padding: 50px 0 0;
        .form-title {
            line-height: 1;
            text-align: center;
            font-size: 22px;
            font-weight: normal;
            color: #333948;
        }
        .content-group {
            margin: 20px auto 0;
            padding: 0 60px;
            >li {
                position: relative;
                float: left;
                margin-top: 15px;
                width: 220px;
                &:nth-child(2n) {
                    margin-left: 30px;
                }
                input,
                .select-box {
                    margin-top: 5px;
                    width: 220px;
                }
            }
            .error-msg{
                position: absolute;
                bottom: -15px;
                left: 0;
                line-height: 1;
            }
        }
        .form-btn-group {
            margin-top: 60px;
        }
    }
</style>
