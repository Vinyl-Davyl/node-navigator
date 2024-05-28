const API_URL = "http://localhost:8001/v1";

// Load planets and return as JSON.
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);

  const fetchLaunches = await response.json();

  return fetchLaunches.sort((a, b) => {
    // sort in ascending order
    return a.flightNumber - b.flightNumber;
  });
}

//NB: if body is being passed down as a string, a header needs to be passed in.
async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (err) {
    return {
      ok: false,
    };
  }

  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
