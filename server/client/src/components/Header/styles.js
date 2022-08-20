import { alpha, makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  title: {
    display: 'none',
    cursor: "pointer",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
 

  toolbar: {
    display: 'flex', justifyContent: 'space-between',
  },
  displayOnly: {
    cursor: "auto"
  }
}));