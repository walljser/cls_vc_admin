import createRoutes from './create-routes'
import createStore from './create-store'
import mouduleOptions from './options'

export default (context, options = {}) => {
  options = { ...mouduleOptions, ...options }
  return {
    store: createStore(options),
    routes: createRoutes(context, options),
    options
  }
}
