import { AllPermissionFactory, OwnPermissionFactory } from 'src/store/utils';

test('OwnPermissionFactory can generate viewAll', () => {
  const allPermissionFactory = new AllPermissionFactory('resource');
  const result = allPermissionFactory.canViewAll(['resource__view_all']);
  expect(result).toBeTruthy();
});

test('OwnPermissionFactory can generate viewOwn', () => {
  const ownPermissionFactory = new OwnPermissionFactory('resource');
  const result = ownPermissionFactory.canViewOwn(['resource__view_wwn']);
  expect(result).toBeFalsy();
});
