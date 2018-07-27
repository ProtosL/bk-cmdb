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
    <v-table
        class="history-table"
        :header="table.header" 
        :list="table.list" 
        :pagination.sync="table.pagination"
        :defaultSort="table.defaultSort"
        :wrapperMinusHeight="150"
        :sortable="false"
        @handlePageChange="setCurrentPage"
        @handleSizeChange="setCurrentSize"
        @handleSortChange="setCurrentSort">
        <div class="aaa">
            <template slot="operation" slot-scope="{ item }">
                <a href="javascript:;" class="operation-btn">对比</a>
            </template>
            </div>
    </v-table>
</template>

<script>
    import vTable from '@/components/table/table'
    export default {
        data () {
            return {
                table: {
                    header: [{
                        id: 'desc',
                        name: '描述',
                        width: 79
                    }, {
                        id: 'time',
                        name: '操作时间',
                        width: 79
                    }, {
                        id: 'user',
                        name: '操作人',
                        width: 79
                    }, {
                        id: 'operation',
                        name: '操作',
                        width: 79
                    }],
                    list: [{
                        desc: '简单文件',
                        time: '2018-07-06 18:16:03',
                        user: 'bencemo'
                    }],
                    chooseId: [],
                    pagination: {
                        count: 1,
                        size: 10,
                        current: 1
                    },
                    defaultSort: '-desc',
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
    .history-table {
        margin-top: 22px;
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
</style>
