import React from "react";

// Create a context for analytics provider
const AnalyticsContext = React.createContext(null);

export const AnalyticsProvider = ({children}) => {
    // States
    const [analyticsEnabled, setAnalyticsEnabled] = React.useState(true); // default is on

    // Function to load analytics script
    const loadAnalytics = () => {
        if (analyticsEnabled) {
            // load analytics script
            const script = document.createElement("script");
            script.src = process.env.ANALYTICS_SCRIPT_SRC || "script_url";
            script.setAttribute("data-spa", "auto");
            script.setAttribute("data-site", process.env.ANALYTICS_SITE_ID || "site_id");
            document.head.appendChild(script);
        }
    };

    React.useEffect(() => {
        // check setting with electron
        // loadAnalytics();

        // Cleanup function to remove analytics when unmounted
        return () => {
            const scriptElement = document.querySelector(`script[scr="${process.env.ANALYTICS_SCRIPT_SRC || "script_URL"}"`);
            if (scriptElement) {
                scriptElement.remove();
            }
        };
    }, [analyticsEnabled]);

    const toggleAnalytics = () => {
        setAnalyticsEnabled(analyticsEnabled ? false : true);
        // change setting on electron
    };

    return (
        <AnalyticsContext.Provider value={{analyticsEnabled, toggleAnalytics}}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    return React.useContext(AnalyticsContext);
};