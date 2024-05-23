import { TransactionType } from "src/common/constants";

export type AddTransactionServicePayload = {
  accountId: string;
  amount: number;
  type: TransactionType;
};

export type WithdrawServicePayload = Omit<AddTransactionServicePayload, "type">;

export type DepositServicePayload = Omit<AddTransactionServicePayload, "type">;
