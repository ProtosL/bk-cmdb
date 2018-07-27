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
            <input class="info-content" type="text" v-if="editTitle==='template_name'">
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='template_name'"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件名称"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" v-if="editTitle==='file_name'">
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='file_name'"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["绝对路径"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" v-if="editTitle==='path'">
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='path'"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["所属用户"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" v-if="editTitle==='user'">
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='user'"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件权限"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" v-if="editTitle==='right'">
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='right'"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["输出格式"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <bk-select v-if="editTitle==='output'" class="highlight-select" :selected.sync="info.outputList" @on-selected="setOutput">
                <bk-select-option
                    v-for="(option, index) of info.output"
                    :key="option"
                    :value="option"
                    :label="option">
                </bk-select-option>
            </bk-select>
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='output'"></i>
            </span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件分组"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <input class="info-content" type="text" v-if="editTitle==='group'">
            <span class="info-content" v-else>
                TemplateName
                <i class="icon-cc-edit" @click="editTitle='group'"></i>
            </span>
        </li>
    </ul>
</template>

<script>
    export default {
        data () {
            return {
                editTitle: '',
                info: {
                    template_name: '',
                    file_name: '',
                    selected: '',
                    outputList: [
                        'UTF-8'
                    ]
                }
            }
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
                &:hover {
                    .icon-cc-edit {
                        display: inline-block;
                    }
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
