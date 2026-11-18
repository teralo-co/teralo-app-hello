// Runs in Teralo's plugin host. `teralo` reads Teralo data with the person's own permissions;
// `db` is this app's own database for the project it is open on.
import { defineApp } from '@teralo-co/apps/server';

export default defineApp(async ({ request, url, teralo, db }) => {
	const route = `${request.method} ${url.pathname}`;

	if (route === 'GET /summary') {
		const [project, row] = await Promise.all([
			teralo.project(),
			db.one('SELECT count(*) AS visits FROM visits')
		]);
		return Response.json({ project: project.name, timeZone: project.timeZone, visits: row.visits });
	}

	if (route === 'POST /visits') {
		await db.run('INSERT INTO visits (at) VALUES (?)', [new Date().toISOString()]);
		return new Response(null, { status: 204 });
	}

	if (route === 'GET /visits') {
		return Response.json(await db.all('SELECT id, at FROM visits ORDER BY id'));
	}

	return Response.json({ error: 'Not found' }, { status: 404 });
});
