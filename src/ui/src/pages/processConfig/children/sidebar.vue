<template>
    <bk-tab :active-name.sync="tab.active">
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
