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
  filterTransactions: (query: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
  updateTransaction: (id: string, data: EditTransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  moreTransactionToShow: boolean;
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
  const [moreTransactionToShow, setMoreTransactionToShow] = useState(false);
  const transactiosPerPage = 3;

  const queryFilteredTransactions = query(
    transactionsCollection,
    orderBy('createdAt', 'desc'),
    limit(transactiosPerPage)
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
      startAfter(transactions[transactions.length - 1]!.createdAt),
      limit(transactiosPerPage)
    );

    const nextTransactionsSnapshot = await getDocs(
      queryFilteredNextTransactions
    );

    const transactionsList = nextTransactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );

    setTransactions(transactionsList);

    if (transactionsList.length < transactiosPerPage) {
      setMoreTransactionToShow(!moreTransactionToShow);
    }
  }, [transactions]);

  const previousTransactions = useCallback(async () => {
    const queryFilteredNextTransactions = query(
      transactionsCollection,
      orderBy('createdAt', 'desc'),
      endBefore(transactions[0]!.createdAt),
      limitToLast(transactiosPerPage)
    );

    const previousTransactionsSnapshot = await getDocs(
      queryFilteredNextTransactions
    );

    const transactionsList = previousTransactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );

    setTransactions(transactionsList);
  }, [transactions]);

  const filterTransactions = useCallback(async (query: string) => {
    const transactionsSnapshot = await getDocs(queryFilteredTransactions);
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
    // nextTransactions();
  }, [fetchTransactions]);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        nextTransactions,
        previousTransactions,
        createTransaction,
        filterTransactions,
        updateTransaction,
        deleteTransaction,
        moreTransactionToShow,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
