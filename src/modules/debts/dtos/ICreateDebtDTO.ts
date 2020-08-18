export default interface ICreateDebtDTO {
  reason: string;
  value: number;
  date: Date;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}
