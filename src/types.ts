export type RCProps<T = Record<string, unknown>> = T &
  Partial<{
    children: React.ReactNode;
    className: string;
  }>;

export type Species = 'cat' | 'dog';

export type Pet = {
  id: string;
  name: string;
  breed: string;
};
