const reference = document.querySelector('.reference');
const verse = document.querySelector('.verse');
const verseContainer = document.querySelector('.verse-container');
const versionChanger = document.querySelector('form');
const versionInput = versionChanger.querySelector('input[type=text]');
const errorDiv = document.querySelector('.formError');
const getter = document.querySelector('#getter');


const baseURL = 'https://www.biblegateway.com/votd/get/?format=json&callback=useVerse';


function init() {
    const version = window.localStorage.getItem('version') || 'NLT';

    addScript(version);
}

function addScript(version) {
    const script = document.createElement('script');
    script.src = `${baseURL}&version=${version}`
    document.body.appendChild(script);
}

function useVerse(json) {
    console.log(json);

    if (json.error) {
        errorDiv.textContent = "Translation is invalid. Please enter a valid translation.";
        errorDiv.style.display = 'inline-block';
        errorDiv.style.opacity = 1;
        return;
    }

    localStorage.setItem('version', json.votd.version_id);
    reference.textContent = `${json.votd.reference} (${json.votd.version_id})`;
    verse.innerHTML = json.votd.content;
    verseContainer.style.opacity = 1;
}

versionChanger.addEventListener('submit', (e) => {
    e.preventDefault();

    errorDiv.textContent = '';
    errorDiv.style.opacity = 0;
    errorDiv.style.display = 'none';
    addScript(versionInput.value);

})

init();