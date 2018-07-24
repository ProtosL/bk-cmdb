<template>
    <div class="config-detail-wrapper">
        <div class="editor-wrapper">
            <div>
                <ace :config="config"></ace>
            </div>
        </div>
        <div class="info-wrapper">
            <v-sidebar></v-sidebar>
        </div>
    </div>
</template>

<script>
    import ace from './ace'
    import vSidebar from './sidebar'
    export default {
        data () {
            return {
                config: {
                }
            }
        },
        components: {
            ace,
            vSidebar
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
