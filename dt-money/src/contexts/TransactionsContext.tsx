import { ReactNode, useCallback, useEffect, useState } from 'react';
import { createContext } from 'use-context-selector';
import { dbTransactions } from '../lib/firebase';
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
  const [nextTransaction, setNextTransaction] = useState({});
  const [moreTransactionToShow, setMoreTransactionToShow] = useState(false);
  const transactiosPerPage = 3;

  const queryFilteredTransactions = query(
    dbTransactions,
    orderBy('createdAt', 'desc'),
    limit(transactiosPerPage)
  );

  const fetchTransactions = useCallback(async () => {
    const transactionsSnapshot = await getDocs(queryFilteredTransactions);

    const transactionsList = transactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );
    setNextTransaction(
      transactionsSnapshot.docs[transactionsSnapshot.docs.length - 1]
    );

    setTransactions(transactionsList);
  }, []);

  const nextTransactions = useCallback(async () => {
    const queryFilteredNextTransactions = query(
      dbTransactions,
      orderBy('createdAt', 'desc'),
      startAfter(nextTransaction),
      limit(transactiosPerPage)
    );

    const nextTransactionsSnapshot = await getDocs(
      queryFilteredNextTransactions
    );

    const transactionsList = nextTransactionsSnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
    );

    setNextTransaction(
      nextTransactionsSnapshot.docs[nextTransactionsSnapshot.docs.length - 1]
    );

    setTransactions(transactionsList);

    if (transactionsList.length < transactiosPerPage) {
      setMoreTransactionToShow(!moreTransactionToShow);
    }
  }, [nextTransaction]);

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

      await addDoc(dbTransactions, transaction);

      fetchTransactions();
    },
    []
  );

  const updateTransaction = useCallback(async (id: string, data: any) => {
    const transactionRef = doc(dbTransactions, id);
    await updateDoc(transactionRef, data);
    fetchTransactions();
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    const transactionToDelete = doc(dbTransactions, id);
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
