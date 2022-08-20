import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
 container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    width: "270px",
    gap: "16px"
  }
}
))