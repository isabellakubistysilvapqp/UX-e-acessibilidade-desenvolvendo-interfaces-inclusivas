const increaseTextButton = document.getElementById('increaseText');
const decreaseTextButton = document.getElementById('decreaseText');
const toggleContrastButton = document.getElementById('toggleContrast');
const liveRegion = document.getElementById('liveRegion');

const MIN_SCALE = 0.9;
const MAX_SCALE = 1.4;
const STEP = 0.1;

function updateLiveRegion(message) {
    liveRegion.textContent = message;
}

function getCurrentFontScale() {
    return Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale')) || 1;
}

function setFontScale(scale) {
    const normalized = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
    document.documentElement.style.setProperty('--font-scale', normalized.toFixed(2));
    updateLiveRegion(`Tamanho do texto ajustado para ${Math.round(normalized * 100)}%`);
}

function setContrastMode(active) {
    document.body.classList.toggle('high-contrast', active);
    toggleContrastButton.setAttribute('aria-pressed', active ? 'true' : 'false');
    toggleContrastButton.textContent = active ? 'Desativar contraste alto' : 'Ativar contraste alto';
    updateLiveRegion(active ? 'Alto contraste ativado' : 'Alto contraste desativado');
}

increaseTextButton.addEventListener('click', () => {
    setFontScale(getCurrentFontScale() + STEP);
});

decreaseTextButton.addEventListener('click', () => {
    setFontScale(getCurrentFontScale() - STEP);
});

toggleContrastButton.addEventListener('click', () => {
    const active = document.body.classList.contains('high-contrast');
    setContrastMode(!active);
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.activeElement !== document.body) {
        document.activeElement.blur();
    }
});

setFontScale(1);
setContrastMode(false);
