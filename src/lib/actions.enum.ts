export enum Actions {
	GET = 'readResource',
	POST = 'createResource',
	DELETE = 'deleteResource',
	PATCH = 'writeResource'
}

export function associateMethodToAction(method: string): Actions {
	switch (method) {
		case 'GET':
			return Actions.GET;
			break;
		case 'POST':
			return Actions.POST;
			break;

		case 'DELETE':
			return Actions.DELETE;
			break;

		case 'PATCH':
			return Actions.PATCH;
			break;

		default:
			break;
	}

	throw new Error('Undefined method');
}