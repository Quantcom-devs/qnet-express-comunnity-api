import authConfig from '../base-security.json';
import roleService from '../services/roles.service';
import resourceService from '../services/resources.service';
import permissionsService from '../services/permissions.service';
import Logger from './logger';

async function registerRoles() {
	for (const role of authConfig.roles) {
		if (!(await roleService.findRoleByName(role))) {
			await roleService.createRole(role);
		}
	}

	Logger.info('Roles registered.');
}

async function registerResources() {
	for (const resource of authConfig.resources) {
		if (!(await resourceService.findResourceByName(resource))) {
			await resourceService.createResource(resource);
		}
	}
	Logger.info('Resources registered.');
}

async function registerPermissions() {
	const keys = Object.keys(authConfig.permissions) as Array<'users' | 'roles' | 'permissions' | 'resources'>;

	for (const key of keys) {
		const resource = await resourceService.findResourceByName(key);

		if (resource) {
			for (const permission of authConfig.permissions[key]) {
				const role = await roleService.findRoleByName(permission.role);

				if (role) {
					if (!(await permissionsService.findPermissionWithRelations(role._id, resource._id))) {
						await permissionsService.createPermission({
							roleId: role._id,
							resourceId: resource._id,
							createResource: permission.create,
							deleteResource: permission.delete,
							readResource: permission.read,
							writeResource: permission.write
						});
					}
				}

			}
		}

	}

	Logger.info('Permissions registered.');
}

export default async function initAuth(): Promise<void> {
	await registerRoles();
	await registerResources();
	await registerPermissions();
}