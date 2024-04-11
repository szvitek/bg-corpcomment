import { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { TFeedbackItem } from '../lib/types';
import API from '../lib/api';

type FeedbackProviderProps = {
  children: ReactNode;
};

type TFeedbackContext = {
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

export const FeedbackContext = createContext<TFeedbackContext | null>(null);

export default function FeedbackProvider({ children }: FeedbackProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedComapny, setSelectedComapny] = useState('');

  const companyList = useMemo(
    () =>
      feedbackItems
        .map((item) => item.company)
        // remove duplicates
        .filter((company, index, array) => {
          return array.indexOf(company) === index;
        }),
    [feedbackItems]
  );
  const filteredFeedbackItems = useMemo(
    () =>
      selectedComapny
        ? feedbackItems.filter(
            (feedbackItem) => feedbackItem.company === selectedComapny
          )
        : feedbackItems,
    [feedbackItems, selectedComapny]
  );

  const handleAddToList = async (text: string) => {
    const company = text
      .split(' ')
      .find((word) => word.startsWith('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: company!.substring(0, 1).toUpperCase(),
      company: company,
      text,
      daysAgo: 0,
    };

    setFeedbackItems([...feedbackItems, newItem]);

    await fetch('http://localhost:3000/api/feedbacks', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };
  const handleSelectCompany = (company: string) => {
    setSelectedComapny((prev) => {
      return prev === company ? '' : company;
    });
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await API.get('/api/feedbacks');

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems(data);
      } catch (error) {
        setErrorMessage('Something went wrong. Please try again later.');
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackContext.Provider
      value={{
        filteredFeedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}
