import { IRole } from 'src/app/app.interface';

export const roles: IRole[] = [
  {
    roleId: 1,
    roleName: 'Admin',
    isActive: true,
    description: 'Admin for the Cmpany',
  },
  {
    roleId: 2,
    roleName: 'HR',
    isActive: true,
    description: 'HR for the Company',
  },
  {
    roleId: 3,
    roleName: 'CEO',
    isActive: true,
    description: 'CEO for the Company',
  },
];
