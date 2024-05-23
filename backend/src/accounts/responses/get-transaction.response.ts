import { TransactionType } from "src/common/constants";

export type GetTransactionResponse = {
  id: string;
  amount: number;
  type: TransactionType;
  transactionDate: Date;
};
