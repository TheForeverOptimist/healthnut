//types.ts

export interface Patient {
  resourceType: string;
  name: {
    given: string[];
    family: string;
  }[];
  identifier: {
    system: string;
    value: string;
  }[];
  id?: string;
}
