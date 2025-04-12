import {Module} from '@nestjs/common';
import {ApiCommand} from './commands/api/ApiCommand';
import {VersionCommand} from "./commands/VersionCommand";
import {WalletCommand} from "./commands/wallet/WalletCommand";
import {ConfigModule} from "@nestjs/config";
import {ConfirmQuestion} from "./questions/ConfirmQuestion";

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [],
    providers: [
        VersionCommand,
        ...ApiCommand.registerWithSubCommands(),
        ...WalletCommand.registerWithSubCommands(),
        ConfirmQuestion,
    ],
})
export class AppModule {
}
