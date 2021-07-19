import { Document, Schema, model } from 'mongoose';


export interface Permission {
	createResource: boolean;
	readResource: string;
	writeResource: string;
	deleteResource: string;
	roleId: string;
	resourceId: string;
}
export interface IPermission extends Document, Permission {
}

const permissionSchema = new Schema({
	roleId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	resourceId: {
		type: Schema.Types.ObjectId,
		required: true
	},
	createResource: {
		type: Boolean,
		required: true
	},
	readResource: {
		type: String,
		enum: ['ANY', 'OWN', 'NONE']
	},
	writeResource: {
		type: String,
		enum: ['ANY', 'OWN', 'NONE']
	},
	deleteResource: {
		type: String,
		enum: ['ANY', 'OWN', 'NONE']
	}
});

export default model<IPermission>('Permission', permissionSchema);