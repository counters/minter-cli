import { QuestionSet, Question } from 'nest-commander';

@QuestionSet({ name: 'confirm-question' })
export class ConfirmQuestion {
    @Question({
        type: 'confirm',
        name: 'confirm',
        message: 'Are you confirming the transaction?',
        default: false,
        // askAnswered: true,
    })
    parseConfirm(val: boolean) {
        return val;
    }

}

export const CANCEL_MESSAGE = "You have cancelled the transaction."
