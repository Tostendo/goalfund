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
            <label>Donation per goal: </label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                <span className="text-primary">€</span>
              </div>
              <input
                type="number"
                step="0.25"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                name="price"
                id="price"
                className="w-full lg:w-1/3 focus:ring-indigo-500 focus:border-indigo-500 block pl-7 pr-12 border-gray-300 rounded-md"
                placeholder="0,00"
              />
            </div>
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
