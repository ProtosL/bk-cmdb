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
        :width="460" 
        :padding="0">
        <div class="form-content" slot="content">
            <p class="form-title">{{$t('ConfigTemplate["新建进程配置文件模版"]')}}</p>
            <div class="content-group clearfix">
                <label for="desc">
                    {{$t('ConfigTemplate["文件描述"]')}}
                    <span class="color-danger">*</span>
                </label>
                <div class="input-box">
                    <input id="desc" type="text" class="bk-form-input" :placeholder="$t('ConfigTemplate[\'请输入\']')" v-model="templateName" v-focus
                        @blur="validate"
                        :data-vv-name="$t('ConfigTemplate[\'文件描述\']')"
                        v-validate="'required|singlechar'">
                    <span v-show="errors.has($t('ConfigTemplate[\'文件描述\']'))" class="error-msg is-danger">{{ errors.first($t('ConfigTemplate[\'文件描述\']')) }}</span>
                </div>
            </div>
            <div class="form-btn-group clearfix">
                <div class="fr">
                    <bk-button type="primary" class="form-btn" @click="submitForm">{{$t('Common["确认"]')}}</bk-button>
                    <bk-button type="default" class="form-btn vice-btn" @click="closeForm">{{$t('Common["取消"]')}}</bk-button>
                </div>
            </div>
        </div>
    </bk-dialog>
</template>

<script>
    export default {
        props: {
            bkBizId: {
                required: true
            }
        },
        data () {
            return {
                templateName: '',
                isShow: true
            }
        },
        methods: {
            validate () {
                this.$validator.validateAll()
            },
            submitForm () {
                this.$validator.validateAll().then(async res => {
                    if (res) {
                        let params = {
                            template_name: this.templateName,
                            file_name: '',
                            path: '',
                            user: '',
                            format: 'utf8',
                            right: '644',
                            group: ''
                        }
                        const res = await this.$store.dispatch('configTemplate/createConfigTemplate', {
                            bkBizId: this.bkBizId, params
                        })
                        if (res.result) {
                            this.$store.commit('configTemplate/setFormData', {template_name: this.templateName})
                            this.$emit('submitForm')
                        } else {
                            this.$alertMsg(res['bk_error_msg'])
                        }
                    }
                })
            },
            closeForm () {
                this.isShow = false
                setTimeout(() => {
                    this.$emit('closeForm')
                }, 300)
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
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
            margin: 50px auto 0;
            line-height: 36px;
            text-align: center;
            label {
                display: inline-block;
                vertical-align: top;
            }
            .input-box {
                display: inline-block;
                width: 266px;
                margin-left: 10px;
            }
            .error-msg{
                float: left;
                line-height: 16px;
            }
        }
    }
</style>
