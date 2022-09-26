'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:8080/api/"',
  TINY_EDITOR_KEY: '"uqt4tfg89ual3r79xcxqnfwowaujd9jewqlz8izm996jeqgd"',
  IMAGES_URL: '"https://modobetastorage.blob.core.windows.net/imagenes/"',
  MEDIA_URL: '"https://modobetastorage.blob.core.windows.net/media/"',
  ARCHIVOS_URL: '"https://modobetastorage.blob.core.windows.net/archivos/"',
  SSO_APPID: '"1023"',
  SSO_URL: '"https://sso.somosintercorp.net/"',
  SSO_RETURN_URL: '"http://localhost:8081/%23/sso/acceso"',
  SSO_TOKEN: '"MzI3OUY0QTktN0Q1NC00RjhDLUE5QUYtQjA1RUE2OTI1OTYz"'
})
