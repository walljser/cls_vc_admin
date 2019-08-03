
const pluginName = 'nd-image'

export default {
  init (editor) {
    editor.addCommand(pluginName, {
      exec (editor) {
        editor.config.handleSelectImage && editor.config.handleSelectImage()
      }
    })

    editor.ui.addButton(pluginName, {
      label: '插入图片',
      /* eslint-disable import/no-webpack-loader-syntax */
      icon: 'image',
      /* eslint-enable import/no-webpack-loader-syntax */
      command: pluginName,
      toolbar: 'insert'
    })
  }
}
