document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const errorMessage = document.getElementById('errorMessage');
    const form = e.target;
    const formData = new FormData(form);
    var formEntries = Object.fromEntries(formData.entries());

    let res = await fetch(`/main-api/admin/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formEntries)
    });

    console.log(res);

    if (res.status === 200) {
        window.location.href = '/main-api/admin';
    }else if (res.status === 429) {
        errorMessage.innerText = 'Too many failed login attempts. Please try again later.';
        errorMessage.style.display = 'block';
    } else if (res.status === 400) {
        res = await res.json();
        errorMessage.innerText = res.message;
        errorMessage.style.display = 'block';
    };
});