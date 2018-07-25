<template>
    <div class="tab-wrapper">
        <a href="javascript:void(0);" class="bk-icon icon-angle-right detail-toggle"></a>
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
</template>

<script>
    import vInfo from './sidebar/info'
    import vHistory from './sidebar/history'
    import vHelp from './sidebar/help'
    export default {
        data () {
            return {
                tab: {
                    active: 'info'
                }
            }
        },
        methods: {
        },
        components: {
            vInfo,
            vHistory,
            vHelp
        }
    }
</script>

<style lang="scss" scoped>
    .tab-wrapper {
        position: relative;
        width: 360px;
        padding: 0 20px 20px;
        height: 100%;
        border-left: 1px solid #dde4eb;
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
        .detail-tab {
            border: none;
            height: 100%;
        }
    }
</style>
