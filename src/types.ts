export type RCProps<T = Record<string, unknown>> = T &
  Partial<{
    children: React.ReactNode;
    className: string;
  }>;

export type Species = 'cats' | 'dogs';

export type Pet = {
  id: string;
  name: string;
  breed: string;
};

export type PetsMap = Map<Pet['id'], Pet | undefined>;
