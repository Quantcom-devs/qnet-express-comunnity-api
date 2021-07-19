import roleModel, { IRole } from '../models/roles.model';


async function createRole(name: string): Promise<IRole> {
	return (new roleModel({ name })).save();
}

async function findRoleByName(name: string): Promise<IRole | null> {
	return roleModel.findOne({ name }).exec();
}

export default {
	createRole,
	findRoleByName
}