import auth from './config/auth'
import axios from './config/axios'
import buildModules from './config/build-modules'
import build from './config/build'
import head from './config/head'
import loading from './config/loading'
import modules from './config/modules'
import plugins from './config/plugins'
import proxy from './config/proxy'
import render from './config/render'
import router from './config/router'
import serverMiddleware from './config/server-middleware'

export default {
  auth,
  axios,
  buildModules,
  build: Object.assign({ watch: ['config'] }, build),
  head,
  loading,
  modules,
  plugins,
  proxy,
  render,
  router,
  serverMiddleware,
}
