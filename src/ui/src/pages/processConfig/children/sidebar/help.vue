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
        <p>配置模版中又需要根据主机实例变化的参数，可以填写“主机变量”。</p>
        <p>配置实例生成时，这些“主机变量”会被实际主机的属性替换。</p>
        <p class="info">变量格式为${hostname}</p>
        <p>当前可用变量</p>
        <v-table
            class="help-table"
            :header="table.header" 
            :list="table.list" 
            :pagination.sync="table.pagination"
            :defaultSort="table.defaultSort"
            :wrapperMinusHeight="150"
            :sortable="false"
            :showFooter="false"
            @handlePageChange="setCurrentPage"
            @handleSizeChange="setCurrentSize"
            @handleSortChange="setCurrentSort">
            <template v-for="{id, name} in table.header" :slot="id" slot-scope="{ item }">
                <template v-if="id !== 'operation'">
                    {{item[id]}}
                </template>
                <template v-else>
                    <a href="javascript:;" class="operation-btn">复制</a>
                </template>
            </template>
        </v-table>
    </div>
</template>

<script>
    import vTable from '@/components/table/table'
    export default {
        data () {
            return {
                table: {
                    header: [{
                        id: 'name',
                        name: '名称'
                    }, {
                        id: 'desc',
                        name: '描述'
                    }, {
                        id: 'operation',
                        name: '操作'
                    }],
                    list: [{
                        desc: '简单文件',
                        name: 'hostname'
                    }, {
                        desc: '简单文件',
                        name: 'setname'
                    }],
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
            setCurrentPage (current) {
                this.table.pagination.current = current
                // this.getTableList()
            },
            setCurrentSize (size) {
                this.table.pagination.size = size
                this.setCurrentPage(1)
            },
            setCurrentSort (sort) {
                this.table.sort = sort
                this.setCurrentPage(1)
            }
        },
        components: {
            vTable
        }
    }
</script>

<style lang="scss" scoped>
    .help-wrapper {
        font-size: 14px;
        margin-top: 20px;
        p {
            margin: 0;
            line-height: 24px;
            &.info {
                color: #ffb400;
                margin: 10px 0;
            }
        }
        .help-table {
            margin-top: 5px;
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
