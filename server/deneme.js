const fs = require("fs");
const path = require("path");
const base64 = require("base-64");
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");

const CLIENT_ID = "";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";
const SCOPE = "ugc-image-upload playlist-modify-public playlist-modify-private";

const spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI,
});

const tracksToFilterPath = "Database/Implement/tracks_to_filter.csv";
const tracksToVectorizePath = "Database/Implement/tracks_to_vectorize.csv";

const tracksToFilter = fs.readFileSync(tracksToFilterPath, "utf8");
const tracksToVectorize = fs.readFileSync(tracksToVectorizePath, "utf8");

class UserEstablishmentChoice {
  static VECTORS = {
    cafe: [0.374, 0.701, 0.558, 0.694],
    bar: [0.769, 0.846, 0.582, 0.802],
    club: [0.974, 0.857, 0.247, 0.818],
  };

  constructor(ESTABLISHMENT = "cafe") {
    this._ESTABLISHMENT = ESTABLISHMENT.toLowerCase();
  }

  get ESTABLISHMENT() {
    return this._ESTABLISHMENT;
  }

  set ESTABLISHMENT(value) {
    this._ESTABLISHMENT = value.toLowerCase();
  }

  get VECTOR() {
    return UserEstablishmentChoice.VECTORS[this._ESTABLISHMENT];
  }
}

class UserVectorSettings {
  static DANCEABILITY = null;
  static ENERGY = null;
  static ACOUSTICNESS = null;
  static VALENCE = null;
}

class UserFilterSettings {
  static POPULARITY = null;
  static MIN_DURATION_OF_EACH_TRACK = null;
  static MAX_DURATION_OF_EACH_TRACK = null;
  static TIME_SIGNATURE = null;
  static KEY = null;
  static MIN_TEMPO_OF_EACH_TRACK = null;
  static MAX_TEMPO_OF_EACH_TRACK = null;
  static MODE = null;
  static EXPLICIT = null;
  static SPEECHY = null;
  static INSTRUMENTAL = null;
  static LIVE = null;
  static NUMBER_OF_TRACKS_IN_PLAYLIST = null;
  static GENRES = null;
  static CUSTOMER_CHOICE_GENRES = null;
}

function getVector(
  EST = "cafe",
  danceability = null,
  energy = null,
  acousticness = null,
  valence = null
) {
  const vector = UserEstablishmentChoice(EST).VECTOR;

  return [
    danceability === null ? vector[0] : danceability,
    energy === null ? vector[1] : energy,
    acousticness === null ? vector[2] : acousticness,
    valence === null ? vector[3] : valence,
  ];
}

function calculateSimilarity(vectorDF, filterDF, vector) {
  const sigma = 0.6281537543781288;

  const calculated = vectorDF.slice();
  calculated["euc_distance"] = norm(
    calculated.set_index("track_id").values - vector,
    { axis: 1 }
  );
  calculated["similarity"] = np.exp(
    calculated["euc_distance"] ** 2 / (2 * sigma ** 2)
  );
  calculated =
    calculated[
      calculated["similarity"] >= np.quantile(calculated.similarity, 0.935)
    ];

  const ttf =
    filterDF[filterDF["track_id"].isin(calculated["track_id"])].slice();

  return ttf;
}

function filterTracks(
  filterDF,
  EST = null,
  popularity = null,
  minDuration = null,
  maxDuration = null,
  timeSignature = null,
  key = null,
  minTempo = null,
  maxTempo = null,
  mode = null,
  explicit = null,
  speechy = "no",
  instrumental = null,
  live = null,
  numTracks = 30,
  genres = null,
  customerChoiceGenres = "yes"
) {
  const df = filterDF.slice();
  const numTracksInPlaylist = numTracks || 30;

  const popularities = {
    unpopular: Array.from({ length: 41 }, (_, i) => i),
    "mid-popular": Array.from({ length: 29 }, (_, i) => i + 41),
    popular: Array.from({ length: 31 }, (_, i) => i + 70),
  };

  const est = EST.toLowerCase();

  const ests = {
    bar: {
      Rock: 0.28,
      Pop: 0.18,
      Metal: 0.16,
      HipHop: 0.14,
      Electronic: 0.1,
      Jazz: 0.1,
      RB: 0.04,
    },
    cafe: {
      Jazz: 0.21,
      Rock: 0.18,
      Blues: 0.17,
      EasyListening: 0.14,
      Pop: 0.11,
      Classical: 0.11,
      FolkAcoustic: 0.08,
    },
    club: {
      Electronic: 0.65,
      Pop: 0.23,
      HipHop: 0.08,
      Rock: 0.04,
    },
  };

  if (popularity !== null) {
    const popRange = popularities[popularity.toLowerCase()];
    df = df[df["popularity"].isin(popRange)].slice();
  }

  if (minDuration !== null) {
    df = df[df["duration"] >= minDuration].slice();
  }

  if (maxDuration !== null) {
    df = df[df["duration"] <= maxDuration].slice();
  }

  if (timeSignature !== null) {
    df = df[df["time_signature"].isin(timeSignature)].slice();
  }

  if (key !== null) {
    df = df[df["key"].isin(key)].slice();
  }

  if (minTempo !== null) {
    df = df[df["tempo"] >= minTempo].slice();
  }

  if (maxTempo !== null) {
    df = df[df["tempo"] <= maxTempo].slice();
  }

  if (mode !== null) {
    df = df[df["mode"].isin(mode)].slice();
  }

  if (explicit !== null) {
    if (explicit.toLowerCase() === "yes") {
      df = df[df["explicit"] === 1].slice();
    } else if (explicit.toLowerCase() === "no") {
      df = df[df["explicit"] === 0].slice();
    }
  }

  if (
    speechy !== null &&
    df[df["speechiness"] >= 0.66].length > numTracksInPlaylist
  ) {
    if (speechy.toLowerCase() === "yes") {
      df = df[df["speechiness"] >= 0.66].slice();
    } else if (speechy.toLowerCase() === "no") {
      df = df[df["speechiness"] < 0.66].slice();
    }
  }

  if (instrumental !== null) {
    if (instrumental.toLowerCase() === "yes") {
      df = df[df["instrumentalness"] >= 0.5].slice();
    } else if (instrumental.toLowerCase() === "no") {
      df = df[df["instrumentalness"] < 0.5].slice();
    }
  }

  if (live !== null) {
    if (
      live.toLowerCase() === "yes" &&
      df[df["liveness"] >= 0.8].length > numTracksInPlaylist
    ) {
      df = df[df["liveness"] >= 0.8].slice();
    } else if (live.toLowerCase() === "no") {
      df = df[df["liveness"] < 0.8].slice();
    }
  }

  if (genres !== null && String(customerChoiceGenres).toLowerCase() !== "yes") {
    const lowerGenres = genres.map((g) => g.toLowerCase());
    df = df[df["genre"].toLowerCase().isin(lowerGenres)].slice();
  }

  try {
    if (String(customerChoiceGenres).toLowerCase() === "yes") {
      const genreDfs = [];
      for (const [g, w] of Object.entries(ests[est])) {
        const gAdd = df[df["genre"] === g]
          .sample(int(numTracksInPlaylist * w) + 1)
          .slice();
        genreDfs.push(gAdd);
      }
      df = pd.concat(genreDfs).slice();
    }
    df = df.sample(numTracksInPlaylist).slice();
  } catch (e) {
    // Handle the ValueError exception
  }

  return df;
}

