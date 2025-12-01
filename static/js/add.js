const proListPubg = document.getElementById('productsPubg');
const proListTiktok = document.getElementById('productsTiktok');
const proListFan = document.getElementById('productsFan');
const proListWolt = document.getElementById('productsWolt');
const proListCafe = document.getElementById('productsCafe');

const titlePubgInp = document.getElementById('titlePubgInp');
const pricePubgInp = document.getElementById('pricePubgInp');
const titleTiktokInp = document.getElementById('titleTiktokInp');
const priceTiktokInp = document.getElementById('priceTiktokInp');
const titleFanInp = document.getElementById('titleFanInp');
const priceFanInp = document.getElementById('priceFanInp');
const imageFanInp = document.getElementById('imageFanInp');
const myPubgForm = document.getElementById('myPubgForm');
const myTiktokForm = document.getElementById('myTiktokForm');
const myFanForm = document.getElementById('myFanForm');
const woltForm = document.getElementById('woltForm');
const cafeForm = document.getElementById('cafeForm');
const titleWoltInp = document.getElementById('titleWoltInp');
const priceWoltInp = document.getElementById('priceWoltInp');
const descriptionWoltInp = document.getElementById('descriptionWoltInp');
const imageWoltInp = document.getElementById('imageWoltInp');
const titleCafeInp = document.getElementById('titleCafeInp');
const priceCafeInp = document.getElementById('priceCafeInp');
const descriptionCafeInp = document.getElementById('descriptionCafeInp');
const axtarInp = document.getElementById('axtar');
const axtarBtn = document.getElementById('axtarBtn');
const az = document.getElementById('az');
const za = document.getElementById('za');
const defa = document.getElementById('defa');

function postPubgProduct(e) {
    e.preventDefault();
    axios.post('/main-ffqad/game/pubg', {
        title: titlePubgInp.value,
        price: pricePubgInp.value,
    })
        .then(res => {
            getData();
            myPubgForm.reset();
        });
}

function postTiktokProduct(e) {
    e.preventDefault();
    axios.post('/main-ffqad/game/tiktok', {
        title: titleTiktokInp.value,
        price: priceTiktokInp.value,
    })
        .then(res => {
            getData();
            myTiktokForm.reset();
        });
}

function postFanProduct(e) {
    e.preventDefault();
    axios.post('/main-ffqad/game/fan', {
        title: titleFanInp.value,
        price: priceFanInp.value,
        image: imageFanInp.value,
    })
        .then(res => {
            getData();
            myFanForm.reset();
        });
}

function postWoltProduct(e) {
    e.preventDefault();
    axios.post('/main-ffqad/lounge/wolt', {
        title: titleWoltInp.value,
        price: priceWoltInp.value,
        description: descriptionWoltInp.value,
        image: imageWoltInp.value,
    })
        .then(res => {
            getData();
            woltForm.reset();
        });
}

function postCafeProduct(e) {
    e.preventDefault();
    axios.post('/main-ffqad/lounge/cafe', {
        title: titleCafeInp.value,
        price: priceCafeInp.value,
        description: descriptionCafeInp.value,
    })
        .then(res => {
            getData();
            cafeForm.reset();
        });
}

myPubgForm.addEventListener('submit', postPubgProduct);
myTiktokForm.addEventListener('submit', postTiktokProduct);
myFanForm.addEventListener('submit', postFanProduct);
woltForm.addEventListener('submit', postWoltProduct);
cafeForm.addEventListener('submit', postCafeProduct);

function getData() {
    proListPubg.innerHTML = ``;
    proListTiktok.innerHTML = ``;
    proListFan.innerHTML = ``;
    proListWolt.innerHTML = ``;
    proListCafe.innerHTML = ``;

    axios.all([
        axios.get('/main-ffqad/game/pubg'),
        axios.get('/main-ffqad/game/tiktok'),
        axios.get('/main-ffqad/game/fan'),
        axios.get('/main-ffqad/lounge/wolt'),
        axios.get('/main-ffqad/lounge/cafe')
    ])
        .then(axios.spread((pubgRes, tiktokRes, fanRes, woltRes, cafeRes) => {
            let pubgData = pubgRes.data;
            let tiktokData = tiktokRes.data;
            let fanData = fanRes.data;
            let woltData = woltRes.data;
            let cafeData = cafeRes.data;

            // Sort data by price in ascending order
            pubgData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            tiktokData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            fanData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            woltData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            cafeData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));

            pubgData.forEach(item => {
                const box = document.createElement('tr');
                box.innerHTML = `
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="deleteItemPubg('${item.id}')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
            `;
                proListPubg.appendChild(box);
            });

            tiktokData.forEach(item => {
                const box = document.createElement('tr');
                box.innerHTML = `
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="deleteItemTiktok('${item.id}')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
            `;
                proListTiktok.appendChild(box);
            });

            fanData.forEach(item => {
                const box = document.createElement('tr');
                box.innerHTML = `
                <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"></td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="deleteItemFan('${item.id}')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
            `;
                proListFan.appendChild(box);
            });

            woltData.forEach(item => {
                const box = document.createElement('tr');
                box.innerHTML = `
                <td><img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;"></td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.description}</td>
                <td>
                    <button onclick="deleteItemWolt('${item.id}')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
            `;
                proListWolt.appendChild(box);
            });

            cafeData.forEach(item => {
                const box = document.createElement('tr');
                box.innerHTML = `
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.description}</td>
                <td>
                    <button onclick="deleteItemCafe('${item.id}')"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </td>
            `;
                proListCafe.appendChild(box);
            });

        }));
}

