<template>
    <div class="config-wrapper" v-if="!configDetail.isShow">
        <div class="config-filter">
            <bk-button type="primary">
                {{$t('ProcessConfig["进程配置模版"]')}}
            </bk-button>
            <div class="search-wrapper fr">
                <bk-select class="left-select fl" :selected.sync="filter.selected" ref="filterSelector" @on-selected="setFilterType">
                    <bk-select-option
                        v-for="(option, index) of filterList"
                        :key="option.id"
                        :value="option.id"
                        :label="option.name">
                    </bk-select-option>
                </bk-select>
                <input type="text" class="bk-form-input search-text" :placeholder="$t('ProcessConfig[\'搜索文件描述、文件名称\']')">
            </div>
        </div>
        <div class="table-contain">
            <v-table
                :header="table.header" 
                :list="table.list" 
                :pagination.sync="table.pagination"
                :defaultSort="table.defaultSort"
                :wrapperMinusHeight="150"
                @handlePageChange="setCurrentPage"
                @handleSizeChange="setCurrentSize"
                @handleSortChange="setCurrentSort">
                <template slot="operation" slot-scope="{ item }">
                    <i class="icon-cc-edit mr20" @click.stop="editEvent(item)"></i>
                    <i class="icon-cc-del" @click.stop="delConfirm(item)"></i>
                </template>
            </v-table>
        </div>
        <v-create-dialog
            :isShow="createDialog.isShow"
        ></v-create-dialog>
    </div>
    <v-config-detail
        v-else
    ></v-config-detail>
</template>

<script>
    import vTable from '@/components/table/table'
    import vCreateDialog from './children/create'
    import vConfigDetail from './children/configDetail'
    export default {
        data () {
            return {
                filter: {
                    selected: ''
                },
                filterList: [{
                    id: 1,
                    name: '所有分组'
                }],
                table: {
                    header: [{
                        id: 'disc',
                        name: '文件描述'
                    }, {
                        id: 'operation',
                        name: '操作'
                    }],
                    list: [{
                        disc: 'aaa'
                    }],
                    chooseId: [],
                    pagination: {
                        count: 0,
                        size: 10,
                        current: 1
                    },
                    defaultSort: '-disc',
                    sort: ''
                },
                createDialog: {
                    isShow: false
                },
                configDetail: {
                    isShow: true
                }
            }
        },
        methods: {
            setFilterType () {

            },
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
            vTable,
            vCreateDialog,
            vConfigDetail
        }
    }
</script>

<style lang="scss" scoped>
    .config-wrapper {
        .config-filter {
            padding: 20px 20px 0;
        }
        .search-wrapper {
            .left-select {
                position: relative;
                width: 115px;
                margin-right: -1px;
                border-radius: 2px 0 0 2px;
                z-index: 2;
            }
            .bk-form-input {
                position: relative;
                width: 280px;
                border-radius: 0 2px 2px 0;
                &:focus {
                    z-index: 2;
                }
            }
        }
        .table-contain {
            padding: 20px;
        }
    }
</style>
