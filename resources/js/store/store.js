import user from './modules/user'
import eagle from './modules/eagle'
import zookeeper from './modules/zookeeper'

const debug = process.env.NODE_ENV !== 'production'

export default {
    modules: {
        user,
        eagle,
        zookeeper
    },
    strict: debug,
}