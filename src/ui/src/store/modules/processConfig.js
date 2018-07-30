/*
 * Tencent is pleased to support the open source community by making 蓝鲸 available.
 * Copyright (C) 2017-2018 THL A29 Limited, a Tencent company. All rights reserved.
 * Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://opensource.org/licenses/MIT
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { $Axios, $axios } from '@/api/axios'

const state = {
}

const getters = {
}

const actions = {
    /**
     * 新增进程配置文件模板
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Object} params 参数
     * @return {Promise} promise 对象
     */
    createProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, params }) {
        return $axios.post(`proc/template/${rootState.common.bkSupplierAccount}/${bkBizId}`, params)
    },
    /**
     * 查询进程配置文件模板
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Object} params 参数
     * @return {Promise} promise 对象
     */
    searchProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, params }) {
        return $axios.post(`proc/template/search/${rootState.common.bkSupplierAccount}/${bkBizId}`, params)
    },
    /**
     * 编辑进程配置文件模板
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} templateId 模版文件id
     * @param {Object} params 参数
     * @return {Promise} promise 对象
     */
    editProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, templateId, params }) {
        return $axios.post(`proc/template/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`, params)
    },
    /**
     * 删除进程配置文件模板
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    deleteProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, templateId }) {
        return $axios.post(`proc/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`)
    },
    /**
     * 获取进程配置文件模板详情
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    getProcessConfigTemplateDetail ({ commit, state, dispatch, rootState }, { bkBizId, templateId }) {
        return $axios.post(`proc/template${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`)
    }
}

const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
