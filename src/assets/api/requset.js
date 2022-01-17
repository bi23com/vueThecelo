
import axios from '@/common/axios';

var baseUrl = "/api";
var xurl = "https://thecelo.com/api/";
export const account = values => {
    return axios.get(`${xurl}`, { params: values }).then(res => res.data);
}
/**
 * 案例模块
 * @param {} values 
 */
// 查询案例营销变化趋势   /api/case/queryCaseTrend
export const queryCaseTrend = values => {
    return axios.post(`${baseUrl}/case/queryCaseTrend`, values).then(res => res.data);
}
// 查询案例营销模型分析
export const caseModelAnalysis = values => {
    return axios.get(`${baseUrl}/case/queryModelAnalysis/${values.caseId}`).then(res => res.data);
}
// 新改版 >>> 获取所有案例 
export const allCaseNew = values => {
    return axios.get(`${baseUrl}/caseNew`, { params: values }).then(res => res.data);
}
// 修改案例对比项 
export const changeCasePkHistory = values => {
    return axios.put(`${baseUrl}/caseNew/casePkList`, values).then(res => res.data);
}