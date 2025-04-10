import MinterType from '../config/minter/MinterType';
import MinterApi, { GrpcOptions, HttpOptions } from 'minter-typescript-sdk';

export class GetMinterApi {
  protected getMinterApi(config: MinterType) {
    const httpOptions: HttpOptions = {
      raw: config.urlapi + '/',
      timeout: config.timeout,
      headers: null,
    };

    const grpcOptions: GrpcOptions | null = config.grpc
      ? {
          hostname: config.grpc_hostname,
          port: config.grpc_port,
          deadline: config.grpc_deadline,
          useTransportSecurity: false,
        }
      : null;

    return new MinterApi(grpcOptions, httpOptions);
  }
}
