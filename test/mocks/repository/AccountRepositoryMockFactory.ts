import IAccountRepository from "../../../src/account/domain/repository/IAccountRepository";

export default class AccountRepositoryMockFactory {
  public static create(): jest.Mocked<IAccountRepository> {
    return {
      save: jest.fn(),
      count: jest.fn(),
      getByCode: jest.fn(),
      getAll: jest.fn(),
      getByCpf: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      deleteAll: jest.fn()
    }
  }
}