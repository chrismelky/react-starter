export class FacilityType {
  public id?: number | null;
  public name?: string;
  public code?: string;
}

export const facilityTypeDefaultValue: Readonly<FacilityType> = {
  id: null,
  name: '',
  code: '',
};
