import user from './modules/user'
import eagle from './modules/eagle'

const debug = process.env.NODE_ENV !== 'production'

export default {
    modules: {
        user,
        eagle
    },
    strict: debug,
}