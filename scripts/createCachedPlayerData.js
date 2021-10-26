const fs = require("fs");
const path = require("path");

const fetch = require("sync-fetch");

function writeJson(fname, data) {
  const dirpath = "static_data"; // FIXME: relative to project root (?)
  console.log(`Writing static data to ${path.resolve(dirpath)}/${fname}`);

  fs.mkdirSync(dirpath, { recursive: true });
  fs.writeFileSync(`${dirpath}/${fname}`, JSON.stringify(data, null, 2));
}

(function () {
  console.log("Fetching player data...");
  const playersRes = fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/players?_limit=-1`
  );
  if (!playersRes.ok) {
    console.log(playersRes);
    throw Error(playersRes.statusText);
  }
  const players = [];
  const playersMap = {};
  const rawPlayers = playersRes.json();
  for (const p of rawPlayers) {
    const preparedPlayer = {
      id: p.id,
      name: p.name,
      teamName: p.team ? p.team.name : null,
      appearances: p.appearances,
      goals: p.goals,
      minutesPlayed: p.minutesPlayed,
      image: p.image,
      slug: p.slug,
      charity: p.charity,
    };

    players.push(preparedPlayer);
    playersMap[preparedPlayer.id] = preparedPlayer;
  }
  writeJson("searchIndex.json", { players });
  writeJson("playersById.json", playersMap);

  console.log(`Player data written for ${players.length} players.`);
})();
