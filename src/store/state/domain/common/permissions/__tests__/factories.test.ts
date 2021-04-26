import { PermissionFactory } from '../factories';

test('PermissionFactory can generate viewAll', () => {
  const permissions = PermissionFactory.ViewAll('resource');
  expect(permissions).toEqual(['resource_viewAll']);
});

test('PermissionFactory can generate viewOwn', () => {
  const permissions = PermissionFactory.ViewOwn('resource');
  expect(permissions).toEqual(['resource_viewOwn']);
});

test('PermissionFactory can generate viewAll and Own', () => {
  const permissions = PermissionFactory.ViewOwnAll('resource');
  expect(permissions).toEqual(['resource_viewOwn', 'resource_viewAll']);
});
