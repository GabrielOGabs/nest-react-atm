import { TransactionType } from "src/common/constants";

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
};
