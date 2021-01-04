import { useState } from "react";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import Layout from "../../components/layout";
import { createDonation } from "../../api/donations";
import CustomButton from "../../components/primaryButton";
import PlayerName from "../../components/playerName";

const AddDonationPage = () => {
  const router = useRouter();
  const auth = useAuth();
  const playerId = router.query.donateFor as string;

  const [amount, setAmount] = useState(1);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    return await createDonation({
      donorId: auth.user.uid,
      amountPerGoal: amount,
      playerId: playerId,
    }).then((response: any) => {
      if (response.error) {
        setError(response.error);
      } else {
        Router.push("/dashboard");
      }
    });
  };
  return (
    <Layout>
      <div className="shadow-lg bg-white my-8 mx-4 py-8 px-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <PlayerName playerId={playerId} />
          </div>
          <div>
            <label>Money per goal: </label>
            <input
              className="lg:mx-4 w-full lg:w-1/2"
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
        <CustomButton label="Save" type="primary" handleClick={handleSubmit} />
        {error?.message && (
          <div className="pt-4 text-red-400">
            <span>{error.message}</span>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default AddDonationPage;
