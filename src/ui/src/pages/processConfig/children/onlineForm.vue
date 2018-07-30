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
            <p class="form-title">{{$t('ProcessConfig["上线"]')}}aaa</p>
            <ul class="content-group clearfix">
                <li>
                    <label for="desc">
                        {{$t('ProcessConfig["文件名称"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" class="bk-form-input" placeholder="请输入">
                </li>
                <li>
                    <label for="desc">
                        {{$t('ProcessConfig["绝对路径"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" class="bk-form-input" placeholder="请输入">
                </li>
                <li>
                    <label for="desc">
                        {{$t('ProcessConfig["所属用户"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" class="bk-form-input" placeholder="请输入">
                </li>
                <li>
                    <label for="desc">
                        {{$t('ProcessConfig["文件权限"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <input id="desc" type="text" class="bk-form-input" placeholder="请输入">
                </li>
                <li>
                    <label for="desc">
                        {{$t('ProcessConfig["输出格式"]')}}
                        <span class="color-danger">*</span>
                    </label>
                    <bk-select class="output-select" :selected.sync="output.selected" @on-selected="setOutput">
                        <bk-select-option
                            v-for="(option, index) of output.list"
                            :key="option"
                            :value="option"
                            :label="option">
                        </bk-select-option>
                    </bk-select>
                </li>
                <li>
                    <label for="desc">
                        {{$t('ProcessConfig["文件分组"]')}}
                    </label>
                    <input id="desc" type="text" class="bk-form-input" placeholder="请输入">
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
    export default {
        data () {
            return {
                isShow: true,
                output: {
                    list: [
                        'UTF-8'
                    ],
                    selected: ''
                }
            }
        },
        methods: {
            setOutput () {

            },
            submitForm () {
            },
            closeForm () {
                this.isShow = false
                setTimeout(() => {
                    this.$emit('closeForm')
                }, 300)
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
            margin: 20px auto 0;
            padding: 0 60px;
            >li {
                float: left;
                margin-top: 15px;
                width: 220px;
                &:nth-child(2n) {
                    margin-left: 30px;
                }
                input,
                .output-select {
                    margin-top: 5px;
                    width: 220px;
                }
            }
        }
        .form-btn-group {
            margin-top: 60px;
        }
    }
</style>
