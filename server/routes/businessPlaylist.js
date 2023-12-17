const router = require("express").Router();
const { spawn } = require("child_process");

function isSameArr(arr1, arr2) {
  return (
    JSON.stringify(arr1.slice().sort()) === JSON.stringify(arr2.slice().sort())
  );
}

//create the playlist user wants: cafe, bar, club
router.post("/", async (req, res) => {
  const { playlistVectors, filterForm } = req.body;
  // console.log("1", playlistVectors, "2", filterForm);

  // C:\Users\hasan\Projects\mis-463-project\deneme.py
  const pythonProcess = spawn("python", [
    "main.py",
    playlistVectors?.danceability,
    playlistVectors?.energy,
    playlistVectors?.acousticness,
    playlistVectors?.valence,
    filterForm?.popularity,
    isSameArr(filterForm?.timeSignature, [3, 4, 5, 7]) ||
    !filterForm?.timeSignature
      ? "None"
      : JSON.stringify(filterForm?.timeSignature),
    isSameArr(filterForm?.key, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) ||
    !filterForm?.key //or it is empty
      ? "None"
      : JSON.stringify(filterForm?.key),
    filterForm?.mode === "None" ? "None" : JSON.stringify([filterForm?.mode]),
    filterForm?.speechy,
    filterForm?.instrumental,
    filterForm?.live,
    filterForm?.numberOfTracks,
    filterForm?.customerChoiceGenres ? "yes" : "no",
    filterForm?.genres.join(","),
  ]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error from Python script: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      try {
        const newResult = JSON.parse(result);
        console.log(newResult);
        // console.log(result);
        res.status(200).json({
          playlist: JSON.parse(newResult[0]),
          similarity: JSON.parse(newResult[1]),
          tableData: JSON.parse(newResult[2]),
        });
      } catch (err) {
        console.log("what?", err);
        res.status(500).send(`Something went horribly wrong!`);
      }
    } else {
      res.status(500).send(`Python script exited with code ${code}`);
    }
  });
});

module.exports = router;
