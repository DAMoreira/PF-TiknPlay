export default theme => ({
  root: { color: theme.palette.common.contrastText },
  tableRow: {
    height: '64px'
  },
  titleCell: {
    align: 'left',
    fontSize: '0.7857142857142857rem'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    display: 'inline-flex',
    fontSize: '14px',
    fontWeight: 500,
    height: '36px',
    width: '36px'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: '0.7857142857142857rem'
  }
});
