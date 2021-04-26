import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { Division } from 'src/store/state/domain/division/divisions/types';
import { memberOwnAllPermissionCheck } from '../selectors';

test('memberOwnAllPermissionCheck: success: own', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: 1,
  };

  expect(
    memberOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('member'),
      [],
      PermissionFactory.CreateOwn('member')
    )
  ).toEqual(true);
});

test('memberOwnAllPermissionCheck: failure: own', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: 1,
  };

  expect(
    memberOwnAllPermissionCheck(
      division,
      [],
      [],
      PermissionFactory.CreateOwn('member')
    )
  ).toEqual(false);
});

// Own の場合は requestMemberId がないと false
test('memberOwnAllPermissionCheck: failure: own and all: requestMemberId is required', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: PermissionFactory.CreateOwnAll('member'),
    requestMemberId: null,
  };

  expect(
    memberOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('member'),
      [],
      PermissionFactory.CreateOwn('member')
    )
  ).toEqual(false);
});

test('memberOwnAllPermissionCheck: failure: own: division undefined', () => {
  const division: Division | undefined = undefined;
  expect(
    memberOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('division'),
      [],
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

test('memberOwnAllPermissionCheck: failure: own: permissionNames undefined', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: PermissionFactory.CreateOwnAll('member'),
    requestMemberId: 1,
  };
  const permissionNames: string[] | undefined = undefined;
  expect(
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      [],
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

test('memberOwnAllPermissionCheck: failure: own: division and permisionNames undefined', () => {
  const division: Division | undefined = undefined;
  const permissionNames: string[] | undefined = undefined;
  expect(
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      [],
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

test('memberOwnAllPermissionCheck: success: all', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: 1,
  };

  // all
  expect(
    memberOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateAll('member'),
      PermissionFactory.CreateAll('member'),
      []
    )
  ).toEqual(true);
});

test('memberOwnAllPermissionCheck: failure: all', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: 1,
  };

  // not all
  expect(
    memberOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('member'),
      PermissionFactory.CreateAll('member'),
      []
    )
  ).toEqual(false);
});

test('memberOwnAllPermissionCheck: success: all: division undefined', () => {
  const division: Division | undefined = undefined;
  expect(
    memberOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateAll('division'),
      PermissionFactory.CreateAll('division'),
      []
    )
  ).toEqual(true);
});

test('memberOwnAllPermissionCheck: failure: all: permissionNames undefined', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: PermissionFactory.CreateOwnAll('member'),
    requestMemberId: 1,
  };
  const permissionNames: string[] | undefined = undefined;
  expect(
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.CreateAll('division'),
      []
    )
  ).toEqual(false);
});

test('memberOwnAllPermissionCheck: failure: all: division and permisionNames undefined', () => {
  const division: Division | undefined = undefined;
  const permissionNames: string[] | undefined = undefined;
  expect(
    memberOwnAllPermissionCheck(
      division,
      permissionNames,
      PermissionFactory.CreateAll('division'),
      []
    )
  ).toEqual(false);
});
