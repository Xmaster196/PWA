document.addEventListener('DOMContentLoaded', function () {

    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const target = this.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiResult = document.getElementById('bmi-result');
    const bmiHint = document.getElementById('bmi-hint');
    const calcBmiBtn = document.getElementById('calc-bmi');

    calcBmiBtn.addEventListener('click', function () {
        const h = parseFloat(heightInput.value) / 100;
        const w = parseFloat(weightInput.value);

        if (!h || !w || h <= 0 || w <= 0) {
            bmiResult.value = '—';
            bmiHint.textContent = 'Введите корректные рост и вес';
            bmiHint.className = 'hint invalid';
            return;
        }

        const imt = w / (h * h);
        bmiResult.value = imt.toFixed(2);

        let text = '';
        let cls = 'hint ';
        if (imt < 18.5) {
            text = 'Недостаточный вес';
            cls += 'invalid';
        } else if (imt < 25) {
            text = 'Норма ✓';
            cls += 'valid';
        } else if (imt < 30) {
            text = 'Избыточный вес';
            cls += 'invalid';
        } else {
            text = 'Ожирение';
            cls += 'invalid';
        }
        bmiHint.textContent = text;
        bmiHint.className = cls;
    });

        const sideA = document.getElementById('side-a');
    const sideB = document.getElementById('side-b');
    const sideC = document.getElementById('side-c');
    const triResult = document.getElementById('tri-result');
    const triHint = document.getElementById('tri-hint');
    const calcTriBtn = document.getElementById('calc-tri');

    calcTriBtn.addEventListener('click', function () {
        const a = parseFloat(sideA.value);
        const b = parseFloat(sideB.value);
        const c = parseFloat(sideC.value);

        if (!a || !b || !c || a <= 0 || b <= 0 || c <= 0) {
            triResult.value = '—';
            triHint.textContent = 'Введите все три стороны';
            triHint.className = 'hint invalid';
            return;
        }
        
        if (a + b <= c || a + c <= b || b + c <= a) {
            triResult.value = '—';
            triHint.textContent = 'Такого треугольника не существует';
            triHint.className = 'hint invalid';
            return;
        }

        const p = (a + b + c) / 2;
        const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
        triResult.value = area.toFixed(2);
        triHint.textContent = 'Площадь по формуле Герона';
        triHint.className = 'hint valid';
    });

        
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
                navigator.serviceWorker.register('service-worker.js') 
                .then(reg => console.log('SW registered', reg))
                .catch(err => console.log('SW failed', err));
        });
    }
});