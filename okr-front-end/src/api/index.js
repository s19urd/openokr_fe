import common from './common'

// okr reprot hour

import dailyWork from './okr/dailyWork'
import login from './okr/login'
import task from './okr/task'

export default {
  common,
  okr: {
    dailyWork: dailyWork,
    login: login,
    task: task
  }
}
