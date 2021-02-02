import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import red from "@material-ui/core/colors/red";

let theme = createMuiTheme({
    textTransform: "none",
    palette: {
        primary: {
            main: '#00bcd4',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#00b0ff',
            contrastText: '#ffffff'
        }
    }
});
theme = responsiveFontSizes(theme);


export default theme;
