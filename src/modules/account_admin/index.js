import createRoutes from './create-routes'
import mouduleOptions from './options'

export default (context, options = {}) => {
  options = { ...mouduleOptions, ...options }
  return {
    routes: createRoutes(context, options),
    options
  }
}
