import { createMuiTheme } from "@material-ui/core/styles";

const getTheme = (type)=> createMuiTheme({
  palette: {
    type: type,
    background:{
        default: type === 'light' ? '#FFFFFF' : '#181925',
        paper: type === 'light' ? '#FFFFFF' : '#181925'
    },
    primary: {
      main: "#502B79",
    },
    secondary: {
      main: "#E9B44C",
    },
  },
  typography: {
    textTransform: "none",
    button: {
      textTransform: "none",
      fontWeight: 600,
      letterSpacing: '1px'
    },
    fontFamily: [
      "Inter",
      "sans-serif,",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
    ].join(","),
  },
});

export default getTheme;
