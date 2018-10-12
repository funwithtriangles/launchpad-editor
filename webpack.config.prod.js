const merge = require('webpack-merge')
const common = require('./webpack.config.js')
const ElectronPackager = require('webpack-electron-packager')

module.exports = merge(common, {
  watch: false,
  mode: 'production',
  plugins: [
    new ElectronPackager({
      dir: './',
      out: 'dist/',
      arch: 'x64',
      platform: 'win32',
      overwrite: true
    })
  ]
})
