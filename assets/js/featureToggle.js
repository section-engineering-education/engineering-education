const unleash = function(){
  
  const toggleRepository = {
    features: null,
    get: async (name) => {
      if (toggleRepository.features === null) {
        try {
          const features = await fetch(`${window.location.host.includes('beta') ? 'https://beta.section.io/featuretoggle' : 'https://www.section.io/featuretoggle'}`)
            .then(response => response.json())
            .then(data => {
              return data.features
            })
            toggleRepository.features = features;
        } catch (e) {
          toggleRepository.features = []
        }
      }

      return toggleRepository.features.find(feat => feat.name === name);
    }
  }

  const cookieStrategy = {
    isEnabled: (parameters, context) => {
      const checkIfCookieExists = (value) => {
        if (document.cookie.split(';').some((item) => item.trim().startsWith(`${value}=`))) {
          return true;
        } 
        return false;
      }
      const enableHyvorIfCookieExists = () => {
        // Capture toggle value/strategy.
        const hyvorToggleCookieName = parameters.cookieName
        
        // Determine whether user has the correct cookie
        return checkIfCookieExists(hyvorToggleCookieName);
      }
    
      return enableHyvorIfCookieExists();
    }
  }

  const strategyImplRepository = {
    get: (name) => {
      switch (name) {
        case 'activeWithCookieName':
          return cookieStrategy
          break;
        default:
          return {
            isEnabled: (parameters, context) => {
              return true
            }
          }
      }

    }
  }

  const isEnabled = async (name, unleashContext = {}, defaultValue = false) => {
    const toggle = await toggleRepository.get(name);

    if (!toggle) {
      return defaultValue;
    } else if (!toggle.enabled) {
      return false;
    } else {
      for (let i = 0; i < toggle.strategies.length; i++) {
        let strategyDef = toggle.strategies[i];
        let strategyImpl = strategyImplRepository.get(strategyDef.name);
        if (strategyImpl.isEnabled(strategyDef.parameters, unleashContext)) {
          return true;
        }
      }
      return false;
    }
  }

  return {
    isEnabled: isEnabled
  }
}();


