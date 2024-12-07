function menu() {
  const toggle = document.querySelector('.toggle');
  const elementAttribute = toggle.getAttribute("class");
  if (elementAttribute == "toggle") {
    document.querySelector('.toggle').setAttribute('class', 'toggle open');
  }
  else {
    document.querySelector('.toggle').setAttribute('class', 'toggle');
  }
}
