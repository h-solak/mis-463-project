import React from "react";
import Layout from "../../layout/Layout";
import useUser from "../../contexts/user/useUser";
import Playlist from "../Shuffle/Playlist";

const Shuffle = () => {
  const { user } = useUser();

  return (
    <Layout>
      <main>
        <h4 className="px-4 pt-4 pb-1">Shuffle</h4>
        <p className="px-4 text-secondary" style={{ fontSize: 14 }}>
          Playlist should contain less than 100 songs for it to be shuffled
          correctly!
        </p>
        <div className="w-100 w-md-50 px-4 d-flex flex-column align-items-start mt-4">
          {user?.playlists?.items.map((playlist, index) => (
            <Playlist playlist={playlist} key={index} />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Shuffle;
