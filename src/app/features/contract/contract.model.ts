export type ContractStatus = 'active' | 'pending' | 'canceled';

export interface Contract {
  id: number;
  holderName: string;
  companyName: string;
  plan: 'Essential' | 'Pro' | 'Zen';
  startDate: string;   // ISO string
  status: ContractStatus;
  monthlyPrice: number; // €
}