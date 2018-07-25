<template>
    <v-table
        class="history-table"
        :header="table.header" 
        :list="table.list" 
        :pagination.sync="table.pagination"
        :defaultSort="table.defaultSort"
        :wrapperMinusHeight="150"
        :sortable="false"
        :colMinWidth="50"
        @handlePageChange="setCurrentPage"
        @handleSizeChange="setCurrentSize"
        @handleSortChange="setCurrentSort">
        <template v-for="{id, name} in table.header" :slot="id" slot-scope="{ item }">
            <template v-if="id !== 'operation'">
                {{item[id]}}
            </template>
            <template v-else>
                <a href="javascript:;" class="operation-btn">对比</a>
            </template>
        </template>
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
                        name: '描述'
                    }, {
                        id: 'time',
                        name: '操作时间'
                    }, {
                        id: 'user',
                        name: '操作人'
                    }, {
                        id: 'operation',
                        name: '操作'
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
