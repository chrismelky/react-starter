export class User {
  public id?: any;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public roles?: any[];
  public isActive?: boolean;
}

export const userDefaultValue: Readonly<User> = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  roles: [],
  isActive: true,
};