async function createPlaylist(trackIds, playlistName = null, desc = null) {
  const user = await spotifyApi.getMe();
  const userId = user.body.id;

  const playlist = await spotifyApi.createPlaylist(userId, playlistName, {
    description: desc,
  });
  await spotifyApi.addTracksToPlaylist(playlist.body.id, trackIds);

  const imagePath = path.join(__dirname, "tunemix.jpg");
  const image64Encode = base64.encode(fs.readFileSync(imagePath));

  await spotifyApi.uploadCustomPlaylistCoverImage(
    playlist.body.id,
    image64Encode
  );

  return `https://open.spotify.com/playlist/${playlist.body.id}`;
}

const est = "club";
UserVectorSettings.DANCEABILITY = null;
UserVectorSettings.ENERGY = null;
UserVectorSettings.ACOUSTICNESS = null;
UserVectorSettings.VALENCE = null;

const vector = getVector(
  est,
  UserVectorSettings.DANCEABILITY,
  UserVectorSettings.ENERGY,
  UserVectorSettings.ACOUSTICNESS,
  UserVectorSettings.VALENCE
);

const filterDF = calculateSimilarity(tracksToVectorize, tracksToFilter, vector);

UserFilterSettings.POPULARITY = null;
UserFilterSettings.MIN_DURATION_OF_EACH_TRACK = null;
UserFilterSettings.MAX_DURATION_OF_EACH_TRACK = null;
UserFilterSettings.TIME_SIGNATURE = null;
UserFilterSettings.KEY = null;
UserFilterSettings.MIN_TEMPO_OF_EACH_TRACK = null;
UserFilterSettings.MAX_TEMPO_OF_EACH_TRACK = null;
UserFilterSettings.MODE = null;
UserFilterSettings.EXPLICIT = null;
// UserFilterSettings.SPEECHY = null;
UserFilterSettings.INSTRUMENTAL = null;
UserFilterSettings.LIVE = null;
UserFilterSettings.NUMBER_OF_TRACKS_IN_PLAYLIST = null;
UserFilterSettings.GENRES = null;
// UserFilterSettings.CUSTOMER_CHOICE_GENRES = null;

const tracksFiltered = filterTracks(
  filterDF,
  est,
  UserFilterSettings.POPULARITY,
  UserFilterSettings.MIN_DURATION_OF_EACH_TRACK,
  UserFilterSettings.MAX_DURATION_OF_EACH_TRACK,
  UserFilterSettings.TIME_SIGNATURE,
  UserFilterSettings.KEY,
  UserFilterSettings.MIN_TEMPO_OF_EACH_TRACK,
  UserFilterSettings.MAX_TEMPO_OF_EACH_TRACK,
  UserFilterSettings.MODE,
  UserFilterSettings.EXPLICIT,
  UserFilterSettings.SPEECHY,
  UserFilterSettings.INSTRUMENTAL,
  UserFilterSettings.LIVE,
  UserFilterSettings.NUMBER_OF_TRACKS_IN_PLAYLIST,
  UserFilterSettings.GENRES,
  UserFilterSettings.CUSTOMER_CHOICE_GENRES
);

const description = "Created by TuneMix";

createPlaylist(
  tracksFiltered["track_id"],
  `TuneMix: ${est.charAt(0).toUpperCase() + est.slice(1)} #${String(
    Math.floor(Date.now() / 1000)
  ).slice(-8)}`,
  description
);
