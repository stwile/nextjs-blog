export class UnsafeMdxError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnsafeMdxError';
  }
}
