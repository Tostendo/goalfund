export type Donation = {
  id?: string;
  created: string;
  paid?: string;
  deleted: string | null;
  donorId: string;
  amountPerGoal: number;
  playerId: string;
  goalsStart?: number;
  goalsEnd?: number;
};
