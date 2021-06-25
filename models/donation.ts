export type Donation = {
  id?: string;
  created: string;
  deleted: string | null;
  donorId: string;
  amountPerGoal: number;
  playerId: string;
  goalsStart?: number;
  goalsEnd?: number;
  openAmount?: number;
};
