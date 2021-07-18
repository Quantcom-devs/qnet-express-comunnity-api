import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document{
    email: string;
    password: string;
    roleId: string;
}

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'Enter an email.'],
		unique: true,
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, 'Enter a password']
	}
});


export default model<IUser>('User', userSchema);