export interface ValidationErrorToMessage {
  [key: string]: (field: string, value?: any) => string;
}
