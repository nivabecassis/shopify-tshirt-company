interface ApiError extends Error {
  statusCode: number;
}

export default ApiError;
