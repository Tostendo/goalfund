export type Player = {
  firstName: string;
  lastName: string;
  imageUrl: string;
  email: string;
  id: string;
  clubName: string;
};

export const allPlayers: Player[] = [
  {
    id: "1",
    firstName: "Berkeley",
    lastName: "Gabits",
    email: "bgabits0@accuweather.com",
    imageUrl: "http://dummyimage.com/209x214.bmp/cc0000/ffffff",
    clubName: "Hamburg Hurricanes",
  },
  {
    id: "2",
    firstName: "Gavrielle",
    lastName: "McRamsey",
    email: "gmcramsey1@netscape.com",
    imageUrl: "http://dummyimage.com/197x239.bmp/dddddd/000000",
    clubName: "SC Eilbek",
  },
  {
    id: "3",
    firstName: "Salvatore",
    lastName: "Altamirano",
    email: "saltamirano2@dot.gov",
    imageUrl: "http://dummyimage.com/248x157.bmp/ff4444/ffffff",
    clubName: "Kakao Team",
  },
  {
    id: "4",
    firstName: "Dael",
    lastName: "Gianasi",
    email: "dgianasi3@hibu.com",
    imageUrl: "http://dummyimage.com/190x209.bmp/cc0000/ffffff",
    clubName: "Hamburg Hurricanes",
  },
  {
    id: "5",
    firstName: "Maddy",
    lastName: "Jakovijevic",
    email: "mjakovijevic4@reuters.com",
    imageUrl: "http://dummyimage.com/125x218.png/5fa2dd/ffffff",
    clubName: "Condor",
  },
  {
    id: "6",
    firstName: "Eleonora",
    lastName: "Mossdale",
    email: "emossdale5@netvibes.com",
    imageUrl: "http://dummyimage.com/188x214.bmp/5fa2dd/ffffff",
    clubName: "Hamburg Hurricanes",
  },
  {
    id: "7",
    firstName: "Waylin",
    lastName: "Dusting",
    email: "wdusting6@bbb.org",
    imageUrl: "http://dummyimage.com/219x154.bmp/dddddd/000000",
    clubName: "Polonia Hamburg",
  },
  {
    id: "8",
    firstName: "Alene",
    lastName: "Fazzioli",
    email: "afazzioli7@goo.gl",
    imageUrl: "http://dummyimage.com/196x103.png/cc0000/ffffff",
    clubName: "HSV 4",
  },
  {
    id: "9",
    firstName: "Livvyy",
    lastName: "Llewhellin",
    email: "lllewhellin8@phpbb.com",
    imageUrl: "http://dummyimage.com/116x249.bmp/dddddd/000000",
    clubName: "HSV 3",
  },
  {
    id: "10",
    firstName: "Gasper",
    lastName: "Filyashin",
    email: "gfilyashin9@hud.gov",
    imageUrl: "http://dummyimage.com/237x103.png/ff4444/ffffff",
    clubName: "Hamburg Hurricanes",
  },
];

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

export const getPlayer = async (id: string) => {
  return allPlayers.find((value) => value.id == id);
};

export const getAllPlayerIds = async () => {
  return allPlayers.map((player) => player.id);
};
