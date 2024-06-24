//types.ts

export interface Patient {
  resourceType: string;
  id?: string;
  name: {
    given: string[];
    family: string;
  }[];
  identifier: {
    system: string;
    value: string;
  }[];
}
