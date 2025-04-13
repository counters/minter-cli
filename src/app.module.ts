import { Module } from '@nestjs/common';
import { ApiCommand } from './commands/api/ApiCommand';
import { VersionCommand } from './commands/VersionCommand';
import { WalletCommand } from './commands/wallet/WalletCommand';
import { ConfigModule } from '@nestjs/config';
import { ConfirmQuestion } from './questions/ConfirmQuestion';
import { ContentExporter } from './services/ContentExporter';
import { MagicPipConvert } from './questions/MagicPipConvert';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [],
  providers: [
    VersionCommand,
    ...ApiCommand.registerWithSubCommands(),
    ...WalletCommand.registerWithSubCommands(),
    ConfirmQuestion,
    ContentExporter,
    MagicPipConvert,
  ],
})
export class AppModule {}
