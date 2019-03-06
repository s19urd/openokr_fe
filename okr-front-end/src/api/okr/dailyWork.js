import axios from 'axios'

export default {
  /**
   * 提交每日报工
   * @return {*}
   */

  submitDailyWork (dailyWork) {
    return axios.post('/api/daily/saveDailyList.json', 
      { dailyList: dailyWork }
    )
  }
}
