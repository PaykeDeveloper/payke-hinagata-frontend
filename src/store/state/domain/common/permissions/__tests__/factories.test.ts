import { AllPermissionFactory, OwnPermissionFactory } from '../factories';

test('AllPermissionFactory can generate viewAll', () => {
  const allPermissionFactory = new AllPermissionFactory('resource');
  const permissions = allPermissionFactory.view();
  expect(permissions).toEqual('resource_viewAll');
});

test('OwnPermissionFactory can generate viewOwn', () => {
  const ownPermissionFactory = new OwnPermissionFactory('resource');
  const permissions = ownPermissionFactory.view();
  expect(permissions).toEqual('resource_viewOwn');
});
