import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type DurationContextType = {
  activeDuration: number;
  setActiveDuration: Dispatch<SetStateAction<number>>;
  activeDurationTitle: string;
  setActiveDurationTitle: Dispatch<SetStateAction<string>>;
};

const DurationContext = createContext<DurationContextType | undefined>(
  undefined,
);

export const useDurationContext = () => {
  const context = useContext(DurationContext);
  if (context === undefined) {
    throw new Error(
      'useDurationContext must be used within a DurationProvider',
    );
  }
  return context;
};

export const DurationProvider = ({ children }: { children: ReactNode }) => {
  const [activeDuration, setActiveDuration] = useState<number>(1);
  const [activeDurationTitle, setActiveDurationTitle] =
    useState<string>('7 Hari Terakhir');

  return (
    <DurationContext.Provider
      value={{
        activeDuration,
        setActiveDuration,
        activeDurationTitle,
        setActiveDurationTitle,
      }}>
      {children}
    </DurationContext.Provider>
  );
};
