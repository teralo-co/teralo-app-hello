// Bundled by `teralo-app build`, so it can import the SDK.
import { api, connect, navigate, onNavigate, openPage, saveFile, toast } from '@teralo-co/apps/client';

const $ = (id) => document.getElementById(id);

async function refresh() {
	const response = await api('/summary');
	if (!response.ok) {
		toast('Could not load the visits', 'error');
		return;
	}
	const { project, visits } = await response.json();
	$('project').textContent = project;
	$('visits').textContent = visits;
	$('card-visits').textContent = visits;
}

function show(path) {
	$('home').hidden = path === '/about';
	$('about').hidden = path !== '/about';
}

const { surface, path } = await connect();

if (surface === 'card') {
	$('card').hidden = false;
	$('open').onclick = () => openPage('/');
} else {
	$('page').hidden = false;
	show(path);
	onNavigate(show);
	for (const link of document.querySelectorAll('[data-screen]')) {
		link.onclick = (event) => {
			event.preventDefault();
			const next = link.getAttribute('href');
			show(next);
			navigate(next);
		};
	}
	$('visit').onclick = async () => {
		const response = await api('/visits', { method: 'POST' });
		if (!response.ok) return toast('Could not record the visit', 'error');
		toast('Visit recorded', 'success');
		await refresh();
	};
	$('download').onclick = async () => {
		const rows = await (await api('/visits')).json();
		saveFile('visits.csv', ['Visit,Recorded at (UTC)', ...rows.map((r) => `${r.id},${r.at}`)].join('\n'));
	};
}
await refresh();
