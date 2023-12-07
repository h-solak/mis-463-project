const router = require("express").Router();
const { spawn } = require("child_process");

//create the playlist user wants: cafe, bar, club
router.post("/", async (req, res) => {
  const { businessType, param2 } = req.body;

  // C:\Users\hasan\Projects\mis-463-project\deneme.py
  const pythonProcess = spawn("python", ["main.py", businessType, param2]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error from Python script: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    if (code === 0) {
      const newResult = JSON.parse(result);
      console.log(newResult);
      res.status(200).json({ playlist: JSON.parse(result) });
    } else {
      res.status(500).send(`Python script exited with code ${code}`);
    }
  });
});

router.get("/", async (req, res) => {
  console.log("Heck yeah");
  res.status(200).json({ success: true });
});

module.exports = router;
