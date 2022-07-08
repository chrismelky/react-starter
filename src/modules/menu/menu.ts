export class Menu {
  public id?: number | null;
  public label?: string;
  public icon?: string;
  public separator?: string;
  public routerLink?: string;
  public parentId?: number | null;
}

export const menuDefaultValue: Readonly<Menu> = {
  id: null,
  label: '',
  icon: '',
  separator: '',
  routerLink: '',
  parentId: null,
};
