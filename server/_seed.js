require("dotenv").config();
const seeder = require("mongoose-seed");
const axios = require("axios");
const yaml = require("js-yaml");
const { v4: uuidv4 } = require("uuid");

//const cities = require('./data1/cities.json');
//const countries = require('./data1/countries.json');
//const images = require('./data1/shows.json');
//const states = require('./data1/states.json');

// const reviews = require('../data1/reviews.json');
// const shows = require('../data1/shows.json');
// const songs = require('../data1/songs.json');
// const venues = require('../data1/venues.json');
// const users = require('../data1/users.json');

const dbUrl = process.env.MONGODB_URL;

function seedDb() {
  const data = [
    { model: "Show", documents: shows },
    { model: "Song", documents: songs },
    { model: "Venue", documents: venues },
    { model: "Review", documents: reviews },
    { model: "User", documents: users },
  ];

  seeder.connect(dbUrl, () => {
    seeder.loadModels([
      "models/review.js",
      "models/show.js",
      "models/song.js",
      "models/venue.js",
      "models/user.js",
    ]);

    seeder.clearModels(["Review", "Show", "Song", "Venue", "User"], () => {
      console.log("Data cleared...");
      seeder.populateModels(data, () => {
        console.log("Data populated...");
        seeder.disconnect();
      });
    });
  });
}

function createRangeArray(start, end) {
  return [...Array(end - start + 1).keys()].map((val) => start + val);
}

function createUrl(year) {
  return `https://raw.githubusercontent.com/jefmsmit/gdshowsdb/master/data/gdshowsdb/${year}.yaml`;
}

function getAllUrls(yearsArray) {
  return yearsArray.map((year) => createUrl(year));
}

function restructureData(dataArray) {
  return (
    dataArray
      // convert yaml to json
      .map((dataObj) => yaml.load(dataObj))
      // make new array of objects with key inside object
      .reduce(
        (acc, val) => [
          ...acc,
          ...Object.keys(val).map((key) => ({ ":name": key, ...val[key] })),
        ],
        []
      )
  );
}

function replaceObjKeys(obj, replacerFn) {
  const keyValues = Object.entries(obj).map(([key, value]) => {
    let newKey = replacerFn(key);
    if (Array.isArray(value)) {
      value = value.map((v) => replaceObjKeys(v, replacerFn));
    } else if (typeof value === "object" && value !== null) {
      value = replaceObjKeys(value, replacerFn);
    }
    return [newKey, value];
  });
  return Object.fromEntries(keyValues);
}

function cleanData(dataArr) {
  return dataArr.map((data) => replaceObjKeys(data, (k) => k.replace(":", "")));
}

function getShowTitle(dateStr) {
  const date = dateStr.slice(0, 10);
  const showPosition = dateStr.charAt(11)
    ? parseInt(dateStr.charAt(11)) + 1
    : null;
  const datetime = new Date(date);
  const localDatetimeString = datetime.toLocaleDateString("en-US");
  const title = `${localDatetimeString}${
    showPosition ? ` (${showPosition})` : ""
  }`;
  return title;
}

function getShowDate(dateStr) {
  const date = dateStr.slice(0, 10);
  const time = dateStr.charAt(11) === "1" ? "12:00:00 UTC" : "00:00:00 UTC";
  const datetime = new Date(`${date} ${time}`);
  return datetime.toISOString();
}

function findObjByName(name, arr) {
  return arr.find((obj) => obj.name === name);
}

function normalizeData(dataArr) {
  let venues = [];
  let cities = [];
  let states = [];
  let countries = [];
  let songs = [];

  return dataArr.map((data) => {
    const { name, uuid, venue, city, state, country, sets } = data;
    console.log(`name: ${name}`);
    console.log(`uuid: ${uuid}`);
    console.log(`venue: ${venue}`);
    console.log(`city: ${city}`);
    console.log(`state: ${state}`);
    console.log(`country: ${country}`);

    let newCountry = findObjByName(country, countries);
    if (!newCountry) {
      let newCountry = { _id: uuidv4(), name: country };
      countries.push(newCountry);
    }

    // if (!state) {
    //   console.log(`no state for country ${country} ${name}`);
    // }
    let newState = findObjByName(state, states);
    if (!newState) {
      let newState = { _id: uuidv4(), name: state };
      states.push(newState);
    }

    let newCity = findObjByName(city, cities);
    if (!newCity) {
      let newCity = { _id: uuidv4(), name: city };
      cities.push(newCity);
    }
    console.log(newCity);

    let newVenue = findObjByName(venue, venues);
    if (!newVenue) {
      let newVenue = {
        _id: uuidv4(),
        name: venue,
        city: newCity,
        state: newState,
        country: newCountry,
      };
      venues.push(newVenue);
    }
    //console.log("VENUE:");
    //console.log(newVenue);

    const newSets = sets.map((set, setIterator) => {
      const { uuid, songs: songInstances } = set;
      const newSongInstances = songInstances.map(
        (songInstance, songInstanceIterator) => {
          const { uuid, name, segued } = songInstance;

          let newSong = findObjByName(name, songs);
          if (!newSong) {
            let newSong = { _id: uuidv4(), name: name };
            songs.push(newSong);
          }

          return {
            _id: uuid,
            position: songInstanceIterator,
            segued,
            song: newSong,
          };
        }
      );

      return {
        _id: uuid,
        position: setIterator,
        song_instances: newSongInstances,
      };
    });

    return {
      _id: uuid,
      title: getShowTitle(name),
      date: getShowDate(name),
      venue: newVenue,
      city: newCity,
      state: newState,
      country: newCountry,
      sets: newSets,
    };
  });
}

async function fetchAllData(urls) {
  try {
    const allResponses = await axios.all(urls.map((url) => axios.get(url)));
    const allResponseData = allResponses.map((res) => res.data);
    return allResponseData;
  } catch (err) {
    console.error(err);
  }
}

async function main() {
  const years = createRangeArray(1965, 1995);
  const urls = getAllUrls(years);
  const allData = await fetchAllData(urls);
  const allDataRestructured = restructureData(allData);
  const allDataCleaned = cleanData(allDataRestructured);
  const allDataNormalized = normalizeData(allDataCleaned);
  console.log(JSON.stringify(allDataNormalized.slice(-5)));
  // console.log(allDataNormalized.slice(-5));
  // seedDb();
}

main();
