export type UserRole = 'admin' | 'customer';

export interface User {
	id: number;
	username: string;
	email: string;
	role: UserRole;
	dateJoined: string;
}
