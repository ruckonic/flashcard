export interface ResponseData<T extends { [key: string]: any }> {
  data: T
  message: string
}
