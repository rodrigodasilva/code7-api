export default interface ICreateDebtDTO {
  reason: string;
  value: number;
  date: Date;
  client_id: number;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
}
