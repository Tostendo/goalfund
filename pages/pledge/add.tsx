import { useState } from "react";
import moment from "moment";
import Router, { useRouter } from "next/router";
import { useAuth } from "../../hooks/useAuth";
import Layout from "../../components/layout";
import { createDonation } from "../../api/donations";
import CustomButton from "../../components/customButton";
import PlayerName from "../../components/playerName";

const AddPledgePage = () => {
  const router = useRouter();
  const auth = useAuth();
  const playerId = router.query.pledgeFor as string;

  const [amount, setAmount] = useState(1);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    return createDonation({
      donorId: auth?.user?.uid,
      amountPerGoal: amount,
      playerId: playerId,
      created: moment.utc().toISOString(),
      deleted: null,
      donorName: isAnonymous ? null : auth?.user?.username,
      message: message,
    }).then((response: any) => {
      if (response.error) {
        setError(response.error);
      } else {
        Router.push("/dashboard?profile_tab=pledges");
      }
    });
  };
  return (
    <Layout>
      <div className="shadow-lg max-w-3xl mx-auto bg-white my-8 py-8 px-4 text-center">
        <form onSubmit={handleSubmit}>
          <div className="font-bold mb-4 text-xl">You pledge for: </div>
          <div className="mb-4">
            <PlayerName playerId={playerId} withCharity />
          </div>
          <div className="w-full">
            <div className="w-full text-left">Pledge per goal:</div>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center ">
                <span className="text-primary font-bold">€</span>
              </div>
              <input
                type="number"
                step="1"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                name="price"
                id="price"
                className="w-full block pl-7 pr-12 border-gray-300 rounded-md font-bold"
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="flex flex-col my-4">
            <label className="text-left">
              Message to the player (optional):{" "}
            </label>
            <textarea
              rows={5}
              value={message}
              className="w-full p-2 rounded-lg m-0 border text-primary border-gray-200 bg-white outline-none focus:border-gray-300"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </div>
          <label className="flex items-center my-4">
            <input
              type="checkbox"
              className="m-0 p-0 h-4 w-4 text-green-600"
              checked={isAnonymous}
              onChange={() => setIsAnonymous(!isAnonymous)}
            />
            <span className="ml-2">
              I want to stay anonymous to the player.
            </span>
          </label>
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
export default AddPledgePage;
