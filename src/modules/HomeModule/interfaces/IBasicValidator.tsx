export interface IBasicValidator {
  [key: string]: (value: string) => boolean | string;
}
