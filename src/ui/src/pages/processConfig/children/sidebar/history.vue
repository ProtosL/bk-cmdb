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
            :pageSize="'mini'"
            @handlRowMouseover="handlRowMouseover"
            @handlePageChange="setCurrentPage"
            @handleSizeChange="setCurrentSize"
            @handleSortChange="setCurrentSort">
            <template slot="create_time" slot-scope="{ item }">
                <span class="tooltip-box" v-tooltip="{show: table.tipIndex === item['version_id'], classes: ['tooltip-history'], content: tooltipContent}">{{$formatTime(item['create_time'], 'YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
            <template slot="operation" slot-scope="{ item }">
                <a href="javascript:;" class="operation-btn" @click="contrast(item)">{{$t('ConfigTemplate["对比"]')}}</a>
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
                        name: this.$t('OperationAudit["描述"]'),
                        width: 79
                    }, {
                        id: 'last_time',
                        name: this.$t('OperationAudit["操作时间"]'),
                        width: 79
                    }, {
                        id: 'operator',
                        name: this.$t('EventPush["操作人"]'),
                        width: 79
                    }, {
                        id: 'operation',
                        name: this.$t('Association["操作"]'),
                        width: 79
                    }],
                    list: [],
                    chooseId: [],
                    pagination: {
                        count: 1,
                        size: 10,
                        current: 1
                    },
                    defaultSort: '-version_id',
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
                return `${item.description} ${item.operator} ${this.$formatTime(item.last_time, 'YYYY-MM-DD HH:mm:ss')}`
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
