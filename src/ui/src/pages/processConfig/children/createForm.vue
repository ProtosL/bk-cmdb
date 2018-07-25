<template>
    <bk-dialog
        :is-show.sync="isShow" 
        :has-header="false" 
        :has-footer="false" 
        :quick-close="false"
        :width="460" 
        :padding="0">
        <div class="form-content" slot="content">
            <p class="form-title">{{$t('ProcessConfig["新建进程配置文件模版"]')}}</p>
            <div class="content-group clearfix">
                <label for="desc">
                    {{$t('ProcessConfig["文件描述"]')}}
                    <span class="color-danger">*</span>
                </label>
                <input id="desc" type="text" class="bk-form-input" placeholder="请输入">
            </div>
            <div class="form-btn-group clearfix">
                <div class="fr">
                    <bk-button type="primary" class="form-btn" @click="submitForm">{{$t('Common["确认"]')}}</bk-button>
                    <bk-button type="default" class="form-btn vice-btn" @click="closeForm">{{$t('Common["取消"]')}}</bk-button>
                </div>
            </div>
        </div>
    </bk-dialog>
</template>

<script>
    export default {
        props: {
            isShow: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {

            }
        },
        methods: {
            submitForm () {
            },
            closeForm () {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-content {
        padding: 50px 0 0;
        .form-title {
            line-height: 1;
            text-align: center;
            font-size: 22px;
            font-weight: normal;
            color: #333948;
        }
        .content-group {
            margin: 50px auto 0;
            line-height: 36px;
            text-align: center;
            label {
                display: inline-block;
            }
            input {
                display: inline-block;
                width: 266px;
                margin-left: 10px;
            }
        }
    }
</style>
