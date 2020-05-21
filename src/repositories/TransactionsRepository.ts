import Transaction from '../models/Transaction';

export type transactionType = 'income' | 'outcome';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDAO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // eslint-disable-next-line class-methods-use-this
  public getBalance(): Balance {
    let incomeTotal = 0;
    let outcomeTotal = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.value;
      } else {
        outcomeTotal += transaction.value;
      }
    });

    const balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDAO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
