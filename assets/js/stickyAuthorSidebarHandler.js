window.addEventListener('DOMContentLoaded', () => {
  let isSmallDevice = false;

  // Remove classes to make nav sticky.
  const removeStickyClasses = () => {
    document.getElementById('tocNav').classList.remove('bottom');
  }
  
  // Sets logic to enable/disable sticky menu.
  const dertermineScreenSize = () => {
    let mqList = window.matchMedia('(max-width: 1024px)');
    isSmallDevice = mqList.matches;
    if (isSmallDevice) {
      removeStickyClasses();
    }
  }

  // Adds/Removes classes to make side nav sticky.
  const scrollHandler = () => {
    const navHeight = document.getElementById('sectionNav').clientHeight;
    const footerHeight = document.getElementById('mainFooter').clientHeight;
    const sideBar = document.getElementById('stickyAuthorSidebar');
    const scrollPos = window.scrollY;
    const windowHeight = document.body.clientHeight;  
  
    if (scrollPos > (windowHeight - (navHeight + navHeight + footerHeight + footerHeight)))  {
      sideBar.classList.add('bottom');
    } else {
      sideBar.classList.remove('bottom');
    }
  }

  // Runs on DOM Load. Determines whether to make nav sticky or not.
  dertermineScreenSize()
  
  // Runs on DOM Load
  if (!isSmallDevice) scrollHandler();
  
  // Updates the value of whether to display 
  // sticky menu or not based on screen size.
  window.addEventListener('resize', dertermineScreenSize);
  
  window.addEventListener('scroll', () => {
    if (!isSmallDevice) scrollHandler();
  })
});
