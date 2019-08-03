export default {
  name: 'MTableExpand',
  functional: true,
  props: {
    datakey: String,
    row: Object,
    schema: Object,
    render: Function
  },
  render: (h, ctx) => {
    let entity = ''
    let entitySchema = ''
    if (ctx.props.row && ctx.props.datakey) {
      entity = ctx.props.row[ctx.props.datakey]
      entitySchema = ctx.props.schema[ctx.props.datakey]
    }
    return ctx.props.render(h, entity, entitySchema, {
      datakey: ctx.props.datakey,
      row: ctx.props.row,
      schema: ctx.props.schema
    })
  }
}
