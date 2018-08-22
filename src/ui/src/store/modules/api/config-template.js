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
    formData: {
        template_name: '',
        file_name: '',
        path: '',
        user: '',
        right: '',
        group: '',
        format: '',
        template_id: ''
    },
    templateVersion: []
}

const getters = {
    formData: state => state.formData,
    templateVersion: state => state.templateVersion,
    currentVersion: state => {
        if (state.templateVersion.length) {
            return state.templateVersion[0]
        } else {
            return null
        }
    }
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
    createConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, params }) {
        return $axios.post(`template/${rootState.common.bkSupplierAccount}/${bkBizId}`, params, { globalError: true })
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
    editConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, templateId, params }) {
        return $axios.put(`template/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`, params, { globalError: true })
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
    searchConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, params }) {
        return $axios.post(`template/search/${rootState.common.bkSupplierAccount}/${bkBizId}`, params, { globalError: true })
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
    deleteConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, templateId }) {
        return $axios.delete(`template/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`, { globalError: true })
    },
    /**
     * 获取进程配置文件版本
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    getConfigTemplateVersion ({ commit, state, dispatch, rootState }, { bkBizId, templateId, params }) {
        return $axios.post(`template/version/search/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`, params, { globalError: true })
    },
    /**
     * 获取业务下配置模板分组
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @return {Promise} promise 对象
     */
    getProcessConfigTemplateGroup ({ commit, state, dispatch, rootState }, { bkBizId }) {
        return $axios.get(`template/group/${rootState.common.bkSupplierAccount}/${bkBizId}`, { globalError: true })
    },
    /**
     * 新增配置文件版本信息
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    createConfigTemplateVersion ({ commit, state, dispatch, rootState }, { bkBizId, templateId, params }) {
        return $axios.post(`template/version/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`, params, { globalError: true })
    },
    /**
     * 编辑配置文件版本信息
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} templateId 模版文件id
     * @param {Number} versionId 版本id
     * @param {Object} params 参数
     * @return {Promise} promise 对象
     */
    editConfigTemplateVersion ({ commit, state, dispatch, rootState }, { bkBizId, templateId, versionId, params }) {
        return $axios.put(`template/version/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}/${versionId}`, params, { globalError: true })
    },
    /**
     * 获取进程绑定配置文件
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} bkProcessId 进程id
     * @return {Promise} promise 对象
     */
    getProcessBindTemplate ({ commit, state, dispatch, rootState }, { bkBizId, bkProcessId, config }) {
        return $axios.get(`template/proc/${rootState.common.bkSupplierAccount}/${bkBizId}/${bkProcessId}`, { ...config, ...{globalError: true} })
    },
    /**
     * 绑定配置文件到进程
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} bkProcessId 进程id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    bindProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, bkProcessId, templateId, config }) {
        return $axios.put(`template/proc/${rootState.common.bkSupplierAccount}/${bkBizId}/${bkProcessId}/${templateId}`, {}, { ...config, ...{globalError: true} })
    },
    /**
     * 解绑进程配置文件
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} bkProcessId 进程id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    deleteProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, bkProcessId, templateId, config }) {
        return $axios.delete(`template/proc/${rootState.common.bkSupplierAccount}/${bkBizId}/${bkProcessId}/${templateId}`, { ...config, ...{globalError: true} })
    },
    /**
     * 获取进程实例
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} bkProcessId 进程id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    getProcessInst ({ commit, state, dispatch, rootState }, { bkBizId }) {
        return $axios.get(`proc/inst/${rootState.common.bkSupplierAccount}/${bkBizId}`, { globalError: true })
    },
    /**
     * 预览配置生成
     * @param {Function} commit store commit mutation hander
     * @param {Object} state store state
     * @param {String} dispatch store dispatch action hander
     * @param {Number} bkBizId 业务id
     * @param {Number} bkProcessId 进程id
     * @param {Number} templateId 模版文件id
     * @return {Promise} promise 对象
     */
    previewProcessConfigTemplate ({ commit, state, dispatch, rootState }, { bkBizId, templateId, params }) {
        return $axios.get(`proc/template/${rootState.common.bkSupplierAccount}/${bkBizId}/${templateId}`, params, { globalError: true })
    }
}

const mutations = {
    setFormData (state, formData) {
        for (let key in formData) {
            if (state.formData[key] !== void 0) {
                state.formData[key] = formData[key]
            }
        }
    },
    setTemplateVersion (state, templateVersion) {
        state.templateVersion = templateVersion
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
