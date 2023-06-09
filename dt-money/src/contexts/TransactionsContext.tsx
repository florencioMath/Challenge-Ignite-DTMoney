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
import { toast } from 'sonner';

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
  totalPages: number;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;
  actualPage: number;
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
  const [totalPages, setTotalPages] = useState(1);
  const [actualPage, setActualPage] = useState(1);
  const transactionsPerPage = 10;

  const fetchTransactions = useCallback(async () => {
    try {
      const transactionsSnapshot = await getDocs(query(
        transactionsCollection,
        orderBy('createdAt', 'desc'),
        limit(transactionsPerPage)
      ));

      const transactionsList = transactionsSnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
      );

      setTransactions(transactionsList);
    } catch (error) {
      console.log('Erro ao carregar as transações', error);
    }
  }, []);

  const fetchAllTransactions = useCallback(async () => {
    try {
      const transactionsSnapshot = await getDocs(query(transactionsCollection,
        orderBy('createdAt', 'desc'),));

      const transactionsList = transactionsSnapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id } as Transaction)
      );

      setTotalPages(Math.ceil(transactionsList.length / transactionsPerPage));
    } catch (error) {
      console.log('Erro ao carregar todas as transações', error);
    }
  }, []);

  const nextTransactions = useCallback(async () => {
    try {
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
    } catch {
      toast.error('Erro ao carregar as próximas transações');
    }

  }, [transactions]);

  const previousTransactions = useCallback(async () => {
    try {
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
    } catch {
      toast.error('Erro ao carregar as transações anteriores');
    }
  }, [transactions]);

  const searchTransactions = useCallback(async (toSearch: string) => {
    try {
      const transactionsSnapshot = await getDocs(query(transactionsCollection,
        orderBy('createdAt', 'desc'),));

      const transactionsListFiltered = transactionsSnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id } as Transaction))
        .filter((transaction) =>
          transaction.description.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .includes(toSearch.toString().toLocaleLowerCase())
        );

      setTransactions(transactionsListFiltered);
    } catch {
      toast.error('Erro ao buscar as transações');
    }
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

      try {
        await addDoc(transactionsCollection, transaction);
        fetchTransactions();
        fetchAllTransactions()
        setActualPage(1);
        toast.success('Transação criada com sucesso');
      } catch {
        toast.error('Erro ao criar transação');
      }
    },
    []
  );

  const updateTransaction = useCallback(async (id: string, data: any) => {
    const transactionRef = doc(transactionsCollection, id);

    try {
      await updateDoc(transactionRef, data);
      fetchTransactions();
      toast.success('Transação atualizada com sucesso');
    } catch {
      toast.error('Erro ao atualizar transação');
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    const transactionToDelete = doc(transactionsCollection, id);

    try {
      await deleteDoc(transactionToDelete);
      fetchTransactions();
      fetchAllTransactions()
      setActualPage(1);
      toast.success('Transação deletada com sucesso');
    } catch {
      toast.error('Erro ao deletar transação');
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
    fetchAllTransactions()
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
        totalPages,
        setActualPage,
        actualPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
