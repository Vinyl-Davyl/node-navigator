const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function saveLaunch(launch) {
  console.log(`Looking for planet with keplerName: ${launch.target}`);
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    console.error(`No matching planet found for target: ${launch.target}`);
    throw new Error("No matching planet found");
  }

  await launchesDatabase.updateOne(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

async function getAllLaunches() {
  return await launchesDatabase.find({}, { _id: 0, __v: 0 });
}

function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}

async function addNewLaunch(launch) {
  const latestFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Vinyl Space Data", "NASA"],
    flightNumber: latestFlightNumber,
  });

  await saveLaunch(newLaunch);
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};
