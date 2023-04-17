import { ReactNode } from 'react';

export type WithChildrenProps<T = undefined> = T extends undefined
  ? {
      children?: ReactNode;
    }
  : T & {
      children?: ReactNode;
    };

export type WithChildrenAndRolesProps<T = undefined> = T extends undefined
?{
  children?: ReactNode;
  roles?:Roles[];
}:T&{
  children?: ReactNode;
  roles?:Roles[];
}

enum Roles{
  ADMIN = 1,
  SEQURITY = 2,
  USER = 3,
  STUDENT = 4,
}