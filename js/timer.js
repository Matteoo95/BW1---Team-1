// Timer autonomo e riutilizzabile, un conto alla rovescia per domanda.
function createQuestionTimer(secondsElement, circleElement, onExpire) {
  const radius = 49;
  const circumference = 2 * Math.PI * radius;
  let intervalId = null;
  circleElement.style.strokeDasharray = String(circumference);

  function stop() {
    if (intervalId !== null) clearInterval(intervalId);
    intervalId = null;
  }

  function start(durationSeconds) {
    stop();
    const deadline = Date.now() + durationSeconds * 1000;
    let expired = false;
    function draw() {
      const remainingMs = Math.max(0, deadline - Date.now());
      secondsElement.textContent = String(Math.ceil(remainingMs / 1000));
      circleElement.style.strokeDashoffset = String(circumference * (1 - remainingMs / (durationSeconds * 1000)));
      if (remainingMs === 0 && !expired) {
        expired = true;
        stop();
        onExpire();
      }
    }
    draw();
    intervalId = setInterval(draw, 100);
  }
  return { start, stop };
}