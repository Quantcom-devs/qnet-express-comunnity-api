import resourceModel, { IResource } from '../models/resources.model';

async function createResource(name: string): Promise<IResource> {
	return (new resourceModel({ name })).save();
}

async function findResourceByName(name: string): Promise<IResource | null> {
	return resourceModel.findOne({ name }).exec();
}

export default {
	createResource,
	findResourceByName
}