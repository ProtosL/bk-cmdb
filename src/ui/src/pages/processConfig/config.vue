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
    <div class="config-wrapper" v-if="!configDetail.isShow">
        <div class="config-filter">
            <v-application-selector class="filter-selector fl"
                :filterable="true" 
                :selected.sync="filter.bkBizId">
            </v-application-selector>
            <bk-button type="primary" @click="createConfig">
                {{$t('ConfigTemplate["新建进程配置模版"]')}}
            </bk-button>
            <div class="search-wrapper fr">
                <bk-select class="left-select fl" :selected.sync="filter.selected" ref="filterSelector">
                    <bk-select-option
                        v-for="(option, index) of filter.list"
                        :key="option.id"
                        :value="option.id"
                        :label="option.name">
                    </bk-select-option>
                </bk-select>
                <input type="text" class="bk-form-input search-text" :placeholder="$t('ConfigTemplate[\'根据文件描述搜索\']')" v-model="filter.templateName" @keyup.enter="search">
                <bk-button class="search" type="primary" @click="search">
                    {{$t('Association["搜索"]')}}
                </bk-button>
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
                    <span class="operation-btn mr20" @click.stop="editTemplate(item)">{{$t('Common["编辑"]')}}</span>
                    <span class="operation-btn" @click.stop="delConfirm(item)">{{$t('Common["删除"]')}}</span>
                </template>
            </v-table>
        </div>
        <v-create-form
            v-if="createForm.isShow"
            :bkBizId="filter.bkBizId"
            @submitForm="submitForm"
            @closeForm="createForm.isShow = false"
        ></v-create-form>
    </div>
    <v-config-detail
        v-else
        :bkBizId="filter.bkBizId"
        @cancel="configDetail.isShow = false"
    ></v-config-detail>
</template>

<script>
    import vApplicationSelector from '@/components/common/selector/application'
    import vTable from '@/components/table/table'
    import vCreateForm from './children/createForm'
    import vConfigDetail from './children/configDetail'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                filter: {
                    templateName: '',
                    selected: '',
                    bkBizId: '',
                    params: {},
                    list: [{
                        id: '',
                        name: this.$t('ConfigTemplate["所有分组"]')
                    }]
                },
                table: {
                    header: [{
                        id: 'template_name',
                        name: this.$t('ConfigTemplate["文件描述"]')
                    }, {
                        id: 'file_name',
                        name: this.$t('ConfigTemplate["文件名称"]')
                    }, {
                        id: 'path',
                        name: this.$t('ConfigTemplate["绝对路径"]')
                    }, {
                        id: 'user',
                        name: this.$t('ConfigTemplate["所属用户"]')
                    }, {
                        id: 'right',
                        name: this.$t('ConfigTemplate["文件权限"]')
                    }, {
                        id: 'group',
                        name: this.$t('ConfigTemplate["文件分组"]')
                    }, {
                        id: 'format',
                        name: this.$t('ConfigTemplate["输出格式"]')
                    }, {
                        id: 'operation',
                        name: this.$t('Association["操作"]'),
                        sortable: false
                    }],
                    list: [],
                    chooseId: [],
                    pagination: {
                        count: 0,
                        size: 10,
                        current: 1
                    },
                    defaultSort: '-desc',
                    sort: ''
                },
                createForm: {
                    isShow: false
                },
                configDetail: {
                    isShow: false
                }
            }
        },
        computed: {
            ...mapGetters(['bkBizId'])
        },
        watch: {
            'filter.bkBizId' () {
                this.setCurrentPage(1)
                this.getTemplateGroup()
            }
        },
        methods: {
            ...mapActions('configTemplate', [
                'searchConfigTemplate',
                'deleteConfigTemplate',
                'getProcessConfigTemplateGroup'
            ]),
            ...mapMutations('configTemplate', [
                'setFormData'
            ]),
            search () {
                let {
                    templateName,
                    selected
                } = this.filter
                let params = {}
                if (templateName !== '') {
                    Object.assign(params, {template_name: templateName})
                }
                if (selected !== '') {
                    Object.assign(params, {group: selected})
                }
                this.filter.params = params
                this.setCurrentPage(1)
            },
            delConfirm (item) {
                this.$bkInfo({
                    title: this.$t("CustomQuery['确认要删除']", {name: item['template_name']}),
                    confirmFn: () => {
                        this.deleteTemplate(item)
                    }
                })
            },
            async deleteTemplate (item) {
                await this.deleteConfigTemplate({bkBizId: this.bkBizId, templateId: item['template_id']})
                this.getTableList()
            },
            submitForm () {
                this.configDetail.isShow = true
                this.createForm.isShow = false
            },
            createConfig () {
                this.createForm.isShow = true
            },
            editTemplate (item) {
                this.setFormData(item)
                this.configDetail.isShow = true
            },
            async getTemplateGroup () {
                const res = await this.getProcessConfigTemplateGroup({
                    bkBizId: this.filter.bkBizId
                })
                let groupList = [{
                    id: '',
                    name: this.$t('ConfigTemplate["所有分组"]')
                }]
                res.data.map(item => {
                    if (item !== '') {
                        groupList.push({
                            id: item,
                            name: item
                        })
                    }
                })
                this.filter.list = groupList
            },
            async getTableList () {
                let params = {
                    page: {
                        start: (this.table.pagination.current - 1) * this.table.pagination.size,
                        limit: this.table.pagination.size
                    },
                    condition: this.filter.params
                }
                const res = await this.searchConfigTemplate({
                    bkBizId: this.filter.bkBizId,
                    params: params
                })
                if (res.result) {
                    this.table.list = res.data.info
                    this.table.pagination.count = res.data.count
                } else {
                    this.$alertMsg(res['bk_error_msg'])
                }
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
        components: {
            vTable,
            vCreateForm,
            vConfigDetail,
            vApplicationSelector
        }
    }
</script>

<style lang="scss" scoped>
    .config-wrapper {
        .config-filter {
            padding: 20px 20px 0;
            .filter-selector {
                margin-right: 10px;
                width: 140px;
            }
        }
        .search-wrapper {
            font-size: 0px;
            .left-select {
                position: relative;
                width: 115px;
                z-index: 2;
                margin-right: 30px;
            }
            .bk-form-input {
                position: relative;
                width: 280px;
                margin-right: 10px;
                &:focus {
                    z-index: 2;
                }
            }
        }
        .table-contain {
            padding: 20px;
            .operation-btn {
                color: #3c96ff;
                &:hover {
                    color: #0082ff;
                }
            }
        }
    }
</style>
