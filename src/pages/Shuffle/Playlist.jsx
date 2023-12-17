import { Box, Button, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  getPlaylistTracks,
  reorderPlaylistTracks,
} from "../../services/tracks";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { getRandomNum } from "../../utils/getRandomNum";
import toast from "react-hot-toast";
import ConfirmDialogModal from "../../components/ConfirmDialogModal";

const Playlist = ({ playlist }) => {
  const [progress, setProgress] = useState({
    isShuffling: false,
    progress: 0,
  });
  const [confirmShuffleModal, setConfirmShuffleModal] = useState(false);

  const getPlaylist = async (id) => {
    const res = await getPlaylistTracks(id);
    // window.open(playlist.external_urls.spotify, "_blank");
  };

  const shuffle = async (id, playlistName) => {
    const totalTracks = parseInt(playlist?.tracks?.total);

    setProgress({
      isShuffling: true,
      progress: 0,
    });
    for (let i = 0; i < totalTracks; i++) {
      await reorderPlaylistTracks(id, getRandomNum(totalTracks - 1), i);
      setProgress({
        isShuffling: true,
        progress: Math.round(((i + 1) / totalTracks) * 100),
      });
    }
    setProgress({
      isShuffling: true,
      progress: 100,
    });
    setTimeout(
      () =>
        setProgress({
          isShuffling: false,
          progress: 0,
        }),
      250
    );
    toast.success(`${playlistName} is shuffled!`);
  };

  return (
    <>
      <Box
        paddingX={1}
        paddingY={1}
        display={"flex"}
        alignItems={"center"}
        gap={2}
        className="w-100"
        sx={{ cursor: "pointer" }}
      >
        <Tooltip title="Shuffle">
          <Button
            variant="contained"
            color="info"
            sx={{ height: 45 }}
            onClick={() => {
              if (playlist?.tracks?.total > 100) {
                toast.error(
                  "That playlist is waaay bigger than we expected.. 🥵🥵😳"
                );
              } else if (playlist?.owner?.id === "spotify") {
                toast.error("You don't own that playlist, sorry :(");
              } else {
                setConfirmShuffleModal(true);
              }
            }}
            disabled={progress.isShuffling ? true : false}
          >
            <ShuffleIcon sx={{ fontSize: 20 }} />
          </Button>
        </Tooltip>

        <Box display={"flex"} alignItems={"center"} gap={2}>
          {playlist?.images ? (
            <img src={playlist?.images[0]?.url} width={45} height={45} alt="" />
          ) : null}
          <div className="d-flex flex-column">
            <h6>{playlist?.name}</h6>
            {/* {playlist?.description ? (
            <h6 className="text-secondary" style={{ fontSize: 10 }}>
              {playlist?.description}
            </h6>
          ) : null} */}
            <h6 className="text-secondary" style={{ fontSize: 14 }}>
              {playlist?.tracks?.total} tracks
            </h6>
          </div>
        </Box>

        <ConfirmDialogModal
          isModalOpen={confirmShuffleModal}
          setIsModalOpen={setConfirmShuffleModal}
          question={"The playlist will be shuffled"}
          action={() => shuffle(playlist?.id, playlist?.name)}
          icon={<ShuffleIcon color="dark.main" sx={{ fontSize: 90 }} />}
        />
      </Box>
      {progress.isShuffling && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 4 }}>
          <Box sx={{ width: "100%" }}>
            <progress value={progress.progress} max={100} />
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary">{`${Math.round(
              progress.progress
            )}%`}</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Playlist;
