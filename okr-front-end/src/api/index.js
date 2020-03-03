import common from './common'

// okr reprot hour

import dailyWork from './okr/dailyWork'
import dailyWeekly from './daily/weekly'
import login from './okr/login'
import task from './okr/task'
import map from './okr/map'

export default {
    common,
    okr: {
        dailyWork: dailyWork,
        login: login,
        task: task,
        map: map
    },
    daily: {
        weekly: dailyWeekly
    }
}