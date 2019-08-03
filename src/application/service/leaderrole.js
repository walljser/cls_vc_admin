import { sGetUserRoles, sGetUserAreaCode } from 'apis/eoms/role'
import { promiseSessionStorageCached } from 'utils/cached'
import { EOMS_LEADER_TYPE, AREA_LEVEL_ENUM } from 'utils/constants'

/**
 * EOMS领导角色转化为云图角色
 * @param roles
 * @returns {undefined}
 */
function areaLevel (roles) {
  let level
  for (const role of roles) {
    switch (role) {
      case EOMS_LEADER_TYPE.PROVINCE_LEADER: {
        level = AREA_LEVEL_ENUM.AREA_LEVEL_PROVINCE
        break
      }
      case EOMS_LEADER_TYPE.CITY_LEADER: {
        level = AREA_LEVEL_ENUM.AREA_LEVEL_CITY
        break
      }
      case EOMS_LEADER_TYPE.COUNTRY_LEADER: {
        level = AREA_LEVEL_ENUM.AREA_LEVEL_COUNTY
        break
      }
      default: {
      }
    }
    if (level !== undefined) {
      break
    }
  }
  return level
}

/**
 * 解析获取教育局领导角色以及行政区域
 * @param user_id
 */
function leaderRole (user_id) {
  const promises = [sGetUserRoles(user_id), sGetUserAreaCode(user_id)]
  return Promise.all(promises).then(([userRole, userAreaCode]) => {
    const { roles } = { ...userRole }
    const { extend_data: { areacode }, name } = { ...userAreaCode }
    const leaderRole = {
      user_id,
      area_level: areaLevel(roles),
      area_name: name,
      area_id: areacode
    }
    return Promise.resolve(leaderRole)
  })
}

export default {
  leaderRole,
  leaderRoleCached: promiseSessionStorageCached(leaderRole, 'leaderRole')
}
