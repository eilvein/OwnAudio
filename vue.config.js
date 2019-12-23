/*
 * @Author: Eilvein
 * @DeveloperSite: http://eilvein.cn
 * @Date: 2019-11-15 15:59:03
 * @LastEditors: ROOBO FE
 * @LastEditTime: 2019-12-16 17:27:09
 * @Descripttion:
 */

// const path = require('path')
// process.env.VUE_APP_PATH = path.join(__dirname, '/node_modules/ogv/dist')

module.exports = {
    devServer: {
        proxy: {
            '/res': {
                target: 'http://media.roobo.net',
                changeOrigin: true
            }
        }
    }
}
