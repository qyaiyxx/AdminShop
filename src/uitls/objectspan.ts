export default{
    const objectSpanMethod:function ({
        row,
        column,
        rowIndex,
        columnIndex,
      }: SpanMethodProps) => {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1,
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            }
          }
        }
      }
}