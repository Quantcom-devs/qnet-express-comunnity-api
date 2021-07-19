import permissionsModel, { IPermission, Permission } from '../models/permissions.model';

async function createPermission(permission: Permission): Promise<IPermission> {
	return (new permissionsModel(permission)).save();
}

async function findPermissionWithRelations(roleId: string, resourceId: string): Promise<IPermission | null> {
	return permissionsModel.findOne({ $and: [{ roleId }, { resourceId }] }).exec();
}

export default {
	createPermission,
	findPermissionWithRelations
}