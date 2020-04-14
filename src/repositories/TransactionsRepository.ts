import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeArray = this.transactions
      .filter(transaction => transaction.type !== 'outcome')
      .map(transaction => transaction.value);

    const income =
      incomeArray.length < 1
        ? 0
        : incomeArray.reduce((sum, transaction) => sum + transaction);

    const outcomeArray = this.transactions
      .filter(transaction => transaction.type !== 'income')
      .map(transaction => transaction.value);

    const outcome =
      outcomeArray.length < 1
        ? 0
        : outcomeArray.reduce((sum, transaction) => sum + transaction);

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
