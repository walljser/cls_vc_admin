import Storage from 'nd-storage'
import { ALL_APP_LIST } from './applist'

const THTX_SERVICE = {
  module: 'THTX_SERVICE',
  ver: '',
  protocol: 'https://',
  headers: {},
  host: 'bbs.geomen.vip/thtx',
  auth: true
}

const APP_LIST = ALL_APP_LIST

const SessionStorage = new Storage('S-THTX-RES-', 6 * 24 * 60 * 60)
const LocalStorage = new Storage('L-THTX-RES-')

export default {
  APP_LIST,
  THTX_SERVICE,
  SessionStorage,
  LocalStorage
}

