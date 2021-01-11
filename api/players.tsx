import { db } from "../config/firebase";

export type PlayerBase = {
  id: string;
  firstName: string;
  lastName: string;
  clubId: string;
  clubName?: string;
};

export type PlayerUpdate = {
  imageUrl?: string;
  position?: string;
  strongLeg?: string;
  aboutMe?: string;
  career?: string[];
};

export type Player = PlayerBase & PlayerUpdate;

export const CLUB_LOOKUP = {
  "1": {
    name: "Hamburg Hurricanes",
  },
  "2": {
    name: "SC Eilbek",
  },
  "3": {
    name: "Condor 2",
  },
  "4": {
    name: "Polonia Hamburg",
  },
  "5": {
    name: "HSV 5",
  },
};

const _allPlayers: Player[] = [
  {
    id: "uNhTFngbbpvUwigAq81f",
    firstName: "Berkeley",
    lastName: "Gabits",
    imageUrl: "http://dummyimage.com/209x214.bmp/cc0000/ffffff",
    clubId: "1",
  },
  {
    id: "2",
    firstName: "Gavrielle",
    lastName: "McRamsey",
    imageUrl: "http://dummyimage.com/197x239.bmp/dddddd/000000",
    clubId: "2",
  },
  {
    id: "3",
    firstName: "Salvatore",
    lastName: "Altamirano",
    imageUrl: "http://dummyimage.com/248x157.bmp/ff4444/ffffff",
    clubId: "3",
  },
  {
    id: "4",
    firstName: "Dael",
    lastName: "Gianasi",
    imageUrl: "http://dummyimage.com/190x209.bmp/cc0000/ffffff",
    clubId: "1",
  },
  {
    id: "5",
    firstName: "Maddy",
    lastName: "Jakovijevic",
    imageUrl: "http://dummyimage.com/125x218.png/5fa2dd/ffffff",
    clubId: "4",
  },
  {
    id: "6",
    firstName: "Eleonora",
    lastName: "Mossdale",
    imageUrl: "http://dummyimage.com/188x214.bmp/5fa2dd/ffffff",
    clubId: "1",
  },
  {
    id: "7",
    firstName: "Waylin",
    lastName: "Dusting",
    imageUrl: "http://dummyimage.com/219x154.bmp/dddddd/000000",
    clubId: "5",
  },
  {
    id: "8",
    firstName: "Alene",
    lastName: "Fazzioli",
    imageUrl: "http://dummyimage.com/196x103.png/cc0000/ffffff",
    clubId: "5",
  },
  {
    id: "9",
    firstName: "Livvyy",
    lastName: "Llewhellin",
    imageUrl: "http://dummyimage.com/116x249.bmp/dddddd/000000",
    clubId: "5",
  },
  {
    id: "10",
    firstName: "Gasper",
    lastName: "Filyashin",
    imageUrl: "http://dummyimage.com/237x103.png/ff4444/ffffff",
    clubId: "1",
  },
];

export const allPlayers: Player[] = _allPlayers.map((player) => {
  return {
    ...player,
    clubName: CLUB_LOOKUP[player.clubId].name,
  };
});

type SearchData = {
  searchTerm: string;
};

export const searchPlayers = async ({ searchTerm }: SearchData) => {
  return allPlayers.filter((value) => {
    if (!searchTerm || searchTerm == "") {
      return true;
    }
    const insensitiveTerm = searchTerm.toLowerCase();
    return (
      value.clubName.toLowerCase().includes(insensitiveTerm) ||
      value.firstName.toLowerCase().includes(insensitiveTerm) ||
      value.lastName.toLowerCase().includes(insensitiveTerm)
    );
  });
};

export const createPlayer = async (player: PlayerBase) => {
  return db
    .collection("players")
    .doc()
    .set(player)
    .then(() => {
      return player;
    })
    .catch((error) => {
      return { error };
    });
};

export const updatePlayer = async (
  playerId: string,
  updateData: PlayerUpdate
) => {
  return db
    .collection("players")
    .doc(playerId)
    .update(updateData)
    .catch((error) => {
      return { error };
    });
};

export const getPlayerById = async (id: string) => {
  const inMemoryPlayer = await getPlayer(id);
  const dbPlayer = await db
    .collection("players")
    .doc(id)
    .get()
    .then((playerData) => {
      if (playerData.data()) {
        return { ...playerData.data() };
      }
    });
  const combined = Object.assign({}, inMemoryPlayer, dbPlayer);
  console.info("combined: ", combined);
  return combined;
};

export const getPlayer = async (id: string) => {
  const player = allPlayers.find((value) => value.id == id);
  player.clubName = CLUB_LOOKUP[player.clubId].name;
  return player;
};

export const getAllPlayerIds = async () => {
  return allPlayers.map((player) => player.id);
};
