export type Donation = {
  id?: string;
  created: string;
  deleted: string | null;
  donorId: string;
  donorName?: string;
  amountPerGoal: number;
  playerId: string;
  message?: string;
  goalsStart?: number;
  goalsEnd?: number;
  openAmount?: number;
};
