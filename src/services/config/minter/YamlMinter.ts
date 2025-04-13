import MinterType from './MinterType';

function YamlMinter(obj: Record<string, any>): MinterType {
  return {
    urlapi: obj.urlapi || 'http://127.0.0.1:8843/v2',
    timeout: obj.timeout || 60,
    http_headers: obj.http_headers || null,
    grpc: obj.grpc === true,
    grpc_hostname: obj.grpc_hostname || '127.0.0.1',
    grpc_port: obj.grpc_port || 8842,
    grpc_deadline: obj.grpc_deadline || 30000,
  };
}
export default YamlMinter;
