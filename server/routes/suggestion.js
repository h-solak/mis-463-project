const Tracks = require("../models/Track");
const router = require("express").Router();

//create random playlist
router.post("/", async (req, res) => {
  try {
    // const track = await Tracks.findOne({
    //   track_id: "1wsRitfRRtWyEapl0q22o8",
    // });
    const newTracks = await Tracks.aggregate([{ $sample: { size: 30 } }]);
    res.status(200).json({ tracks: newTracks });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
