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
    <div class="help-wrapper">
        <p>{{$t('ConfigTemplate["配置模版中又需要根据主机实例变化的参数，可以填写“主机变量”。"]')}}</p>
        <p>{{$t('ConfigTemplate["配置实例生成时，这些“主机变量”会被实际主机的属性替换。"]')}}</p>
        <p class="info">{{$t('ConfigTemplate["变量格式为"]')}}${hostname}</p>
        <p class="mb5">{{$t('ConfigTemplate["当前可用变量"]')}}</p>
        <div class="help-table-wrapper">
            <v-table
                class="help-table"
                :loading="table.isLoading"
                :header="table.header" 
                :list="table.list" 
                :pagination.sync="table.pagination"
                :defaultSort="table.defaultSort"
                :wrapperMinusHeight="328"
                :sortable="false"
                :showFooter="false">
                <template v-for="{id, name} in table.header" :slot="id" slot-scope="{ item }">
                    <template v-if="id !== 'operation'">
                        {{item[id]}}
                    </template>
                    <template v-else>
                        <a href="javascript:;" class="operation-btn copy" :data-clipboard-text="`\${${item.name}}`">{{$t('Common["复制"]')}}</a>
                    </template>
                </template>
            </v-table>
        </div>
    </div>
</template>

<script>
    import vTable from '@/components/table/table'
    import Clipboard from 'clipboard'
    export default {
        data () {
            return {
                clipboard: {},
                table: {
                    isLoading: false,
                    header: [{
                        id: 'name',
                        name: this.$t('Hosts[\'名称\']')
                    }, {
                        id: 'desc',
                        name: this.$t('OperationAudit["描述"]'),
                        width: 100
                    }, {
                        id: 'operation',
                        name: this.$t('Association["操作"]'),
                        width: 60
                    }],
                    list: [],
                    chooseId: [],
                    pagination: {
                        count: 1,
                        size: 10,
                        current: 1
                    },
                    defaultSort: '-disc',
                    sort: ''
                }
            }
        },
        methods: {
            async getTableList () {
                this.table.isLoading = true
                const res = await Promise.all([
                    this.$store.dispatch('object/getAttribute', {objId: 'host'}),
                    this.$store.dispatch('object/getAttribute', {objId: 'set'}),
                    this.$store.dispatch('object/getAttribute', {objId: 'module'})
                ])
                let list = []
                res.map(({data}) => {
                    data.map(({bk_property_id: bkPropertyId}) => {
                        list.push({
                            name: bkPropertyId
                        })
                    })
                })
                this.table.list = list
                this.table.isLoading = false
            }
        },
        mounted () {
            this.clipboard = new Clipboard('.copy')
            this.clipboard.on('success', () => {
                this.$alertMsg(this.$t('Common["复制成功"]'), 'success')
            })
            this.clipboard.on('error', () => {
                this.$alertMsg(this.$t('Common["复制失败"]'))
            })
        },
        created () {
            this.getTableList()
        },
        destroyed () {
            this.clipboard.destroy()
        },
        components: {
            vTable
        }
    }
</script>

<style lang="scss" scoped>
    .help-wrapper {
        font-size: 14px;
        padding-top: 20px;
        height: 100%;
        p {
            margin: 0;
            line-height: 24px;
            &.info {
                color: #ffb400;
                margin: 10px 0;
            }
        }
        .help-table-wrapper {
            height: calc(100% - 169px);
            overflow: auto;
        }
        .help-table {
            .operation-btn {
                color: #3c96ff;
                &:hover {
                    color: #0082ff;
                }
                &:active {
                    color: #3c96ff;
                }
            }
        }
    }
</style>