getData();

function deleteItemPubg(id) {
    axios.delete(`/main-ffqad/game/pubg/${id}`)
        .then(res => {
            getData();
        });
}

function deleteItemTiktok(id) {
    axios.delete(`/main-ffqad/game/tiktok/${id}`)
        .then(res => {
            getData();
        });
}

function deleteItemFan(id) {
    axios.delete(`/main-ffqad/game/fan/${id}`)
        .then(res => {
            getData();
        });
}

function deleteItemWolt(id) {
    axios.delete(`/main-ffqad/lounge/wolt/${id}`)
        .then(res => {
            getData();
        });
}

function deleteItemCafe(id) {
    axios.delete(`/main-ffqad/lounge/cafe/${id}`)
        .then(res => {
            getData();
        });
}

axtarBtn.addEventListener('click', () => {
    const searchTerm = axtarInp.value.toLowerCase();
    proListPubg.querySelectorAll('tr').forEach(row => {
        const title = row.querySelector('td').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    proListTiktok.querySelectorAll('tr').forEach(row => {
        const title = row.querySelector('td').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    proListFan.querySelectorAll('tr').forEach(row => {
        const title = row.querySelectorAll('td')[1].textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    proListWolt.querySelectorAll('tr').forEach(row => {
        const title = row.querySelectorAll('td')[1].textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    proListCafe.querySelectorAll('tr').forEach(row => {
        const title = row.querySelector('td').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

az.addEventListener('click', () => {
    proListPubg.querySelectorAll('tr').forEach(row => {
        proListPubg.appendChild(row);
    });
    proListTiktok.querySelectorAll('tr').forEach(row => {
        proListTiktok.appendChild(row);
    });
    proListFan.querySelectorAll('tr').forEach(row => {
        proListFan.appendChild(row);
    });
    proListWolt.querySelectorAll('tr').forEach(row => {
        proListWolt.appendChild(row);
    });
    proListCafe.querySelectorAll('tr').forEach(row => {
        proListCafe.appendChild(row);
    });
});

za.addEventListener('click', () => {
    const rows = Array.from(proListPubg.querySelectorAll('tr')).sort((a, b) => {
        const aPrice = parseFloat(a.querySelector('td').textContent.substring(1));
        const bPrice = parseFloat(b.querySelector('td').textContent.substring(1));
        return bPrice - aPrice;
    });
    rows.forEach(row => proListPubg.appendChild(row));

    const tiktokRows = Array.from(proListTiktok.querySelectorAll('tr')).sort((a, b) => {
        const aPrice = parseFloat(a.querySelector('td').textContent.substring(1));
        const bPrice = parseFloat(b.querySelector('td').textContent.substring(1));
        return bPrice - aPrice;
    });
    tiktokRows.forEach(row => proListTiktok.appendChild(row));

    const fanRows = Array.from(proListFan.querySelectorAll('tr')).sort((a, b) => {
        const aPrice = parseFloat(a.querySelectorAll('td')[2].textContent);
        const bPrice = parseFloat(b.querySelectorAll('td')[2].textContent);
        return bPrice - aPrice;
    });
    fanRows.forEach(row => proListFan.appendChild(row));

    const woltRows = Array.from(proListWolt.querySelectorAll('tr')).sort((a, b) => {
        const aPrice = parseFloat(a.querySelectorAll('td')[2].textContent);
        const bPrice = parseFloat(b.querySelectorAll('td')[2].textContent);
        return bPrice - aPrice;
    });
    woltRows.forEach(row => proListWolt.appendChild(row));

    const cafeRows = Array.from(proListCafe.querySelectorAll('tr')).sort((a, b) => {
        const aPrice = parseFloat(a.querySelectorAll('td')[1].textContent);
        const bPrice = parseFloat(b.querySelectorAll('td')[1].textContent);
        return bPrice - aPrice;
    });
    cafeRows.forEach(row => proListCafe.appendChild(row));
});

defa.addEventListener('click', () => {
    getData();
});
