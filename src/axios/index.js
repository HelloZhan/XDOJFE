import axios from 'axios'
import JSONbig from 'json-bigint'

// 处理大数据
const service = axios.create({
    timeout: 100000, // request timeout,
    transformResponse: [function (data) {
        try {
            // 如果转换成功则返回转换的数据结果
            return JSONbig.parse(data)
        } catch (err) {
            // 如果转换失败，则包装为统一数据格式并返回
            return {
                data
            }
        }
    }]
});

export default service;