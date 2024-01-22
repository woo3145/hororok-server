import { Test } from '@nestjs/testing';
import { AccountsRepository } from '../accounts.repository';
import { AccountModel } from './support/account.model';
import { Account } from '../entities/account.model';
import { accountStub } from './stubs/account.stub';
import { FilterQuery } from 'mongoose';

describe('AccountsRepository', () => {
  let accountRepository: AccountsRepository;

  describe('find operation', () => {
    let accountModel: AccountModel;
    let accountFilterQuery: FilterQuery<Account>;
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          AccountsRepository,
          {
            provide: 'ACCOUNT_MODEL',
            useClass: AccountModel,
          },
        ],
      }).compile();

      accountRepository = moduleRef.get<AccountsRepository>(AccountsRepository);
      accountModel = moduleRef.get<AccountModel>('ACCOUNT_MODEL');

      accountFilterQuery = {
        account_id: accountStub().account_id,
      };

      jest.clearAllMocks();
    });

    describe('findOne', () => {
      describe('findOne 호출 시', () => {
        let account: Account;

        beforeEach(async () => {
          jest.spyOn(accountModel, 'findOne');
          account = await accountRepository.findOne(accountFilterQuery);
        });

        test('accountModel이 호출됨', () => {
          expect(accountModel.findOne).toHaveBeenCalledWith(
            accountFilterQuery,
            {
              _id: 0,
              __v: 0,
            },
          );
        });

        test('account 반환', () => {
          expect(account).toEqual(accountStub());
        });
      });
    });

    describe('find', () => {
      describe('find 호출 시', () => {
        let accounts: Account[];

        beforeEach(async () => {
          jest.spyOn(accountModel, 'find');
          accounts = await accountRepository.find(accountFilterQuery);
        });

        test('accountModel이 호출됨', () => {
          expect(accountModel.find).toHaveBeenCalledWith(accountFilterQuery);
        });

        test('account[] 반환', () => {
          expect(accounts).toEqual([accountStub()]);
        });
      });
    });

    describe('findOneAndUpdate', () => {
      describe('findOneAndUpdate 호출 시', () => {
        let account: Account;

        beforeEach(async () => {
          jest.spyOn(accountModel, 'findOneAndUpdate');
          account = await accountRepository.findOneAndUpdate(
            accountFilterQuery,
            accountStub(),
          );
        });

        test('accountModel이 호출됨', () => {
          expect(accountModel.findOneAndUpdate).toHaveBeenCalledWith(
            accountFilterQuery,
            accountStub(),
            { new: true },
          );
        });

        test('account 반환', () => {
          expect(account).toEqual(accountStub());
        });
      });
    });
  });

  describe('create operations', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          AccountsRepository,
          {
            provide: 'ACCOUNT_MODEL',
            useValue: AccountModel,
          },
        ],
      }).compile();

      accountRepository = moduleRef.get<AccountsRepository>(AccountsRepository);
    });

    describe('create', () => {
      describe('create 호출 시', () => {
        let account: Account;
        let saveSpy: jest.SpyInstance;
        let constructorSpy: jest.SpyInstance;

        beforeEach(async () => {
          saveSpy = jest.spyOn(AccountModel.prototype, 'save');
          constructorSpy = jest.spyOn(AccountModel.prototype, 'constructorSpy');
          account = await accountRepository.create(accountStub());
        });

        test('accountModel이 호출됨', () => {
          expect(saveSpy).toHaveBeenCalled();
          expect(constructorSpy).toHaveBeenCalledWith(accountStub());
        });

        test('account 반환', () => {
          expect(account).toEqual(accountStub());
        });
      });
    });
  });
});