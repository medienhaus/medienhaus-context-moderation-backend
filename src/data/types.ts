export type Person = {
  mail: string;
  name: string;
};

export type LookUpEntry = {
  name: string;
  id: string;
  persons: Person[];
};
