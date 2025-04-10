import { Module } from '@nestjs/common';
import { ApiCommand } from './commands/api/ApiCommand';
import {VersionCommand} from "./commands/VersionCommand";

@Module({
  // imports: [ConfigModule.forRoot()],
  imports: [],
  controllers: [],
  providers: [
      // ApiCommand,
      VersionCommand,
    ...ApiCommand.registerWithSubCommands(),
    // AppService,
  ],
})
export class AppModule {}
