<template>
    <div class="config-wrapper">
        <div class="config-title">
            <p>已绑定<span></span>个配置文件</p>
            <bk-button class="vice-btn" type="default" @click="unbindAll">全部取消</bk-button>
        </div>
        <div class="config-table-wrapper">
            <v-table class="config-table"
                :header="table.header"
                :list="table.list"
                :loading="table.isLoading"
                :width="754"
                :wrapperMinusHeight="150"
                :sortable="false">
                <template slot="is_bind" slot-scope="{ item }">
                    <bk-button :type="item['is_bind'] ? 'primary' : 'default'" :loading="$loading(`${item['bk_module_name']}Bind`)" @click="changeBinding(item)" 
                        :class="item['is_bind'] ? 'main-btn' : 'vice-btn'">
                        {{item['is_bind'] ? $t("ProcessManagement['已绑定']") : $t("ProcessManagement['未绑定']")}}
                    </bk-button>
                </template>
            ></v-table>
        </div>
    </div>
</template>

<script>
    import vTable from '@/components/table/table'
    import { mapActions } from 'vuex'
    export default {
        props: {
            bkProcessId: {
                required: true
            },
            bkBizId: {
                required: true
            }
        },
        data () {
            return {
                table: {
                    header: [{
                        id: 'template_name',
                        name: this.$t("ConfigTemplate['配置描述']")
                    }, {
                        id: 'file_name',
                        name: this.$t("ConfigTemplate['文件名称']")
                    }, {
                        id: 'is_bind',
                        name: this.$t("ConfigTemplate['操作']")
                    }],
                    list: [],
                    isLoading: false,
                    maxHeight: 0
                }
            }
        },
        methods: {
            ...mapActions('configTemplate', [
                'getProcessBindTemplate',
                'bindProcessConfigTemplate',
                'deleteProcessConfigTemplate'
            ]),
            changeBinding (item) {
                if (item['is_bind'] === 0) {
                    this.bindProcessConfigTemplate({
                        bkBizId: this.bkBizId,
                        bkProcessId: this.bkProcessId,
                        templateId: item['template_name']
                    })
                } else {
                    this.deleteProcessConfigTemplate({
                        bkBizId: this.bkBizId,
                        bkProcessId: this.bkProcessId,
                        templateId: item['template_name']
                    })
                }
            },
            unbindAll () {

            }
        },
        async created () {
            const res = await this.getProcessBindTemplate({
                bkBizId: this.bkBizId,
                bkProcessId: this.bkProcessId
            })
        },
        components: {
            vTable
        }
    }
</script>

<style lang="scss" scoped>
    p {
        margin: 0;
    }
    .config-wrapper {
        height: 100%;
        padding: 20px 0;
        .config-title {
            line-height: 32px;
            p {
                display: inline-block;
            }
            .vice-btn {
                float: right;
                margin-right: 6px;
                height: 32px;
                line-height: 30px;
            }
        }
        .config-table-wrapper {
            margin-top: 10px;
            height: calc(100% - 40px);
            overflow: auto;
            @include scrollbar;
            .bk-button {
                padding: 1px 7px 2px;
                height: 22px;
                line-height: 20px;
                font-size: 12px;
            }
        }
    }
</style>
