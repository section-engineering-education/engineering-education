const isFeatureEnabled = (cookieName) => {
  const checkIfCookieExists = (value) => {
    if (document.cookie.split(';').some((item) => item.trim().startsWith(`${value}=`))) {
      return true;
    } 
    return false;
  }

  const enableHyvorIfCookieExists = async (cookieName) => {
    // Capture toggle value/strategy.
    const hyvorToggleCookieName = await fetch('https://www.section.io/featuretoggle')
      .then(response => response.json())
      .then(data => {
        const hyvorStrategy = data.features.find(feat => feat.name === cookieName);
        return hyvorStrategy.strategies[0].parameters.cookieName;
      });
    
    // Determine whether user has the correct cookie
    return checkIfCookieExists(hyvorToggleCookieName);
  }

  return enableHyvorIfCookieExists(cookieName);
}
