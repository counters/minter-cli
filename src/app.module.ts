import { Module } from '@nestjs/common';
import { MinterApiService } from './services/minter-api/minter-api.service';
import { ApiCommand } from "./commands/api/ApiCommand";

@Module({
  imports: [],
  controllers: [],
  providers: [
      MinterApiService,
      ...ApiCommand.registerWithSubCommands()
  ],
})
export class AppModule {}
