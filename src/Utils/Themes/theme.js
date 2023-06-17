const React = require("react");
const {getSetting,saveSetting} = require("../Storage/storage");

const ThemeContext = React.createContext(null);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = React.useState(null);

    const followSystemTheme = async () => {
        // get system theme
        const systemTheme = await getSetting("sys-theme");

        // change to system theme
        switch(systemTheme) {
            case "light":
                setTheme("lightTheme");
                break;
            case "dark":
                setTheme("darkTheme");
                break;
            default:
                setTheme("lightTheme");
                break;
        }
    };

    const changeTheme = (newTheme) => {
        switch(newTheme) {
            case "light":
                setTheme("lightTheme");
                saveSetting("theme", "light");
                break;
            
            case "dark":
                setTheme("darkTheme");
                saveSetting("theme", "dark");
                break;
            case "system":
                followSystemTheme();
                saveSetting("theme", "system");
                break;
            default:
                followSystemTheme();
                saveSetting("theme", "system");
                break;
        }
    };

    React.useEffect(() => {
        let savedTheme = getSetting("theme");
        if (savedTheme) {
            changeTheme(savedTheme);
        } else {
            changeTheme("system");
        }
    }, []);

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return React.useContext(ThemeContext);
}