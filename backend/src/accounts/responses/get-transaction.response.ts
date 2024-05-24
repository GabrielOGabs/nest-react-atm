import { TransactionType } from "@/common/constants";

export type GetTransactionResponse = {
  id: string;
  amount: number;
  type: TransactionType;
  transactionDate: Date;
};
