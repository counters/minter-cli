import { VersionCommand } from './VersionCommand';
import { CommandTestFactory } from 'nest-commander-testing';
import { TestingModule } from '@nestjs/testing';
import * as childProcess from 'child_process';

describe('VersionCommand', () => {
  let commandInstance: TestingModule;
  // let command: VersionCommand;
  let spawnSpy: jest.SpyInstance;

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [],
      providers: [VersionCommand],
    }).compile();
    // command = commandInstance.get(VersionCommand);
  });

  beforeEach(() => {
    // Мокаем spawn и сохраняем spy для проверок
    /*        spawnSpy = jest.spyOn(childProcess, 'spawn').mockImplementation(() => {
            return {
                on: jest.fn((event, callback) => {
                    if (event === 'close') callback(0);
                }),
                stdout: { on: jest.fn() },
                stderr: { on: jest.fn() }
            } as unknown as childProcess.ChildProcess;
        });*/
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', async () => {
    spawnSpy = jest.spyOn(childProcess, 'spawn');
    await CommandTestFactory.run(commandInstance, ['version']);
    // Проверяем, что spawn был вызван
    // expect(spawnSpy).toHaveBeenCalled();

    // Получаем все вызовы spawn
    const spawnCalls = spawnSpy.mock.calls;
    console.log('Все вызовы spawn:', spawnCalls);

    // Проверяем первый вызов
    const firstCall = spawnSpy.mock.calls[0];
    console.log('Первый вызов spawn:', firstCall);
    // expect(spawnSpy).toBeCalledWith('minter-cli version 0.1.0');
    // expect(spawnSpy).toHaveBeenCalledWith('minter-cli version 0.1.0');
  });

  /*    it('should be defined2', async () => {

        command.run([], []).then(result => {
            console.info(result);
            expect(result).toContain("minter-cli version 0.1.1");
        })
            .catch(err => {
                console.error(err);
            })

    });*/
});
