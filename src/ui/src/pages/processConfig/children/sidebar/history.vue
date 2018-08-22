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
    <div class="history-table-wrapper">
        <v-table
            class="history-table"
            :header="table.header" 
            :list="table.list" 
            :pagination.sync="table.pagination"
            :defaultSort="table.defaultSort"
            :wrapperMinusHeight="150"
            :sortable="false"
            @handlRowMouseover="handlRowMouseover"
            @handlePageChange="setCurrentPage"
            @handleSizeChange="setCurrentSize"
            @handleSortChange="setCurrentSort">
            <template slot="create_time" slot-scope="{ item }">
                <span class="tooltip-box" v-tooltip="{show: table.tipIndex === item['version_id'], classes: ['tooltip-history'], content: tooltipContent}">{{item['create_time']}}</span>
            </template>
            <template slot="operation" slot-scope="{ item }">
                <a href="javascript:;" class="operation-btn" @click="contrast(item)">对比</a>
            </template>
        </v-table>
    </div>
</template>

<script>
    import vTable from '@/components/table/table'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        data () {
            return {
                table: {
                    header: [{
                        id: 'description',
                        name: '描述',
                        width: 79
                    }, {
                        id: 'create_time',
                        name: '操作时间',
                        width: 79
                    }, {
                        id: 'operator',
                        name: '操作人',
                        width: 79
                    }, {
                        id: 'operation',
                        name: '操作',
                        width: 79
                    }],
                    list: [{
                        'version_id': 10,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'tew',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 9,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'cxz',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 8,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'owen',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 7,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'asdf',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 6,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'fsd',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 5,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'qw',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 4,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'adf',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 3,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'oweasdfn',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }, {
                        'version_id': 2,
                        'create_time': '2018-02-18 10:20:30',
                        'operator': 'qwr',
                        'content': 'aaaaaaaa#vvvvvvvv',
                        'status': 'draft',
                        'description': 'test'
                    }],
                    chooseId: [],
                    pagination: {
                        count: 1,
                        size: 10,
                        current: 1
                    },
                    defaultSort: '-desc',
                    sort: '',
                    tipIndex: -1
                }
            }
        },
        computed: {
            ...mapGetters([
                'bkBizId'
            ]),
            ...mapGetters('configTemplate', [
                'formData'
            ]),
            tooltipContent () {
                let {
                    list,
                    tipIndex
                } = this.table
                let item = list.find(({version_id: versionId}) => versionId === tipIndex)
                if (!item) {
                    return ''
                }
                return `${item.description} ${item.operator} ${item.create_time}`
            }
        },
        methods: {
            ...mapActions('configTemplate', [
                'getConfigTemplateVersion'
            ]),
            contrast (item) {
                this.$emit('contrast', item)
            },
            async getTableList () {
                let params = {
                    page: {
                        start: (this.table.pagination.current - 1) * this.table.pagination.size,
                        limit: this.table.pagination.size,
                        sort: '-version_id'
                    },
                    condition: {}
                }
                const res = await this.getConfigTemplateVersion({
                    bkBizId: this.bkBizId,
                    templateId: this.formData['template_id'],
                    params
                })
                this.table.list = res.data.info
                this.table.pagination.count = res.data.count
            },
            handlRowMouseover (item, index) {
                this.table.tipIndex = item['version_id']
            },
            setCurrentPage (current) {
                this.table.pagination.current = current
                this.getTableList()
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
        created () {
            this.getTableList()
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
        .tooltip-box{
            display: inline-block;
            height: 40px;
            line-height: 40px;
        }
    }
</style>
