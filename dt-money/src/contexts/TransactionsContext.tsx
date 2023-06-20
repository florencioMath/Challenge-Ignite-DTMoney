import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { transactionsCollection } from '../lib/firebase';
import {
  getDocs,
  addDoc,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
  limit,
  startAfter,
  endBefore,
  limitToLast,
} from '@firebase/firestore';

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
  nextTransactions: () => Promise<void>;
  previousTransactions: () => Promise<void>;
  searchTransactions: (query: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  updateTransaction: (id: string, data: EditTransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  transactionsPerPage: number;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

type EditTransactionInput = {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
};

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsPerPage = 10;

  const queryFilteredTransactions = query(
    transactionsCollection,
    orderBy('createdAt', 'desc'),
    limit(transactionsPerPage)
  );

  const fetchTransactions = useCallback(async () => {
    const transactionsSnapshot = await getDocs(queryFilteredTransactions);

    const transactionsList = transactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );

    setTransactions(transactionsList);
  }, []);

  const nextTransactions = useCallback(async () => {
    const queryFilteredNextTransactions = query(
      transactionsCollection,
      orderBy('createdAt', 'desc'),
      startAfter(transactions[transactions.length - 1].createdAt),
      limit(transactionsPerPage)
    );

    const nextTransactionsSnapshot = await getDocs(
      queryFilteredNextTransactions
    );

    const transactionsList = nextTransactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );

    setTransactions(transactionsList);
  }, [transactions]);

  const previousTransactions = useCallback(async () => {
    const queryFilteredNextTransactions = query(
      transactionsCollection,
      orderBy('createdAt', 'desc'),
      endBefore(transactions[0].createdAt),
      limitToLast(transactionsPerPage)
    );

    const previousTransactionsSnapshot = await getDocs(
      queryFilteredNextTransactions
    );

    const transactionsList = previousTransactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );

    setTransactions(transactionsList);
  }, [transactions]);

  const queryFilteredForSearchTransactions = query(
    transactionsCollection,
    orderBy('createdAt', 'desc')
  );

  const searchTransactions = useCallback(async (query: string) => {
    const transactionsSnapshot = await getDocs(
      queryFilteredForSearchTransactions
    );

    const transactionsListFiltered = transactionsSnapshot.docs
      .map((doc) => ({ ...doc.data(), id: doc.id } as Transaction))
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
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(),
      };

      await addDoc(transactionsCollection, transaction);

      fetchTransactions();
    },
    []
  );

  const updateTransaction = useCallback(async (id: string, data: any) => {
    const transactionRef = doc(transactionsCollection, id);
    await updateDoc(transactionRef, data);
    fetchTransactions();
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    const transactionToDelete = doc(transactionsCollection, id);
    await deleteDoc(transactionToDelete);
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        nextTransactions,
        previousTransactions,
        createTransaction,
        searchTransactions,
        updateTransaction,
        deleteTransaction,
        transactionsPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
