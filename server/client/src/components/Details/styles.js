import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  chip: {
    margin: '5px 5px 5px 0',
  },
  subtitle: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px',
  },
  spacing: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  container : {
    position: "relative"
  },
  likeIcon : {
    position: "absolute",
    top: "5px",
    color: "white",
    right: "5px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.3)",
      transition: "500ms"
    }
  },
  alreadyLiked: {
    position: "absolute",
    top: "5px",
    color: "red",
    right: "5px",
  }

  

}));
