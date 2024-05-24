import { TransactionType } from "@/common/constants";

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: TransactionType;
  transactionDate: Date;
};
