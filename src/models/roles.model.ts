import { Document, Schema, model } from 'mongoose';

export interface IRole extends Document {
	name: string
}

const roleSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}
});

export default model<IRole>('Role', roleSchema);