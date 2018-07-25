<template>
    <ul class="info-form">
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件描述"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件名称"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["绝对路径"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["所属用户"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件权限"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["输出格式"]')}}</span>
                <span class="color-danger">*</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
        <li>
            <label for="">
                <span class="title">{{$t('ProcessConfig["文件分组"]')}}</span>
            </label>
            <span class="info-content">TemplateName</span>
        </li>
    </ul>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .info-form {
        padding-top: 15px;
        li {
            height: 34px;
            line-height: 34px;
            font-size: 14px;
            color: #737987;
            label {
                float: left;
                width: 84px;
                height: 34px;
                font-size: 0;
                span {
                    font-size: 14px;
                }
                .title {
                    display: inline-block;
                    width: 60px;
                    @include ellipsis;
                }
            }
            .color-danger {
                position: absolute;
                font-size: 14px;
            }
            .info-content {
                display: inline-block;
                width: 235px;
                @include ellipsis;
            }
        }
    }
</style>
