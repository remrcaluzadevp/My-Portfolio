const projects = [
    { 
        title: "My Portfolio", 
        description: "Professional portfolio website showcasing skills, projects, and contact information.", 
        tags: ["HTML", "CSS", "JavaScript"], 
        link: "https://remrcaluzadevp.github.io/My-Portfolio/" 
    },
    { 
        title: "Carpool Planner", 
        description: "A convenient tool to organize carpool schedules, routes, and passengers.", 
        tags: ["TypeScript", "HTML", "CSS"], 
        link: "https://carpool-planner-cf8897.netlify.app" 
    }
];

function renderProjects() {
    const container = document.getElementById('projects-grid');
    container.innerHTML = ''; // Clear first to avoid duplicates
    
    projects.forEach(p => {
        const tags = p.tags.map(t => `<span class="project-tag">${t}</span>`).join('');
        container.innerHTML += `
            <div class="project-card">
                <div class="project-content">
                    <h3><a href="${p.link}" target="_blank" style="color: var(--primary); text-decoration: none;">${p.title}</a></h3>
                    <p>${p.description}</p>
                    <div>${tags}</div>
                    <a href="${p.link}" target="_blank" style="display: inline-block; margin-top: 0.8rem; color: var(--accent); font-weight: 500; text-decoration: none;">View Project →</a>
                </div>
            </div>
        `;
    });
}

async function loadGitHubRepos() {
    const username = 'remrcaluzadevp';
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
        if (!res.ok) throw new Error();
        const repos = await res.json();
        const container = document.getElementById('github-repos');
        container.innerHTML = '';
        repos.forEach(r => {
            container.innerHTML += `
                <div class="repo-item">
                    <a href="${r.html_url}" target="_blank">📁 ${r.name}</a>
                    <p>${r.language || 'Repository'}</p>
                </div>
            `;
        });
    } catch {
        document.getElementById('github-repos').innerHTML = '<p style="text-align:center; color:var(--gray);">Unable to load repositories at this time.</p>';
    }
}

const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const status = document.getElementById('form-status');

    if (!name || !email || !message) {
        status.textContent = 'Please fill in all fields.';
        status.style.color = '#d32f2f';
        return;
    }
    if (!email.includes('@')) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = '#d32f2f';
        return;
    }
    status.textContent = 'Message sent successfully! Thank you.';
    status.style.color = '#2e7d32';
    form.reset();
    setTimeout(() => status.textContent = '', 5000);
});

window.addEventListener('scroll', () => {
    document.getElementById('back-top').style.display = window.scrollY > 400 ? 'block' : 'none';
});

renderProjects();
loadGitHubRepos();
