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
    <div class="preview-wrapper">
        <p class="preview-title">
            <label for="">服务器<span class="color-danger">*</span></label>
            <bk-select class="server-select" :selected.sync="server.selected" @on-selected="setServer">
                <bk-select-option
                    v-for="(option, index) of server.list"
                    :key="option"
                    :value="option"
                    :label="option">
                </bk-select-option>
            </bk-select>
        </p>
        <ace class="preview-editor"></ace>
        <div class="preview-mask" v-if="false">
            <div class="loading" v-bkloading="{isLoading: false}"></div>
        </div>
    </div>
</template>

<script>
    import ace from './ace'
    export default {
        data () {
            return {
                server: {
                    list: [],
                    selected: ''
                }
            }
        },
        methods: {
            setServer () {

            }
        },
        components: {
            ace
        }
    }
</script>

<style lang="scss" scoped>
    .preview-wrapper {
        height: 100%;
        p {
            margin: 0;
        }
        .preview-title {
            padding-left: 20px;
            line-height: 42px;
            height: 42px;
            font-size: 14px;
            color: #c3cdd7;
            background: #333c48;
            .server-select {
                display: inline-block;
                margin-left: 10px;
                line-height: 1;
                width: 200px;
                height: 26px;
                vertical-align: middle;
            }
        }
        .preview-editor {
            height: calc(100% - 42px);
        }
        .preview-mask {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1202;
            background: rgba(0, 0, 0, .6);
            .loading {
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
