require('dotenv').config()
const seeder = require('mongoose-seed');
const axios = require('axios');
const yaml = require('js-yaml');
const { v4: uuidv4 } = require('uuid');

const baseUrl = 'https://api.setlist.fm/rest/1.0/artist/6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6/setlists';

function wait(ms = 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchFakeData() {
  return [
    {
      "id": "73da6aa9",
      "versionId": "g53dad329",
      "eventDate": "15-04-1970",
      "lastUpdated": "2021-08-29T15:00:17.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "63d6c643",
          "name": "Winterland Arena",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/winterland-arena-san-francisco-ca-usa-63d6c643.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Cold Rain and Snow",
                          "cover": {
                              "mbid": "4ace12bf-e7ec-4cb6-ab38-597e4445ac45",
                              "name": "Obray Ramsey",
                              "sortName": "Obray Ramsey",
                              "disambiguation": "folk musician and banjo player",
                              "url": "https://www.setlist.fm/setlists/obray-ramsey-2bc59466.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Mama Tried",
                          "cover": {
                              "mbid": "deb2448c-6fdf-4d31-921e-757630515dbd",
                              "name": "Merle Haggard",
                              "sortName": "Haggard, Merle",
                              "disambiguation": "US country singer, guitarist, fiddler & songwriter",
                              "url": "https://www.setlist.fm/setlists/merle-haggard-73d6de21.html"
                          }
                      },
                      {
                          "name": "It's a Man's Man's Man's World",
                          "cover": {
                              "mbid": "20ff3303-4fe2-4a47-a1b6-291e26aa3438",
                              "name": "James Brown",
                              "sortName": "Brown, James",
                              "disambiguation": "“The Godfather of Soul”",
                              "url": "https://www.setlist.fm/setlists/james-brown-3d6b9a7.html"
                          }
                      },
                      {
                          "name": "Candyman"
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      },
                      {
                          "name": "Cumberland Blues"
                      },
                      {
                          "name": "That's It for the Other One"
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/winterland-arena-san-francisco-ca-73da6aa9.html"
  },
  {
      "id": "1bdc81f4",
      "versionId": "431037c7",
      "eventDate": "12-04-1970",
      "lastUpdated": "2019-04-10T20:05:47.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "13d71555",
          "name": "Fillmore West",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/fillmore-west-san-francisco-ca-usa-13d71555.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Good Morning, School Girl",
                          "cover": {
                              "mbid": "8ebad434-3593-49bc-b60c-bd66e8efbbbb",
                              "name": "Sonny Boy Williamson",
                              "sortName": "Williamson, Sonny Boy",
                              "disambiguation": "John Lee “Sonny Boy” Williamson, 1914–1948",
                              "url": "https://www.setlist.fm/setlists/sonny-boy-williamson-23d6980b.html"
                          }
                      },
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Mama Tried",
                          "cover": {
                              "mbid": "deb2448c-6fdf-4d31-921e-757630515dbd",
                              "name": "Merle Haggard",
                              "sortName": "Haggard, Merle",
                              "disambiguation": "US country singer, guitarist, fiddler & songwriter",
                              "url": "https://www.setlist.fm/setlists/merle-haggard-73d6de21.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Candyman"
                      },
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "It's a Man's Man's Man's World",
                          "cover": {
                              "mbid": "20ff3303-4fe2-4a47-a1b6-291e26aa3438",
                              "name": "James Brown",
                              "sortName": "Brown, James",
                              "disambiguation": "“The Godfather of Soul”",
                              "url": "https://www.setlist.fm/setlists/james-brown-3d6b9a7.html"
                          }
                      },
                      {
                          "name": "Viola Lee Blues",
                          "cover": {
                              "mbid": "a4e14b84-be3f-4cf3-a0d5-54c3c8c4089b",
                              "name": "Cannon’s Jug Stompers",
                              "sortName": "Cannon’s Jug Stompers",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/cannons-jug-stompers-53d613ed.html"
                          }
                      },
                      {
                          "name": "Feedback"
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/fillmore-west-san-francisco-ca-1bdc81f4.html"
  },
  {
      "id": "73da6ab5",
      "versionId": "b275d8a",
      "eventDate": "11-04-1970",
      "lastUpdated": "2020-08-11T21:47:13.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "13d71555",
          "name": "Fillmore West",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/fillmore-west-san-francisco-ca-usa-13d71555.html"
      },
      "sets": {
          "set": [
              {
                  "name": "Set 1",
                  "song": [
                      {
                          "name": "Beat It on Down the Line",
                          "cover": {
                              "mbid": "e148154d-e1fb-4da4-8db2-d54bf9a894b8",
                              "name": "Jesse Fuller",
                              "sortName": "Fuller, Jesse",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/jesse-fuller-3d60103.html"
                          }
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "It's a Man's Man's Man's World",
                          "cover": {
                              "mbid": "20ff3303-4fe2-4a47-a1b6-291e26aa3438",
                              "name": "James Brown",
                              "sortName": "Brown, James",
                              "disambiguation": "“The Godfather of Soul”",
                              "url": "https://www.setlist.fm/setlists/james-brown-3d6b9a7.html"
                          }
                      }
                  ]
              },
              {
                  "name": "Set 2: Acoustic",
                  "song": [
                      {
                          "name": "Don't Ease Me In",
                          "cover": {
                              "mbid": "46b6c6e1-81ca-4fa8-b264-8f0fe49dff1a",
                              "name": "Henry Thomas",
                              "sortName": "Thomas, Henry",
                              "disambiguation": "American country blues singer",
                              "url": "https://www.setlist.fm/setlists/henry-thomas-1bd60188.html"
                          }
                      },
                      {
                          "name": "New Speedway Boogie"
                      },
                      {
                          "name": "Friend of the Devil"
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Candyman"
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Uncle John's Band"
                      }
                  ]
              },
              {
                  "name": "Set 3",
                  "song": [
                      {
                          "name": "Dark Star"
                      },
                      {
                          "name": "St. Stephen"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/fillmore-west-san-francisco-ca-73da6ab5.html"
  },
  {
      "id": "bc7d956",
      "versionId": "g5bdad328",
      "eventDate": "10-04-1970",
      "lastUpdated": "2021-08-29T15:00:17.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "13d71555",
          "name": "Fillmore West",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/fillmore-west-san-francisco-ca-usa-13d71555.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Cold Rain and Snow",
                          "cover": {
                              "mbid": "4ace12bf-e7ec-4cb6-ab38-597e4445ac45",
                              "name": "Obray Ramsey",
                              "sortName": "Obray Ramsey",
                              "disambiguation": "folk musician and banjo player",
                              "url": "https://www.setlist.fm/setlists/obray-ramsey-2bc59466.html"
                          }
                      },
                      {
                          "name": "New Speedway Boogie"
                      },
                      {
                          "name": "Mama Tried",
                          "cover": {
                              "mbid": "deb2448c-6fdf-4d31-921e-757630515dbd",
                              "name": "Merle Haggard",
                              "sortName": "Haggard, Merle",
                              "disambiguation": "US country singer, guitarist, fiddler & songwriter",
                              "url": "https://www.setlist.fm/setlists/merle-haggard-73d6de21.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      },
                      {
                          "name": "The Ballad of Casey Jones",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Friend of the Devil"
                      },
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Candyman"
                      },
                      {
                          "name": "Wake Up Little Susie",
                          "cover": {
                              "mbid": "091ec508-877f-4e3c-92a3-10903bbbc7ad",
                              "name": "The Everly Brothers",
                              "sortName": "Everly Brothers, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-everly-brothers-5bd6af64.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "It's a Man's Man's Man's World",
                          "cover": {
                              "mbid": "20ff3303-4fe2-4a47-a1b6-291e26aa3438",
                              "name": "James Brown",
                              "sortName": "Brown, James",
                              "disambiguation": "“The Godfather of Soul”",
                              "url": "https://www.setlist.fm/setlists/james-brown-3d6b9a7.html"
                          }
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Alligator"
                      },
                      {
                          "name": "Caution (Do Not Stop on Tracks)"
                      },
                      {
                          "name": "And We Bid You Goodnight",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/fillmore-west-san-francisco-ca-bc7d956.html"
  },
  {
      "id": "1bdc81f8",
      "versionId": "5b1037c4",
      "eventDate": "09-04-1970",
      "lastUpdated": "2019-04-10T20:05:47.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "13d71555",
          "name": "Fillmore West",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/fillmore-west-san-francisco-ca-usa-13d71555.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Good Morning, School Girl",
                          "cover": {
                              "mbid": "8ebad434-3593-49bc-b60c-bd66e8efbbbb",
                              "name": "Sonny Boy Williamson",
                              "sortName": "Williamson, Sonny Boy",
                              "disambiguation": "John Lee “Sonny Boy” Williamson, 1914–1948",
                              "url": "https://www.setlist.fm/setlists/sonny-boy-williamson-23d6980b.html"
                          }
                      },
                      {
                          "name": "Mama Tried",
                          "cover": {
                              "mbid": "deb2448c-6fdf-4d31-921e-757630515dbd",
                              "name": "Merle Haggard",
                              "sortName": "Haggard, Merle",
                              "disambiguation": "US country singer, guitarist, fiddler & songwriter",
                              "url": "https://www.setlist.fm/setlists/merle-haggard-73d6de21.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Viola Lee Blues",
                          "cover": {
                              "mbid": "a4e14b84-be3f-4cf3-a0d5-54c3c8c4089b",
                              "name": "Cannon’s Jug Stompers",
                              "sortName": "Cannon’s Jug Stompers",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/cannons-jug-stompers-53d613ed.html"
                          }
                      },
                      {
                          "name": "Candyman"
                      },
                      {
                          "name": "Friend of the Devil"
                      },
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "Katie Mae",
                          "cover": {
                              "mbid": "d5c55b61-78b8-40c9-be1b-de7517c3aebb",
                              "name": "Lightnin’ Hopkins",
                              "sortName": "Hopkins, Lightnin’",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/lightnin-hopkins-2bd698e6.html"
                          }
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Cowboy Song"
                      },
                      {
                          "name": "It's a Man's Man's Man's World",
                          "cover": {
                              "mbid": "20ff3303-4fe2-4a47-a1b6-291e26aa3438",
                              "name": "James Brown",
                              "sortName": "Brown, James",
                              "disambiguation": "“The Godfather of Soul”",
                              "url": "https://www.setlist.fm/setlists/james-brown-3d6b9a7.html"
                          }
                      },
                      {
                          "name": "That's It for the Other One"
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/fillmore-west-san-francisco-ca-1bdc81f8.html"
  },
  {
      "id": "1bdc8104",
      "versionId": "b3041be",
      "eventDate": "03-04-1970",
      "lastUpdated": "2020-03-28T10:08:08.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "3bd3cc50",
          "name": "Armory Fieldhouse",
          "city": {
              "id": "4508722",
              "name": "Cincinnati",
              "state": "Ohio",
              "stateCode": "OH",
              "coords": {
                  "lat": 39.1620036,
                  "long": -84.4568863
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/armory-fieldhouse-cincinnati-oh-usa-3bd3cc50.html"
      },
      "sets": {
          "set": [
              {
                  "name": "Set 1:",
                  "song": [
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "China Cat Sunflower",
                          "info": ">"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      }
                  ]
              },
              {
                  "name": "Set 2 (acoustic):",
                  "song": [
                      {
                          "name": "Friend of the Devil"
                      },
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Candyman"
                      },
                      {
                          "name": "Wake Up Little Susie",
                          "cover": {
                              "mbid": "091ec508-877f-4e3c-92a3-10903bbbc7ad",
                              "name": "The Everly Brothers",
                              "sortName": "Everly Brothers, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-everly-brothers-5bd6af64.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "Katie Mae",
                          "cover": {
                              "mbid": "d5c55b61-78b8-40c9-be1b-de7517c3aebb",
                              "name": "Lightnin’ Hopkins",
                              "sortName": "Hopkins, Lightnin’",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/lightnin-hopkins-2bd698e6.html"
                          }
                      }
                  ]
              },
              {
                  "name": "Set 3:",
                  "song": [
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Cryptical Envelopment"
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "The Other One",
                          "info": "> 'Cryptical Envelopment' reprise"
                      },
                      {
                          "name": "Cosmic Charlie"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      },
                      {
                          "name": "And We Bid You Goodnight",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/armory-fieldhouse-cincinnati-oh-1bdc8104.html"
  },
  {
      "id": "bdc8102",
      "versionId": "g43dad32f",
      "eventDate": "24-03-1970",
      "lastUpdated": "2021-08-29T15:00:17.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "73d736b9",
          "name": "Pirates World",
          "city": {
              "id": "4152772",
              "name": "Dania Beach",
              "state": "Florida",
              "stateCode": "FL",
              "coords": {
                  "lat": 26.052311,
                  "long": -80.1439343
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/pirates-world-dania-beach-fl-usa-73d736b9.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Morning Dew",
                          "cover": {
                              "mbid": "f469afbc-132f-4a6a-b10b-bc31ab5288e2",
                              "name": "Bonnie Dobson",
                              "sortName": "Dobson, Bonnie",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bonnie-dobson-3d7a1ef.html"
                          }
                      },
                      {
                          "name": "Mama Tried",
                          "cover": {
                              "mbid": "deb2448c-6fdf-4d31-921e-757630515dbd",
                              "name": "Merle Haggard",
                              "sortName": "Haggard, Merle",
                              "disambiguation": "US country singer, guitarist, fiddler & songwriter",
                              "url": "https://www.setlist.fm/setlists/merle-haggard-73d6de21.html"
                          }
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Don't Ease Me In",
                          "cover": {
                              "mbid": "46b6c6e1-81ca-4fa8-b264-8f0fe49dff1a",
                              "name": "Henry Thomas",
                              "sortName": "Thomas, Henry",
                              "disambiguation": "American country blues singer",
                              "url": "https://www.setlist.fm/setlists/henry-thomas-1bd60188.html"
                          }
                      },
                      {
                          "name": "Cold Rain and Snow",
                          "cover": {
                              "mbid": "4ace12bf-e7ec-4cb6-ab38-597e4445ac45",
                              "name": "Obray Ramsey",
                              "sortName": "Obray Ramsey",
                              "disambiguation": "folk musician and banjo player",
                              "url": "https://www.setlist.fm/setlists/obray-ramsey-2bc59466.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Dark Star"
                      },
                      {
                          "name": "The Other One"
                      },
                      {
                          "name": "St. Stephen"
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/pirates-world-dania-beach-fl-bdc8102.html"
  },
  {
      "id": "1bdc810c",
      "versionId": "732b66a9",
      "eventDate": "21-03-1970",
      "lastUpdated": "2020-10-30T10:27:57.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "53d54729",
          "name": "Capitol Theatre",
          "city": {
              "id": "5132002",
              "name": "Port Chester",
              "state": "New York",
              "stateCode": "NY",
              "coords": {
                  "lat": 41.0017643,
                  "long": -73.6656834
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/capitol-theatre-port-chester-ny-usa-53d54729.html"
      },
      "sets": {
          "set": [
              {
                  "name": "Set 1:",
                  "song": [
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "Easy Wind"
                      }
                  ]
              },
              {
                  "name": "Set 2: Acoustic",
                  "song": [
                      {
                          "name": "Friend of the Devil"
                      },
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Don't Ease Me In",
                          "cover": {
                              "mbid": "46b6c6e1-81ca-4fa8-b264-8f0fe49dff1a",
                              "name": "Henry Thomas",
                              "sortName": "Thomas, Henry",
                              "disambiguation": "American country blues singer",
                              "url": "https://www.setlist.fm/setlists/henry-thomas-1bd60188.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Wake Up Little Susie",
                          "cover": {
                              "mbid": "091ec508-877f-4e3c-92a3-10903bbbc7ad",
                              "name": "The Everly Brothers",
                              "sortName": "Everly Brothers, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-everly-brothers-5bd6af64.html"
                          }
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "Katie Mae",
                          "cover": {
                              "mbid": "d5c55b61-78b8-40c9-be1b-de7517c3aebb",
                              "name": "Lightnin’ Hopkins",
                              "sortName": "Hopkins, Lightnin’",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/lightnin-hopkins-2bd698e6.html"
                          }
                      }
                  ]
              },
              {
                  "name": "Set 3",
                  "song": [
                      {
                          "name": "Cosmic Charlie"
                      },
                      {
                          "name": "St. Stephen"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "St. Stephen"
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "In the Midnight Hour",
                          "cover": {
                              "mbid": "fc6214b3-6d82-4803-be74-01ece1723e42",
                              "name": "Wilson Pickett",
                              "sortName": "Pickett, Wilson",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/wilson-pickett-7bd6ba8c.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              },
              {
                  "encore": 1,
                  "song": [
                      {
                          "name": "And We Bid You Goodnight",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/capitol-theatre-port-chester-ny-1bdc810c.html"
  },
  {
      "id": "3c7d95f",
      "versionId": "330820e9",
      "eventDate": "21-03-1970",
      "lastUpdated": "2019-12-16T19:59:17.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "53d54729",
          "name": "Capitol Theatre",
          "city": {
              "id": "5132002",
              "name": "Port Chester",
              "state": "New York",
              "stateCode": "NY",
              "coords": {
                  "lat": 41.0017643,
                  "long": -73.6656834
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/capitol-theatre-port-chester-ny-usa-53d54729.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Walking the Dog",
                          "cover": {
                              "mbid": "af1f46fe-903c-4bbf-8e20-a3e114343bd0",
                              "name": "Rufus Thomas",
                              "sortName": "Thomas, Rufus",
                              "disambiguation": "US blues & funk singer & songwriter",
                              "url": "https://www.setlist.fm/setlists/rufus-thomas-23d6b87f.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Death Don't Have No Mercy",
                          "cover": {
                              "mbid": "f66eefea-ff87-46b5-947d-b595a4bac5c9",
                              "name": "Reverend Gary Davis",
                              "sortName": "Davis, Gary, Reverend",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/reverend-gary-davis-bd619b2.html"
                          }
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Big Boss Man",
                          "cover": {
                              "mbid": "018d8a5e-76c7-450d-a0a1-a97f8c26466f",
                              "name": "Jimmy Reed",
                              "sortName": "Reed, Jimmy",
                              "disambiguation": "blues musician",
                              "url": "https://www.setlist.fm/setlists/jimmy-reed-2bd69816.html"
                          }
                      },
                      {
                          "name": "He Was a Friend of Mine",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Viola Lee Blues",
                          "cover": {
                              "mbid": "a4e14b84-be3f-4cf3-a0d5-54c3c8c4089b",
                              "name": "Cannon’s Jug Stompers",
                              "sortName": "Cannon’s Jug Stompers",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/cannons-jug-stompers-53d613ed.html"
                          }
                      },
                      {
                          "name": "The Seven"
                      },
                      {
                          "name": "Cumberland Blues"
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/capitol-theatre-port-chester-ny-3c7d95f.html"
  },
  {
      "id": "bdc810a",
      "versionId": "7b2b66a8",
      "eventDate": "20-03-1970",
      "lastUpdated": "2020-10-30T10:27:57.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "53d54729",
          "name": "Capitol Theatre",
          "city": {
              "id": "5132002",
              "name": "Port Chester",
              "state": "New York",
              "stateCode": "NY",
              "coords": {
                  "lat": 41.0017643,
                  "long": -73.6656834
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/capitol-theatre-port-chester-ny-usa-53d54729.html"
      },
      "sets": {
          "set": [
              {
                  "name": "Set 1",
                  "song": [
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      }
                  ]
              },
              {
                  "name": "Set 2: Acoustic",
                  "song": [
                      {
                          "name": "Deep Elem Blues",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Friend of the Devil"
                      },
                      {
                          "name": "Don't Ease Me In",
                          "cover": {
                              "mbid": "46b6c6e1-81ca-4fa8-b264-8f0fe49dff1a",
                              "name": "Henry Thomas",
                              "sortName": "Thomas, Henry",
                              "disambiguation": "American country blues singer",
                              "url": "https://www.setlist.fm/setlists/henry-thomas-1bd60188.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "Katie Mae",
                          "cover": {
                              "mbid": "d5c55b61-78b8-40c9-be1b-de7517c3aebb",
                              "name": "Lightnin’ Hopkins",
                              "sortName": "Hopkins, Lightnin’",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/lightnin-hopkins-2bd698e6.html"
                          }
                      }
                  ]
              },
              {
                  "name": "Set 3",
                  "song": [
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Viola Lee Blues",
                          "cover": {
                              "mbid": "a4e14b84-be3f-4cf3-a0d5-54c3c8c4089b",
                              "name": "Cannon’s Jug Stompers",
                              "sortName": "Cannon’s Jug Stompers",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/cannons-jug-stompers-53d613ed.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              },
              {
                  "encore": 1,
                  "song": [
                      {
                          "name": "And We Bid You Goodnight",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/capitol-theatre-port-chester-ny-bdc810a.html"
  },
  {
      "id": "13dc8115",
      "versionId": "13459d29",
      "eventDate": "20-03-1970",
      "lastUpdated": "2017-08-22T01:10:26.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "53d54729",
          "name": "Capitol Theatre",
          "city": {
              "id": "5132002",
              "name": "Port Chester",
              "state": "New York",
              "stateCode": "NY",
              "coords": {
                  "lat": 41.0017643,
                  "long": -73.6656834
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/capitol-theatre-port-chester-ny-usa-53d54729.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Mama Tried",
                          "cover": {
                              "mbid": "deb2448c-6fdf-4d31-921e-757630515dbd",
                              "name": "Merle Haggard",
                              "sortName": "Haggard, Merle",
                              "disambiguation": "US country singer, guitarist, fiddler & songwriter",
                              "url": "https://www.setlist.fm/setlists/merle-haggard-73d6de21.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Cryptical Envelopment"
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "The Other One"
                      },
                      {
                          "name": "Cryptical Envelopment"
                      },
                      {
                          "name": "Cosmic Charlie"
                      }
                  ]
              },
              {
                  "encore": 1,
                  "song": [
                      {
                          "name": "Minglewood Blues",
                          "cover": {
                              "mbid": "a4e14b84-be3f-4cf3-a0d5-54c3c8c4089b",
                              "name": "Cannon’s Jug Stompers",
                              "sortName": "Cannon’s Jug Stompers",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/cannons-jug-stompers-53d613ed.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/capitol-theatre-port-chester-ny-13dc8115.html"
  },
  {
      "id": "1bc7d964",
      "versionId": "13a8651d",
      "eventDate": "17-03-1970",
      "lastUpdated": "2016-09-30T22:10:40.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "7bd61654",
          "name": "Kleinhans Music Hall",
          "city": {
              "id": "5110629",
              "name": "Buffalo",
              "state": "New York",
              "stateCode": "NY",
              "coords": {
                  "lat": 42.8864468,
                  "long": -78.8783689
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/kleinhans-music-hall-buffalo-ny-usa-7bd61654.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Dark Star"
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      },
                      {
                          "name": "St. Stephen"
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/kleinhans-music-hall-buffalo-ny-1bc7d964.html"
  },
  {
      "id": "bc7d962",
      "versionId": "g4bdad32e",
      "eventDate": "08-03-1970",
      "lastUpdated": "2021-08-29T15:00:18.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "6bd42ee6",
          "name": "Travelodge Theatre",
          "city": {
              "id": "5308655",
              "name": "Phoenix",
              "state": "Arizona",
              "stateCode": "AZ",
              "coords": {
                  "lat": 33.4483771,
                  "long": -112.0740373
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/travelodge-theatre-phoenix-az-usa-6bd42ee6.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Cold Rain and Snow",
                          "cover": {
                              "mbid": "4ace12bf-e7ec-4cb6-ab38-597e4445ac45",
                              "name": "Obray Ramsey",
                              "sortName": "Obray Ramsey",
                              "disambiguation": "folk musician and banjo player",
                              "url": "https://www.setlist.fm/setlists/obray-ramsey-2bc59466.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      },
                      {
                          "name": "The Monkey and the Engineer",
                          "cover": {
                              "mbid": "e148154d-e1fb-4da4-8db2-d54bf9a894b8",
                              "name": "Jesse Fuller",
                              "sortName": "Fuller, Jesse",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/jesse-fuller-3d60103.html"
                          }
                      },
                      {
                          "name": "Been All Around This World",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Katie Mae",
                          "cover": {
                              "mbid": "d5c55b61-78b8-40c9-be1b-de7517c3aebb",
                              "name": "Lightnin’ Hopkins",
                              "sortName": "Hopkins, Lightnin’",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/lightnin-hopkins-2bd698e6.html"
                          }
                      },
                      {
                          "name": "Jam"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/travelodge-theatre-phoenix-az-bc7d962.html"
  },
  {
      "id": "13dc8111",
      "versionId": "33a704f1",
      "eventDate": "07-03-1970",
      "lastUpdated": "2016-02-26T17:56:31.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "1bd62d4c",
          "name": "Santa Monica Civic Auditorium",
          "city": {
              "id": "5393212",
              "name": "Santa Monica",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 34.0194543,
                  "long": -118.4911912
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/santa-monica-civic-auditorium-santa-monica-ca-usa-1bd62d4c.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "The Other One"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/santa-monica-civic-auditorium-santa-monica-ca-13dc8111.html"
  },
  {
      "id": "3dcad2b",
      "versionId": "g53df3fe1",
      "eventDate": "01-03-1970",
      "lastUpdated": "2021-07-10T03:40:53.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "43d39f5b",
          "name": "Family Dog on the Great Highway",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/family-dog-on-the-great-highway-san-francisco-ca-usa-43d39f5b.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "New Speedway Boogie"
                      },
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Big Boy Pete",
                          "cover": {
                              "mbid": "70ccf5b2-44b6-48c7-8652-8f7a602d8973",
                              "name": "Don & Dewey",
                              "sortName": "Don & Dewey",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/don-and-dewey-33d78cd1.html"
                          }
                      },
                      {
                          "name": "Morning Dew",
                          "cover": {
                              "mbid": "f469afbc-132f-4a6a-b10b-bc31ab5288e2",
                              "name": "Bonnie Dobson",
                              "sortName": "Dobson, Bonnie",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bonnie-dobson-3d7a1ef.html"
                          }
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Cryptical Envelopment"
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "The Other One"
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Beat It on Down the Line",
                          "cover": {
                              "mbid": "e148154d-e1fb-4da4-8db2-d54bf9a894b8",
                              "name": "Jesse Fuller",
                              "sortName": "Fuller, Jesse",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/jesse-fuller-3d60103.html"
                          }
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Cumberland Blues"
                      },
                      {
                          "name": "I'm a King Bee",
                          "cover": {
                              "mbid": "dcf7b2e3-d3aa-41e4-bba5-40515122f209",
                              "name": "Slim Harpo",
                              "sortName": "Harpo, Slim",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/slim-harpo-bd7199a.html"
                          }
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "It's All Over Now, Baby Blue",
                          "cover": {
                              "mbid": "72c536dc-7137-4477-a521-567eeb840fa8",
                              "name": "Bob Dylan",
                              "sortName": "Dylan, Bob",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bob-dylan-1bd6adb8.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/family-dog-on-the-great-highway-san-francisco-ca-3dcad2b.html"
  },
  {
      "id": "bdcad4a",
      "versionId": "431da3cf",
      "eventDate": "28-02-1970",
      "lastUpdated": "2019-05-25T17:28:06.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "43d39f5b",
          "name": "Family Dog on the Great Highway",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/family-dog-on-the-great-highway-san-francisco-ca-usa-43d39f5b.html"
      },
      "sets": {
          "set": [
              {
                  "name": "Set I",
                  "song": [
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Cumberland Blues"
                      },
                      {
                          "name": "The Monkey and the Engineer",
                          "cover": {
                              "mbid": "e148154d-e1fb-4da4-8db2-d54bf9a894b8",
                              "name": "Jesse Fuller",
                              "sortName": "Fuller, Jesse",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/jesse-fuller-3d60103.html"
                          }
                      },
                      {
                          "name": "Little Sadie",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      }
                  ]
              },
              {
                  "name": "Set II",
                  "song": [
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "Big Boss Man",
                          "cover": {
                              "mbid": "018d8a5e-76c7-450d-a0a1-a97f8c26466f",
                              "name": "Jimmy Reed",
                              "sortName": "Reed, Jimmy",
                              "disambiguation": "blues musician",
                              "url": "https://www.setlist.fm/setlists/jimmy-reed-2bd69816.html"
                          }
                      },
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Alligator"
                      },
                      {
                          "name": "The Other One"
                      },
                      {
                          "name": "Mason's Children"
                      },
                      {
                          "name": "Uncle John's Band"
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/family-dog-on-the-great-highway-san-francisco-ca-bdcad4a.html"
  },
  {
      "id": "73dcb2a5",
      "versionId": "g53dad32d",
      "eventDate": "27-02-1970",
      "lastUpdated": "2021-08-29T15:00:18.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "43d39f5b",
          "name": "Family Dog on the Great Highway",
          "city": {
              "id": "5391959",
              "name": "San Francisco",
              "state": "California",
              "stateCode": "CA",
              "coords": {
                  "lat": 37.775,
                  "long": -122.419
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/family-dog-on-the-great-highway-san-francisco-ca-usa-43d39f5b.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "Cold Rain and Snow",
                          "cover": {
                              "mbid": "4ace12bf-e7ec-4cb6-ab38-597e4445ac45",
                              "name": "Obray Ramsey",
                              "sortName": "Obray Ramsey",
                              "disambiguation": "folk musician and banjo player",
                              "url": "https://www.setlist.fm/setlists/obray-ramsey-2bc59466.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Dancing in the Street",
                          "cover": {
                              "mbid": "9d1bc10a-24fe-4b41-8338-ea92d8101a09",
                              "name": "Martha Reeves and the Vandellas",
                              "sortName": "Reeves, Martha and the Vandellas",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/martha-reeves-and-the-vandellas-1bd2b1a4.html"
                          }
                      },
                      {
                          "name": "Easy Wind"
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Good Lovin'",
                          "cover": {
                              "mbid": "75e19ec8-ed4e-495a-8989-6977574957f6",
                              "name": "The Young Rascals",
                              "sortName": "Young Rascals, The",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/the-young-rascals-33d67071.html"
                          }
                      },
                      {
                          "name": "Drums"
                      },
                      {
                          "name": "China Cat Sunflower"
                      },
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Hard to Handle",
                          "cover": {
                              "mbid": "82b1f5fd-cd31-41a9-b5d4-7e33f0eb9751",
                              "name": "Otis Redding",
                              "sortName": "Redding, Otis",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/otis-redding-2bd6b83a.html"
                          }
                      },
                      {
                          "name": "Casey Jones"
                      },
                      {
                          "name": "Cumberland Blues"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Turn On Your Love Light",
                          "cover": {
                              "mbid": "66ebc271-6a26-4fe7-848b-f217da119d92",
                              "name": "Bobby “Blue” Bland",
                              "sortName": "Bland, Bobby “Blue”",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/bobby-blue-bland-4bd7b36e.html"
                          }
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/family-dog-on-the-great-highway-san-francisco-ca-73dcb2a5.html"
  },
  {
      "id": "63dcb2a7",
      "versionId": "6bb59aa6",
      "eventDate": "23-02-1970",
      "lastUpdated": "2015-07-20T15:33:40.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "1bd6c99c",
          "name": "Municipal Auditorium",
          "city": {
              "id": "4671654",
              "name": "Austin",
              "state": "Texas",
              "stateCode": "TX",
              "coords": {
                  "lat": 30.267153,
                  "long": -97.7430608
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/municipal-auditorium-austin-tx-usa-1bd6c99c.html"
      },
      "sets": {
          "set": [
              {
                  "song": [
                      {
                          "name": "I Know You Rider",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "High Time"
                      },
                      {
                          "name": "Dire Wolf"
                      },
                      {
                          "name": "Yellow Dog Story"
                      },
                      {
                          "name": "The Monkey and the Engineer",
                          "cover": {
                              "mbid": "e148154d-e1fb-4da4-8db2-d54bf9a894b8",
                              "name": "Jesse Fuller",
                              "sortName": "Fuller, Jesse",
                              "disambiguation": "",
                              "url": "https://www.setlist.fm/setlists/jesse-fuller-3d60103.html"
                          }
                      },
                      {
                          "name": "Little Sadie",
                          "cover": {
                              "mbid": "9be7f096-97ec-4615-8957-8d40b5dcbc41",
                              "name": "[traditional]",
                              "sortName": "[traditional]",
                              "disambiguation": "Special Purpose Artist",
                              "url": "https://www.setlist.fm/setlists/traditional-5bd2f7e4.html"
                          }
                      },
                      {
                          "name": "Me and My Uncle",
                          "cover": {
                              "mbid": "1333db0b-41d1-42fa-8e7e-526b4cc70d64",
                              "name": "John Phillips",
                              "sortName": "Phillips, John",
                              "disambiguation": "The Mamas & The Papas",
                              "url": "https://www.setlist.fm/setlists/john-phillips-13d60529.html"
                          }
                      },
                      {
                          "name": "Black Peter"
                      },
                      {
                          "name": "Seasons of My Heart",
                          "cover": {
                              "mbid": "f2903be0-79a7-4334-8cc5-e45309482a97",
                              "name": "George Jones",
                              "sortName": "Jones, George",
                              "disambiguation": "US country music vocalist",
                              "url": "https://www.setlist.fm/setlists/george-jones-7bd6de20.html"
                          }
                      },
                      {
                          "name": "Uncle John's Band"
                      },
                      {
                          "name": "Not Fade Away",
                          "cover": {
                              "mbid": "de9a19b3-531b-4df3-ae90-4763fe282946",
                              "name": "The Crickets",
                              "sortName": "Crickets, The",
                              "disambiguation": "band originally with Buddy Holly",
                              "url": "https://www.setlist.fm/setlists/the-crickets-73d69e79.html"
                          }
                      },
                      {
                          "name": "Mason's Children"
                      }
                  ]
              }
          ]
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/municipal-auditorium-austin-tx-63dcb2a7.html"
  },
  {
      "id": "1bc7d970",
      "versionId": "2be374ee",
      "eventDate": "22-02-1970",
      "lastUpdated": "2013-10-02T04:07:12.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "5bd63f54",
          "name": "Sam Houston Coliseum",
          "city": {
              "id": "4699066",
              "name": "Houston",
              "state": "Texas",
              "stateCode": "TX",
              "coords": {
                  "lat": 29.7632836,
                  "long": -95.3632715
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/sam-houston-coliseum-houston-tx-usa-5bd63f54.html"
      },
      "sets": {
          "set": []
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/sam-houston-coliseum-houston-tx-1bc7d970.html"
  },
  {
      "id": "6bc7de86",
      "versionId": "3301dc6d",
      "eventDate": "21-02-1970",
      "lastUpdated": "2019-09-28T04:52:34.000+0000",
      "artist": {
          "mbid": "6faa7ca7-0d99-4a5e-bfa6-1fd5037520c6",
          "name": "Grateful Dead",
          "sortName": "Grateful Dead",
          "disambiguation": "",
          "url": "https://www.setlist.fm/setlists/grateful-dead-bd6ad4a.html"
      },
      "venue": {
          "id": "6bd6da6a",
          "name": "Municipal Auditorium",
          "city": {
              "id": "4726206",
              "name": "San Antonio",
              "state": "Texas",
              "stateCode": "TX",
              "coords": {
                  "lat": 29.4241219,
                  "long": -98.4936282
              },
              "country": {
                  "code": "US",
                  "name": "United States"
              }
          },
          "url": "https://www.setlist.fm/venue/municipal-auditorium-san-antonio-tx-usa-6bd6da6a.html"
      },
      "sets": {
          "set": []
      },
      "url": "https://www.setlist.fm/setlist/grateful-dead/1970/municipal-auditorium-san-antonio-tx-6bc7de86.html"
  }
]
}

async function fetchData(currentData = [], page = 1) {
  try {
    console.log(`fetching page ${page}`);
    const res = await axios.get(baseUrl, {
      params: {
        p: page
      },
      headers: {
        "x-api-key": process.env.SETLIST_FM_API_KEY
      }
    });
    const data = res.data;
    const newData = [...currentData, ...data.setlist];
    const hasMoreData = (data.itemsPerPage * data.page) < data.total;
    // if (hasMoreData) {
    if (hasMoreData && page < 3) {
      await wait(2000);
      return await fetchData(newData, page + 1);
    } else {
      return newData;
    }
  } catch (err) {
    console.error(err);
  }
}

function tranformSetlistObject(obj) {
  const [day, month, year] = obj.eventDate
    .split('-')
    .map(x => parseInt(x));
  
  return {
    title: `${month}/${day}/${year}`,
    month,
    day,
    year,
    venue: {
      name: obj.venue.name,
      city: {
        name: obj.venue.city.name
      },
      state: {
        name: obj.venue.city.state,
        code: obj.venue.city.stateCode
      },
      country: {
        name: obj.venue.city.country.name,
        code: obj.venue.city.country.code
      }
    },
    sets: obj.sets.set.map((setInstance, i) => {
      return {
        position: i,
        song_instances: setInstance.song.map((songInstance, j) => {
          return {
            position: j,
            is_segued: songInstance?.info?.includes('>') ? true : false,
            song: {
              name: songInstance.name,
              is_cover: songInstance.cover ? true : false,
              original_by: songInstance?.cover?.name || null
            }
          };
        })
      }
    })
  };
}

function getUniqueObjsByName(objArr) {
  return objArr
    .reduce((acc, curr) => {
      if (!acc.some(obj => obj.name === curr.name)) {
        acc.push(curr);
      }
      return acc;
    }, []);
}

function findObjByName(name, arr) {
  return arr.find(obj => obj.name === name);
}

function getCities(data) {
  const uniqueCities = getUniqueObjsByName(data.map(x => x.venue.city));
  return uniqueCities.map(city => ({ _id: uuidv4(), ...city }))
}

function getStates(data) {
  const uniqueStates = getUniqueObjsByName(data.map(x => x.venue.state));
  return uniqueStates.map(state => ({ _id: uuidv4(), ...state }))
}

function getCountries(data) {
  const uniqueCountries = getUniqueObjsByName(data.map(x => x.venue.country));
  return uniqueCountries.map(country => ({ _id: uuidv4(), ...country }))
}

function getVenues(data, { cities, states, countries }) {
  const uniqueVenues = getUniqueObjsByName(data.map(x => ({
    ...x.venue,
    city: findObjByName(x.venue.city.name, cities),
    state: findObjByName(x.venue.state.name, states),
    country: findObjByName(x.venue.country.name, countries),
  })));
  return uniqueVenues.map(venue => ({ _id: uuidv4(), ...venue }))
}

function getSongs(data) {
  const uniqueSongs = getUniqueObjsByName(
    data
      .map(x => x.sets
        .map(set => set.song_instances
          .map(songInstance => songInstance.song)
        )
      )
      .flat(3)
  );  
  return uniqueSongs.map(song => ({ _id: uuidv4(), ...song }))
}

function getShows(data, { cities, states, countries, venues, songs }) {
  return data.map(show => ({
    _id: uuidv4(),
    ...show,
    venue: findObjByName(show.venue.name, venues),
    sets: show.sets.map(set => ({
      _id: uuidv4(),
      ...set,
      song_instances: set.song_instances.map(songInstance => ({
        _id: uuidv4(),
        ...songInstance,
        song: findObjByName(songInstance.song.name, songs)
      }))
    }))
  }));
}

async function main() {
  const data = await fetchData();
  //const data = await fetchFakeData();
  const reformattedData = data.map(d => tranformSetlistObject(d));
  const cities = getCities(reformattedData);
  const states = getStates(reformattedData);
  const countries = getCountries(reformattedData);
  const venues = getVenues(reformattedData, { cities, states, countries });
  const songs = getSongs(reformattedData);
  const shows = getShows(reformattedData, { cities, states, countries, venues, songs });
  console.log(JSON.stringify(venues));

}

main()