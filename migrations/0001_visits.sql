-- Runs once on each project's own database, the first time the app uses it there.
CREATE TABLE visits (
	id INTEGER PRIMARY KEY,
	at TEXT NOT NULL -- ISO 8601, UTC
);
