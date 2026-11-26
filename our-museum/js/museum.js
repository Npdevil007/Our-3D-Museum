const gallery = document.querySelector('#photo-gallery');
const title = document.querySelector('#museum-title');
const dedication = document.querySelector('#dedication');
const empty = document.querySelector('#empty-state');
const museumId = new URLSearchParams(location.search).get('id');
const museums = JSON.parse(localStorage.getItem('ourMuseumDemo') || '[]');
const museum = museums.find(item => item.id === museumId) || museums.at(-1);
if (!museum) { empty.hidden=false; }
else {
  title.textContent = museum.title || 'Our Museum';
  dedication.textContent = [museum.recipient,museum.message].filter(Boolean).join(' · ');
  if (!museum.photos?.length) empty.hidden=false;
  museum.photos?.forEach(photo => {
    const figure=document.createElement('figure');
    const img=document.createElement('img'); img.src=photo.data; img.alt=photo.name || 'Museum photograph'; loading='lazy';
    const caption=document.createElement('figcaption'); caption.textContent=photo.name || '';
    figure.append(img,caption); gallery.append(figure);
  });
}
