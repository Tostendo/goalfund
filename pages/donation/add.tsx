import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getPlayer } from "../../api/players";

const AddDonationPage = () => {
  const router = useRouter();
  const playerId = router.query.donateFor as string;

  const [player, setPlayer] = useState(null);
  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const asyncFetchPlayer = async (id: string) => {
      if (id) {
        const player = await getPlayer(parseInt(id));
        setPlayer(player);
      }
    };
    asyncFetchPlayer(playerId);
  }, [playerId]);
  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <form>
          {player && (
            <div className="mb-4">
              <div className="text-xs">{`Donate per goal for`}</div>
              <div>{`${player.firstName} ${player.lastName}`}</div>
            </div>
          )}
          <div>
            <label>Money per goal</label>
            <input
              className="w-full"
              type="number"
              step="0.50"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            ></input>
          </div>
          {error?.message && (
            <div className="pt-4 text-red-400">
              <span>{error.message}</span>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};
export default AddDonationPage;
