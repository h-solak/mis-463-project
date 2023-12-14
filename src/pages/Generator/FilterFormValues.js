const filterFormValues = [
  //1
  {
    title: "Popularity",
    stateTitle:
      "popularity" /* State title helps us change the state of the filter */,

    tooltip: "Whether the song is popular or not",
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
  //timeSignature section is here - seperate
  //keys section is here - seperate
  //4
  {
    title: "Mode",
    stateTitle: "mode",
    tooltip:
      "The modality (major or minor) of a track, the type of scale from which its melodic content is derived",
    options: [
      {
        title: "All",
        value: "None",
      },
      {
        title: "Minor",
        value: "0",
      },
      {
        title: "Major",
        value: "1",
      },
    ],
  },
  //5
  {
    title: "Speechy",
    stateTitle: "speechy",
    tooltip: "The presence of spoken words in a track",
    options: [
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
    title: "Instrumental",
    stateTitle: "instrumental",
    tooltip: "Whether a track contains no vocals",
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
  //7
  {
    title: "Live",
    stateTitle: "live",
    tooltip: "The presence of an audience in the recording",
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

const timeSignatureSection = {
  title: "Time Signature",
  stateTitle: "timeSignature",
  tooltip: "How many beats are in each bar",
  options: [
    {
      title: "3/4",
      value: 3,
    },
    {
      title: "4/4",
      value: 4,
    },
    {
      title: "5/4",
      value: 5,
    },
    {
      title: "7/4",
      value: 7,
    },
  ],
};

const keysSection = {
  title: "Key",
  stateTitle: "key",
  tooltip: "The key the tracks are in",
  options: [
    {
      title: "C",
      value: 0,
    },
    {
      title: "C#",
      value: 1,
    },
    {
      title: "D",
      value: 2,
    },
    {
      title: "D#",
      value: 3,
    },

    {
      title: "E",
      value: 4,
    },
    {
      title: "F",
      value: 5,
    },
    {
      title: "F#",
      value: 6,
    },
    {
      title: "G",
      value: 7,
    },
    {
      title: "G#",
      value: 8,
    },
    {
      title: "A",
      value: 9,
    },
    {
      title: "A#",
      value: 10,
    },
    {
      title: "B",
      value: 11,
    },
  ],
};

const defaultGenres = [
  {
    name: "Rock",
    value: "Rock",
    isChecked: true,
  },
  {
    name: "Pop",
    value: "Pop",
    isChecked: true,
  },
  {
    name: "Metal",
    value: "Metal",
    isChecked: true,
  },
  {
    name: "Hip Hop",
    value: "Hip Hop",
    isChecked: true,
  },

  {
    name: "Electronic",
    value: "Electronic",
    isChecked: true,
  },

  {
    name: "Jazz",
    value: "Jazz",
    isChecked: true,
  },
  {
    name: "R&B",
    value: "R&B",
    isChecked: true,
  },
  {
    name: "Blues",
    value: "Blues",
    isChecked: true,
  },
  {
    name: "Easy Listening",
    value: "Easy Listening",
    isChecked: true,
  },
  {
    name: "Classical",
    value: "Classical",
    isChecked: true,
  },
  {
    name: "Folk/Acoustic",
    value: "Folk/Acoustic",
    isChecked: true,
  },
];

export { filterFormValues, timeSignatureSection, keysSection, defaultGenres };
