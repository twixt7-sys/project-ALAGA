INSERT INTO users (username, password_hash, email, role)
VALUES ('owner1','$hash1','owner@example.com','business_owner'),
       ('customer1','$hash2','alice@example.com','customer');

INSERT INTO users (username, password_hash, email, role)
VALUES
	('owner3', '$2b$12$Mk3c4DeF5GhI6JkL7MnOpQ8RsT9UvWxYzA123456789abcdef0', 'owner3@example.com', 'business_owner'),
	('customer1',  '$2b$12$Na4d5EfG6HiJ7KlM8NoPqR9StU0VwXyZaB23456789abcdef01', 'customer1@example.com', 'customer'),
	('bob',    '$2b$12$Oa5e6FgH7IjK8LmN9OpQrS0TuV1WxYzAbC3456789abcdef012', 'bob@example.com', 'customer'),
	('carol',  '$2b$12$Pb6f7GhI8JkL9MnO0PqRsT1UvW2XyZaBcD456789abcdef0123', 'carol@example.com', 'customer'),
	('dave',   '$2b$12$Qc7g8HiJ9KlM0NoPqRsTuV2WxY3ZaBcDeF56789abcdef01234', 'dave@example.com', 'customer'),
	('eve',    '$2b$12$Rd8h9IjK0LmN1OpQrStUvW3XyZ4aBcDeFg6789abcdef012345', 'eve@example.com', 'customer'),
	('frank',  '$2b$12$Se9i0JkL1MnO2PqRsTuVwX4yZaB5cDeFgH789abcdef0123456', 'frank@example.com', 'customer'),
	('grace',  '$2b$12$Tf0j1KlM2NoP3QrStUvWxY5zAbC6dEfGhI890abcdef01234567', 'grace@example.com', 'customer');
