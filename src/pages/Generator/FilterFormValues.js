const filterFormValues = [
  //1
  {
    title: "Popularity",
    stateTitle:
      "popularity" /* State title helps us change the state of the filter */,
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "Popular",
        value: "popular",
      },
      {
        title: "Moderately Popular",
        value: "mid-popular",
      },
      {
        title: "Unpopular",
        value: "unpopular",
      },
    ],
  },
  //2
  {
    title: "Time Signature",
    stateTitle: "timeSignature",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "3/4",
        value: "3/4",
      },
      {
        title: "4/4",
        value: "4/4",
      },
      {
        title: "5/4",
        value: "5/4",
      },
      {
        title: "7/4",
        value: "7/4",
      },
    ],
  },
  //3
  {
    title: "Key",
    stateTitle: "key",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "A",
        value: "A",
      },
      {
        title: "B",
        value: "B",
      },
      {
        title: "C",
        value: "C",
      },
      {
        title: "D",
        value: "D",
      },
      {
        title: "E",
        value: "E",
      },
    ],
  },
  //4
  {
    title: "Mode",
    stateTitle: "mode",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "Minor",
        value: "Minor",
      },
      {
        title: "Major",
        value: "Major",
      },
    ],
  },
  //5
  {
    title: "Speechiness",
    stateTitle: "speechy",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "Yes",
        value: "yes",
      },
      {
        title: "No",
        value: "no",
      },
    ],
  },
  //6
  {
    title: "Instrumentalness",
    stateTitle: "instrumental",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "High",
        value: "High",
      },
      {
        title: "Low",
        value: "Low",
      },
    ],
  },
  //7
  {
    title: "Liveness",
    stateTitle: "live",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "High",
        value: "High",
      },
      {
        title: "Low",
        value: "Low",
      },
    ],
  },
  //8
  {
    title: "Number Of Tracks",
    stateTitle: "numberOfTracks",
    options: [
      {
        title: "30",
        value: "None",
      },
      {
        title: "40",
        value: "40",
      },
      {
        title: "50",
        value: "50",
      },
    ],
  },
];

const defaultGenres = [
  {
    name: "Rap",
    value: "rap",
    isChecked: true,
  },
  {
    name: "Alternative",
    value: "alternative",
    isChecked: true,
  },
  {
    name: "Rock",
    value: "rock",
    isChecked: true,
  },
  {
    name: "Grunge",
    value: "grunge",
    isChecked: true,
  },
  {
    name: "Pop",
    value: "pop",
    isChecked: true,
  },
  {
    name: "Jazz",
    value: "jazz",
    isChecked: true,
  },
  {
    name: "Hip Hop",
    value: "hiphop",
    isChecked: true,
  },
];

export { filterFormValues, defaultGenres };
