/**@type {HTMLElement} */

const valider = document.getElementById('bouton');
const tache = document.getElementById('tache');
const list = document.getElementById('list');

let editingSpan = null;

// ✅ Erreur 4 — Enter valide
tache.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') valider.click();
});

valider.addEventListener('click', () => {
    const valeur = tache.value.trim();
    if(valeur === "") return;

    // Modification
    if(editingSpan !== null){
        editingSpan.textContent = valeur;
        editingSpan.style.marginLeft = '10px';
        editingSpan = null;
        tache.value = '';
        valider.textContent = 'Valider'; // ✅ Erreur 3 — reset bouton
        return;
    }

    const li = document.createElement('li');
    li.innerHTML =
        '<input type="checkbox" class="npt" style="cursor:pointer">' + // ✅ Erreur 1 — class au lieu de id
        '<span class="val"> ' + valeur + '</span>' +
        '<span style="color:red;margin-left:35px;cursor:pointer" class="del">Del</span>' +
        '<span style="color:purple;margin-left:15px;cursor:pointer" class="modi">Modify</span>';

    li.style.listStyle = 'none';
    li.style.fontFamily = 'monospace';
    li.style.textAlign = 'start';
    li.style.margin = '15px 0 10px 90px';

    li.querySelector('.del').addEventListener('click', () => {
        li.remove();
    });

    li.querySelector('.modi').addEventListener('click', () => {
        const span = li.querySelector('.val');
        tache.value = span.textContent.trim(); // ✅ Erreur 5 — trim()
        editingSpan = span;
        valider.textContent = 'Modifier'; // ✅ Erreur 3 — feedback visuel
        tache.focus();
    });

    li.querySelector('.npt').addEventListener('click', () => { // ✅ Erreur 2 — .npt au lieu de input
        const span = li.querySelector('.val');
        span.classList.toggle('accompli');

        const done = li.querySelector('.done');
        if(done){
            done.remove();
        } else {
            const newDone = document.createElement('span');
            newDone.textContent = 'Finished';
            newDone.classList.add('done');
            newDone.style.color = 'green';
            newDone.style.marginLeft = '10px';
            li.appendChild(newDone);
        }
    });

    list.appendChild(li);
    tache.value = '';
});