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
    <div class="info-wrapper fr">
        <a href="javascript:void(0);" class="bk-icon icon-angle-right detail-toggle" :class="{'close': !isOpen}" @click="toggleSidebar"></a>
        <div class="tab-wrapper" v-if="this.isOpen">
            <bk-tab class="detail-tab" :active-name.sync="tab.active">
                <bk-tabpanel name="info" :title="$t('ProcessConfig[\'基本信息\']')">
                    <v-info></v-info>
                </bk-tabpanel>
                <bk-tabpanel name="history" :title="$t('ProcessConfig[\'历史记录\']')">
                    <v-history></v-history>
                </bk-tabpanel>
                <bk-tabpanel name="help" :title="$t('ProcessConfig[\'帮助\']')">
                    <v-help></v-help>
                </bk-tabpanel>
            </bk-tab>
        </div>
    </div>
</template>

<script>
    import vInfo from './sidebar/info'
    import vHistory from './sidebar/history'
    import vHelp from './sidebar/help'
    export default {
        data () {
            return {
                isOpen: true,
                tab: {
                    active: 'info'
                }
            }
        },
        methods: {
            toggleSidebar () {
                this.isOpen = !this.isOpen
            }
        },
        components: {
            vInfo,
            vHistory,
            vHelp
        }
    }
</script>

<style lang="scss" scoped>
    .info-wrapper {
        position: relative;
        height: 100%;
        .detail-toggle {
            position: absolute;
            right: 100%;
            top: 50%;
            margin-top: -50px;
            width: 14px;
            height: 100px;
            line-height: 100px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            border-radius: 12px 0 0 12px;
            background-color: #c3cdd7;
            &:hover {
                background: #3c96ff;
            }
            &.close {
                transform: rotate(180deg);
                border-radius: 0 12px 12px 0;
            }
        }
        .tab-wrapper {
            position: relative;
            width: 360px;
            padding: 0 20px 20px;
            height: 100%;
            border-left: 1px solid #dde4eb;
            .detail-tab {
                border: none;
                height: 100%;
            }
        }
    }
</style>
