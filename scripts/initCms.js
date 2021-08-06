const fetch = require("sync-fetch");

// sync sleep
const sleep = (milliseconds) =>
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, milliseconds);

const TIMEOUT = 8000;

// This script just makes sure the CMS is up and running
(function () {
  console.log("pre-heating CMS");
  const base_url = process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/+$/, "");

  let retries = 15;
  let res;
  let error;

  while (retries > 0) {
    const start = Date.now();
    try {
      res = fetch(`${base_url}/homepage`, { timeout: TIMEOUT });
    } catch (err) {
      error = err;
      console.log("caught error while requesting CMS");
    }

    if (res && res.ok) {
      console.log("cms returned ok");
      return;
    }
    retries--;

    const remainingTime = TIMEOUT - (Date.now() - start);
    if (retries > 0 && remainingTime > 0) {
      console.log(`calling CMS failed, retrying in ${remainingTime} ms`);
      sleep(remainingTime);
    }
  }
  throw Error((res && res.statusText) || error || "failed pre-heating cms");
})();
