import { PermissionFactory } from 'src/store/state/domain/common/permissions/factories';
import { Division } from 'src/store/state/domain/sample/divisions/types';
import { divisionUpdatePermissionCheck } from '../index';

test('divisionUpdatePermissionCheck: success: own', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: ['division_createOwn'],
    requestMemberId: 1,
  };

  expect(
    divisionUpdatePermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(true);
});

test('divisionUpdatePermissionCheck: failure: own', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: 1,
  };

  expect(
    divisionUpdatePermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

// Own の場合は requestMemberId がないと false
test('divisionUpdatePermissionCheck: failure: own: requestMemberId is required', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: [],
    requestMemberId: null,
  };

  expect(
    divisionUpdatePermissionCheck(
      division,
      PermissionFactory.CreateOwn('division')
    )
  ).toEqual(false);
});

test('divisionUpdatePermissionCheck: success: all', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: ['division_createAll'],
    requestMemberId: 1,
  };

  // all
  expect(
    divisionUpdatePermissionCheck(
      division,
      PermissionFactory.CreateAll('division')
    )
  ).toEqual(true);
});

test('divisionUpdatePermissionCheck: failure: all', () => {
  const division: Division = {
    id: 0,
    name: 'test division',
    createdAt: null,
    updatedAt: null,
    permissionNames: ['division_createOwn'],
    requestMemberId: 1,
  };

  // not all
  expect(
    divisionUpdatePermissionCheck(
      division,
      PermissionFactory.CreateAll('division')
    )
  ).toEqual(false);
});
