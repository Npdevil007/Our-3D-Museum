/* Demo editor. Cloud persistence and real share links require a backend. */
const form = document.querySelector('#museum-form');
const photoInput = document.querySelector('#photos');
const preview = document.querySelector('#preview');
const result = document.querySelector('#share-result');
let selectedPhotos = [];

photoInput.addEventListener('change', () => {
  selectedPhotos = [...photoInput.files].filter(file => file.type.startsWith('image/'));
  preview.replaceChildren();
  selectedPhotos.forEach(file => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const caption = document.createElement('figcaption');
    img.alt = `Preview of ${file.name}`;
    img.src = URL.createObjectURL(file);
    caption.textContent = file.name;
    figure.append(img, caption);
    preview.append(figure);
  });
});

form.addEventListener('submit', async event => {
  event.preventDefault();
  const title = form.elements.title.value.trim();
  const recipient = form.elements.recipient.value.trim();
  const message = form.elements.message.value.trim();
  const photos = await Promise.all(selectedPhotos.map(file => new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = () => resolve({name:file.name, data:reader.result});
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  })));
  const museum = {id:crypto.randomUUID(),title,recipient,message,photos:photos.filter(Boolean),createdAt:new Date().toISOString()};
  try {
    const existing = JSON.parse(localStorage.getItem('ourMuseumDemo') || '[]');
    existing.push(museum);
    localStorage.setItem('ourMuseumDemo',JSON.stringify(existing));
    const shareUrl = new URL('museum.html',window.location.href);
    shareUrl.searchParams.set('id',museum.id);
    result.hidden = false;
    result.innerHTML = '';
    const heading = document.createElement('h2'); heading.textContent='Museum created in this browser';
    const link = document.createElement('a'); link.href=shareUrl.href; link.textContent=shareUrl.href;
    const copy = document.createElement('button'); copy.className='button'; copy.type='button'; copy.textContent='Copy link';
    copy.addEventListener('click', async()=>{await navigator.clipboard.writeText(shareUrl.href);copy.textContent='Copied';});
    const caveat = document.createElement('p'); caveat.textContent='This demo link works only in this browser on this device. Cloud storage and real cross-device sharing are not connected yet.';
    result.append(heading,link,copy,caveat);
  } catch (error) {
    result.hidden=false; result.textContent='Could not save this demo museum. Your browser storage may be full.';
  }
});
