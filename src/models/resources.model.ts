import { Document, Schema, model } from 'mongoose';

export interface IResource extends Document {
	resource: string;
}

const resourceSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

export default model<IResource>('Resource', resourceSchema);