const button = document.querySelector('button');
const heading = document.querySelector('h1');

// Leer el texto inicial del h1
const initialText = heading.innerText;

// Determinar el estado inicial basado en el tema
const isDark =
  document.documentElement.dataset.theme === 'dark' ||
  matchMedia('(prefers-color-scheme: dark)').matches;

// Configurar el tema inicial en el atributo de accesibilidad y dataset
button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

// Función para sincronizar el tema y modificar la clase del body (opcional)
const sync = () => {
  const darkNow = button.matches('[aria-pressed="false"]');
  document.documentElement.dataset.theme = darkNow ? 'dark' : 'light';
  button.setAttribute('aria-pressed', darkNow ? 'true' : 'false');
};

// Manejo de la transición (si soportada)
const handleSync = () => {
  if (!document.startViewTransition) return sync();
  document.startViewTransition(sync);
};

// Agregar el evento al botón
button.addEventListener('click', handleSync);

// Actualización inicial del contenido respetando el texto del HTML
document.querySelector('.button-container button').addEventListener('click', () => {
  // Ocultar todo el contenido del cuerpo excepto la sección #skills
  document.querySelectorAll('main > *:not(#skills)').forEach(element => {
    element.style.display = 'none'; // Oculta todo lo demás
  });

  // Asegurarnos de que la sección #skills sea visible
  const skillsSection = document.querySelector('#skills');
  skillsSection.style.display = 'block'; // Mostrar la sección #skills
});
