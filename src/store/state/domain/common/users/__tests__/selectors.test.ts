import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { User } from '../../user/types';
import { userOwnAllPermissionCheck } from '../selectors';

test('userOwnAllPermissionCheck: success: own', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: [],
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 1;

  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      PermissionFactory.CreateOwn('user'),
      [],
      PermissionFactory.CreateOwn('user')
    )
  ).toEqual(true);
});

test('userOwnAllPermissionCheck: failure: own', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: [],
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 2;

  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      [],
      [],
      PermissionFactory.CreateOwn('user')
    )
  ).toEqual(false);
});

// Own の場合は requestMemberId がないと false
test('userOwnAllPermissionCheck: failure: own and all: requestMemberId is required', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: PermissionFactory.CreateOwnAll('user'),
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 2;

  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      PermissionFactory.CreateOwn('user'),
      [],
      PermissionFactory.CreateOwn('user')
    )
  ).toEqual(false);
});

test('userOwnAllPermissionCheck: failure: own: division undefined', () => {
  const user: User | undefined = undefined;
  const myUserId = 2;
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      PermissionFactory.CreateOwn('user'),
      [],
      PermissionFactory.CreateOwn('user')
    )
  ).toEqual(false);
});

test('userOwnAllPermissionCheck: failure: own: permissionNames undefined', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: PermissionFactory.CreateOwnAll('user'),
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 2;
  const permissionNames: string[] | undefined = undefined;

  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      permissionNames,
      [],
      PermissionFactory.CreateOwn('user')
    )
  ).toEqual(false);
});

test('userOwnAllPermissionCheck: failure: own: division and permisionNames undefined', () => {
  const user: User | undefined = undefined;
  const permissionNames: string[] | undefined = undefined;
  const myUserId = 2;
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      permissionNames,
      [],
      PermissionFactory.CreateOwn('user')
    )
  ).toEqual(false);
});

test('userOwnAllPermissionCheck: success: all', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: PermissionFactory.CreateOwnAll('user'),
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 2;

  // all
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      PermissionFactory.CreateAll('user'),
      PermissionFactory.CreateAll('user'),
      []
    )
  ).toEqual(true);
});

test('userOwnAllPermissionCheck: failure: all', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: [],
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 2;

  // not all
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      PermissionFactory.CreateOwn('user'),
      PermissionFactory.CreateAll('user'),
      []
    )
  ).toEqual(false);
});

test('userOwnAllPermissionCheck: success: all: division undefined', () => {
  const user: User | undefined = undefined;
  const myUserId = 2;
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      PermissionFactory.CreateAll('user'),
      PermissionFactory.CreateAll('user'),
      []
    )
  ).toEqual(true);
});

test('userOwnAllPermissionCheck: failure: all: permissionNames undefined', () => {
  const user: User = {
    id: 1,
    name: '',
    email: '',
    permissionNames: PermissionFactory.CreateOwnAll('user'),
    roleNames: [],
    createdAt: null,
    updatedAt: null,
  };
  const myUserId = 2;
  const permissionNames: string[] | undefined = undefined;
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      permissionNames,
      PermissionFactory.CreateAll('user'),
      []
    )
  ).toEqual(false);
});

test('userOwnAllPermissionCheck: failure: all: division and permisionNames undefined', () => {
  const user: User | undefined = undefined;
  const permissionNames: string[] | undefined = undefined;
  const myUserId = 1;
  expect(
    userOwnAllPermissionCheck(
      myUserId,
      user,
      permissionNames,
      PermissionFactory.CreateAll('user'),
      []
    )
  ).toEqual(false);
});
