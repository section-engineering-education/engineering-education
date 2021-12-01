const hyvorToggle = fetch('https://aperture.section.io/ops/featuretoggle/api')
  .then(response => response.json())
  .then(data => console.log(data))
