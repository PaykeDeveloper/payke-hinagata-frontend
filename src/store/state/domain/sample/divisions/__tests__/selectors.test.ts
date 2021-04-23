import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { Division } from 'src/store/state/domain/sample/divisions/types';
import { divisionOwnAllPermissionCheck } from '../selectors';

test('divisionOwnAllPermissionCheck: success: own', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: ['division_createOwn'],
    requestMemberId: 1,
  };

  expect(
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(true);
});

test('divisionOwnAllPermissionCheck: failure: own', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: 1,
  };

  expect(
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

// Own の場合は requestMemberId がないと false
test('divisionOwnAllPermissionCheck: failure: own and all: requestMemberId is required', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: PermissionFactory.CreateOwnAll('division'),
    requestMemberId: null,
  };

  expect(
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

test('divisionOwnAllPermissionCheck: failure: own: division undefined', () => {
  const division: Division | undefined = undefined;
  expect(
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

test('divisionOwnAllPermissionCheck: success: all', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: PermissionFactory.CreateAll('division'),
    requestMemberId: 1,
  };

  // all
  expect(
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateAll('division')
    )
  ).toEqual(true);
});

test('divisionOwnAllPermissionCheck: failure: all', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: PermissionFactory.CreateOwn('division'),
    requestMemberId: 1,
  };

  // not all
  expect(
    divisionOwnAllPermissionCheck(
      division,
      PermissionFactory.CreateAll('division')
    )
  ).toEqual(false);
});
