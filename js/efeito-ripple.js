function iniciarRipple() {
  document.querySelectorAll('.link, .like-btn, .share-btn').forEach(el => {
    el.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const tamanho = Math.max(rect.width, rect.height);
      const onda = document.createElement('span');

      onda.className = 'ripple';
      onda.style.width = onda.style.height = tamanho + 'px';
      onda.style.left = (e.clientX - rect.left - tamanho / 2) + 'px';
      onda.style.top = (e.clientY - rect.top - tamanho / 2) + 'px';

      this.appendChild(onda);
      setTimeout(() => onda.remove(), 600);
    });
  });
}