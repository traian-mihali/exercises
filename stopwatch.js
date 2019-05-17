function StopWatch() {
  let running,
    startTime,
    endTime,
    duration = 0;

  this.start = function() {
    if (running) throw new Error("StopWatch is already running.");

    running = true;
    startTime = new Date();
  };

  this.stop = function() {
    if (!running) throw new Error("StopWatch is not running.");

    running = false;
    endTime = new Date();

    const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
    duration += seconds;
  };

  Object.defineProperty(this, "duration", {
    get: () => duration
  });

  this.reset = function() {
    duration = 0;
    startTime = null;
    endTime = null;
    running = false;
  };
}

const sw = new StopWatch();
sw.start();

function wait() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      sw.stop();
      resolve(sw.duration);
    }, 5000);
  });
}

async function getDuration() {
  const duration = await wait();
  console.log(duration);
}

getDuration();
