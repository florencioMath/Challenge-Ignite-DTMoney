import { ReactNode, useCallback, useEffect, useState } from 'react';
import { api } from '../lib/axios';
import { createContext } from 'use-context-selector';
import { dbTransactions } from '../lib/firebase';
import { getDocs, addDoc } from '@firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

interface Transaction {
  id: string;
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: () => Promise<void>;
  filterTransactions: (query: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = useCallback(async (query?: string) => {
    const transactionsSnapshot = await getDocs(dbTransactions);
    const transactionsList = transactionsSnapshot.docs.map(
      (doc) => doc.data() as Transaction
    );

    return setTransactions(transactionsList);
  }, []);

  const filterTransactions = useCallback(async (query: string) => {
    const transactionsSnapshot = await getDocs(dbTransactions);

    const transactionsListFiltered = transactionsSnapshot.docs
      .map((doc) => doc.data() as Transaction)
      .filter((transaction) =>
        transaction.description
          .toLowerCase()
          .includes(query.toLocaleLowerCase())
      );

    setTransactions(transactionsListFiltered);
  }, []);

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data;

      const transaction = {
        id: uuidv4(),
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(),
      };

      await addDoc(dbTransactions, transaction);

      setTransactions((state) => [transaction, ...state]);
    },
    []
  );

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        filterTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
