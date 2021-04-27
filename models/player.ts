export type Player = {
  id: string;
  name: string;
  profileUrl: string;
  image?: any[];
  position?: string;
  strongLeg?: string;
  description?: string;
  career?: string;
  team?: any;
  charity?: any;
  stats?: any;
  goals?: number;
  minutesPlayed?: number;
  appearances?: number;
  money?: number;
};

export type PlayerUpdate = {
  image?: any;
  position?: string;
  strongLeg?: string;
  description?: string;
  career?: string;
  charity?: any;
};

export type PlayerSearchData = {
  searchTerm?: string;
  sortBy?: string;
  limit?: number;
};
