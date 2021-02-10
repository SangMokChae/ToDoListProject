const clock = document.querySelector(".header-top__options"),
  time = clock.querySelector("div");

const loadTimes = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'Pm' : 'Am';
  time.innerText = `${ampm} ${hours < 10 ? `0${hours}`: hours} : ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
}

const init = () => {
  loadTimes();
  setInterval(loadTimes, 1000);
}

init();