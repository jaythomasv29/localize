import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  title: {
    width: "100%",
    textAlign: "center",
  },

  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    width: "950px",
    gap: "15px",
  },

  page: {
    
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "15px",
    padding: "20px",
  },
  chip: {
    margin: "5px 5px 5px 0",
  },
  subtitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  spacing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    minWidth: "300px",
    maxWidth: "300px",
    // flex: 1,
  },
  likeIcon: {
    position: "absolute",
    top: "5px",
    color: "white",
    right: "5px",
    cursor: "pointer",
    "&:hover": {
      transform: "scale(1.3)",
      transition: "500ms",
    },
  },
  alreadyLiked: {
    position: "absolute",
    top: "5px",
    color: "red",
    right: "5px",
  },
}));
