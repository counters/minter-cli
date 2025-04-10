type MinterType = {
  urlapi: string;
  timeout: number;
  http_headers: Map<string, string> | null;
  grpc: boolean;
  grpc_hostname: string;
  grpc_port: number;
  grpc_deadline: number;
};

export default MinterType;
