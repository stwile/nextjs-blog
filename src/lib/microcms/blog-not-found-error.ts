export class BlogNotFoundError extends Error {
  constructor(id: string, options?: ErrorOptions) {
    super(`Blog content was not found: ${id}`, options);
    this.name = 'BlogNotFoundError';
  }
}
