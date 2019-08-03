
const pluginName = 'nd-video'

export default {
  init (editor) {
    editor.addCommand(pluginName, {
      exec (editor) {
        editor.config.handleSelectImage && editor.config.handleSelectVideo()
      }
    })

    editor.ui.addButton(pluginName, {
      label: '插入视频',
      /* eslint-disable import/no-webpack-loader-syntax */
      icon: '/images/video_icon.png',
      /* eslint-enable import/no-webpack-loader-syntax */
      command: pluginName,
      toolbar: 'insert'
    })
  }
}
