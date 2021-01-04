import Router from "next/router";
import Layout from "../../components/layout";

import { getPlayer, getAllPlayerIds, Player } from "../../api/players";
import CustomButton from "../../components/primaryButton";

type PlayerProfileProps = {
  player: Player;
};

export default function PlayersProfilPage({ player }: PlayerProfileProps) {
  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <div className="grid grid-cols-2 items-center justify-center">
          <div className="col-span-2 md:col-span-1 relative h-64 w-full md:w-64">
            <img
              src={player.imageUrl}
              alt="placeholder"
              className="w-full h-full rounded-full block"
            ></img>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col">
            <div className="p-2">
              <label className="text-xs">Name</label>
              <div>{`${player.firstName} ${player.lastName}`}</div>
            </div>
            <div className="p-2">
              <label className="text-xs">Team</label>
              <div>{`${player.clubName}`}</div>
            </div>
            <div className="p-2">
              <label className="text-xs">Position</label>
              <div>Sixer</div>
            </div>
            <div className="p-2">
              <label className="text-xs">Strong leg</label>
              <div>right</div>
            </div>
          </div>
        </div>
        <div className="my-8">
          <h2 className="my-4">About me</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            ac nunc felis. Vestibulum ullamcorper nec sapien nec fringilla.
            Phasellus placerat tellus nec tellus scelerisque congue. Curabitur
            sit amet sem congue, ornare odio eu, tristique nisi. Duis lectus
            quam, lobortis et metus a, interdum imperdiet orci. Orci varius
            natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Nam ac est convallis, ultricies odio id, porttitor
            justo. Aliquam iaculis nulla quis volutpat consequat. Suspendisse
            bibendum, dui nec viverra blandit, nisi augue sodales ex, sit amet
            blandit tortor lacus posuere eros. Duis ullamcorper pulvinar
            malesuada. Etiam auctor semper tellus vitae rhoncus. Nulla facilisi.
            In nisl lacus, sollicitudin id arcu id, ullamcorper mattis metus.
          </p>
        </div>
        <div className="my-8">
          <h2 className="my-4">My stats</h2>
          <p>coming soon...</p>
        </div>
        <div className="my-8">
          <CustomButton
            label="Donate"
            type="primary"
            handleClick={() =>
              Router.push({
                pathname: "/donation/add",
                query: {
                  donateFor: player.id.toString(),
                },
              })
            }
          />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const player = await getPlayer(params.id);
  return {
    props: {
      player,
    },
  };
}

export async function getStaticPaths() {
  const paths = (await getAllPlayerIds()).map((id) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
