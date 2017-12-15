const sampleSection = document.getElementById('sample');
const jsonUrlBase = 'https://jsonplaceholder.typicode.com';

function getSampleText() {
	fetch('sample-text.html')
		.then(res => res.text())
		.then(text => {
			sampleSection.innerHTML = text;
		});
}

function getUsers() {
	fetch('users.json')
		.then(res => res.json())
		.then(json => {
			sampleSection.innerHTML = htmlJSON(json);
		})
}

function getPosts() {
	fetch(jsonUrlBase + '/posts')
		.then(res => res.json())
		.then(json => {
			sampleSection.innerHTML = htmlPosts(json);
		})
}

function getFormNewPost() {
	fetch('form.html')
		.then(res => res.text())
		.then(text => {
			sampleSection.innerHTML = text;
		})
}

function newPost() {
	const title = document.getElementById('postTitle').value;
	const body = document.getElementById('postBody').value;
	fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-type': 'application/json'

		},
		body: JSON.stringify({title: title, body: body})
	})
	.then(res => res.json())
	.then(json => {
		sampleSection.innerHTML = htmlPost(json);
	})
}


function htmlJSON(json) {
	const html = `<ul><h2>Walking Dead Cast` + json.map(user => '<li>' + `<h3>${user.name}</h3>` + `<p>Morality: ${user.status}</p>` + '</li>').join('') + '</ul>';
	return html;
}

function htmlPost(json) {
	return `<ul><h2>Post Successfully Created!</h2>` + `<li><h3>${json.title}</h3><p>${json.body}</p></li></ul>`;
}

function htmlPosts(posts) {
	let html = '<ul class="post-container"><h1>Index of Posts</h1>' + posts.map(post => '<li>' + `<h2 class="post-title">${post.title}</h2><p class="post-body">${post.body}</p></li>`).join('') + '</ul>';
	return html;	
}