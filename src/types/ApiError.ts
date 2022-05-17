class ApiError extends Error {
  private status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  getStatus = () => this.status;
}

export default ApiError;
