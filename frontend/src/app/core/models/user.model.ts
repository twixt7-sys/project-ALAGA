export type UserRole = 'business_owner' | 'customer';

export interface User {
	id: number;
	username: string;
	email: string;
	role: UserRole;
	dateJoined: string;     // ISO string
}
