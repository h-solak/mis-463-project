import { BarChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";

const cafeVectorPreset = {
  danceability: 37.4 / 100,
  energy: 70.1 / 100,
  acousticness: 55.8 / 100,
  valence: 69.4 / 100,
};
const barVectorPreset = {
  danceability: 76.9 / 100,
  energy: 84.6 / 100,
  acousticness: 58.2 / 100,
  valence: 80.2 / 100,
};
const clubVectorPreset = {
  danceability: 97.4 / 100,
  energy: 85.7 / 100,
  acousticness: 24.7 / 100,
  valence: 81.8 / 100,
};

const VectorDistribution = ({ data, resemble }) => {
  const [chartData, setChartData] = useState();
  const [presetData, setPresetData] = useState();

  useEffect(() => {
    let valence = 0;
    let energy = 0;
    let acousticness = 0;
    let danceability = 0;
    const totalTracks = data.length;

    data?.map((item) => {
      valence += item.valence;
      energy += item.energy;
      acousticness += item.acousticness;
      danceability += item.danceability;
    });

    valence /= totalTracks;
    energy /= totalTracks;
    acousticness /= totalTracks;
    danceability /= totalTracks;

    setChartData([
      {
        name: "Dance",
        value: danceability,
      },
      {
        name: "Energy",
        value: energy,
      },

      {
        name: "Acoust",
        value: acousticness,
      },
      {
        name: "Happy",
        value: valence,
      },
    ]);
    const newPresetData =
      resemble == ""
        ? null
        : resemble == "Cafe"
        ? {
            label: "Cafe Preset Vectors",
            data: [
              cafeVectorPreset.danceability,
              cafeVectorPreset.energy,
              cafeVectorPreset.acousticness,
              cafeVectorPreset.valence,
            ],
          }
        : resemble == "Bar"
        ? {
            label: "Bar Preset Vectors",
            data: [
              barVectorPreset.danceability,
              barVectorPreset.energy,
              barVectorPreset.acousticness,
              barVectorPreset.valence,
            ],
          }
        : {
            label: "Club Preset Vectors",
            data: [
              clubVectorPreset.danceability,
              clubVectorPreset.energy,
              clubVectorPreset.acousticness,
              clubVectorPreset.valence,
            ],
          };
    setPresetData(newPresetData);
  }, []);

  //   const data = {
  //     label: "New Playlist Vectors",
  //     data: [
  //       chartData[0].value,
  //       chartData[1].value,
  //       chartData[2].value,
  //       chartData[3].value,
  //     ],
  //   }

  return (
    chartData && (
      <BarChart
        // dataset={chartData}
        // xAxis={[
        //   {
        //     scaleType: "band",
        //     data: ["Page 1", "Page 2", "Page 3"],
        //     //   categoryGapRatio: 0.3
        //     //   barGapRatio: 0.1
        //   },
        // ]}
        xAxis={[
          { scaleType: "band", data: ["Dance", "Energy", "Acoust", "Happy"] },
        ]}
        series={
          presetData
            ? [
                {
                  label: "Your Playlist's Vectors",
                  data: [
                    chartData[0].value,
                    chartData[1].value,
                    chartData[2].value,
                    chartData[3].value,
                  ],
                },
                presetData,
              ]
            : [
                {
                  label: "Your Playlist's Vectors",
                  data: [
                    chartData[0].value,
                    chartData[1].value,
                    chartData[2].value,
                    chartData[3].value,
                  ],
                },
              ]
        }
        // yAxis={[{ scaleType: "band", dataKey: "name" }]}
        // series={[{ dataKey: "value" }]}
        // layout="horizontal"
        height={300}
        width={500}
        colors={["#15A649", "#333"]}
        sx={{
          fillShadowGradient: "#ff0000",
        }}
      />
    )
  );
};

export default VectorDistribution;

// const newPlaylistData = {
//     label: "New Playlist Vectors",
//     data: [
//       chartData[0].value,
//       chartData[1].value,
//       chartData[2].value,
//       chartData[3].value,
//     ],
//   };

//   const presetData =
//     resemble == ""
//       ? null
//       : resemble == "Cafe"
//       ? {
//           label: "Cafe Preset Vectors",
//           data: [
//             cafeVectorPreset.danceability,
//             cafeVectorPreset.energy,
//             cafeVectorPreset.acousticness,
//             cafeVectorPreset.valence,
//           ],
//         }
//       : resemble == "Bar"
//       ? {
//           label: "Bar Preset Vectors",
//           data: [
//             barVectorPreset.danceability,
//             barVectorPreset.energy,
//             barVectorPreset.acousticness,
//             barVectorPreset.valence,
//           ],
//         }
//       : {
//           label: "Club Preset Vectors",
//           data: [
//             clubVectorPreset.danceability,
//             clubVectorPreset.energy,
//             clubVectorPreset.acousticness,
//             clubVectorPreset.valence,
//           ],
//         };
