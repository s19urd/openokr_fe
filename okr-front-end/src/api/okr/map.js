import axios from 'axios'

export default {
    /**
     * 查询Okr地图
     * @return {*}
     */
    getOkrMap(timeSessionId) {
        return axios.get('/api/okrMap/getOkrMap.json', {
            params: {
                timeSessionId: timeSessionId
            }
        })
    }
}