export default interface ISearchDebtsDTO {
  page: number;
  per_page?: number;
  client_id?: number;
  value_min?: number;
  value_max?: number;
  date?: string;
  reason?: string;
}
