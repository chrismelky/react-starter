export class Role {
  public id?: number | null;
  public name?: string;
}

export const roleDefaultValue: Readonly<Role> = {
  id: null,
  name: '',
};
