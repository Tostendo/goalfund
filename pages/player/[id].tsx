import Layout from "../../components/layout";

import { PlayersProvider } from "../../hooks/usePlayers";

function PlayersProfil() {
  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <div className="flex flex-col items-center">
          <div className="relative h-48 w-48">
            <img
              src="https://picsum.photos/200"
              alt="placeholder"
              className="rounded-full block"
            ></img>
            <a className="absolute w-48 h-48 rounded-full flex justify-center items-center bg-black text-center top-0 opacity-0 hover:opacity-25"></a>
          </div>
          <h2>{`Welcome, Player`}</h2>
        </div>
      </div>
    </Layout>
  );
}

const PlayersProfilPage = () => {
  return (
    <PlayersProvider>
      <PlayersProfil />
    </PlayersProvider>
  );
};
export default PlayersProfilPage;
