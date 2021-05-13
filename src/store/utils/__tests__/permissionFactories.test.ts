import { OwnPermissionFactory } from 'src/store/utils/index';

test('OwnPermissionFactory can generate viewAll', () => {
  const allPermissionFactory = new OwnPermissionFactory('resource');
  const permissions = allPermissionFactory.viewAll;
  expect(permissions).toEqual('resource_viewAll');
});

test('OwnPermissionFactory can generate viewOwn', () => {
  const ownPermissionFactory = new OwnPermissionFactory('resource');
  const permissions = ownPermissionFactory.viewOwn;
  expect(permissions).toEqual('resource_viewOwn');
});
