const digitEntryArea = document.getElementById('digit-entry-area');
const resetButton = document.getElementById('reset-button');
const completionMessage = document.getElementById('completion-message');
const submitButton = document.getElementById('submit-button');
const enteredDigits = Array(10).fill('');
const numberOfDigits = 10;

const backgroundDotsContainer = document.createElement('div');
backgroundDotsContainer.classList.add('background-dots');
document.body.appendChild(backgroundDotsContainer);

function createFloatingDot() 
{
    const dot = document.createElement('div');
    dot.classList.add('dot');

    const size = Math.random() * 10 + 5;
    const startX = Math.random() * 100 - 50 + 'vw';
    const startY = Math.random() * 100 - 50 + 'vh';
    const endX = Math.random() * 200 - 100 + 'vw';
    const endY = Math.random() * 200 - 100 + 'vh';
    const duration = Math.random() * 5 + 3 + 's';

    dot.style.setProperty('--size', `${size}px`);
    dot.style.setProperty('--startX', startX);
    dot.style.setProperty('--startY', startY);
    dot.style.setProperty('--endX', endX);
    dot.style.setProperty('--endY', endY);
    dot.style.setProperty('--duration', duration);
    dot.style.left = Math.random() * 100 + 'vw';
    dot.style.top = Math.random() * 100 + 'vh';

    backgroundDotsContainer.appendChild(dot);

    setTimeout(() => 
    {
        dot.remove();
    }, parseFloat(duration) * 1000 * 1.1);

    setTimeout(createFloatingDot, Math.random() * 1000);
}

for (let i = 0; i < 15; i++) 
    {
    setTimeout(createFloatingDot, Math.random() * 2000);
}

function createDigitInputs() 
{
    digitEntryArea.innerHTML = '';
    for (let i = 0; i < numberOfDigits; i++) 
        {
        const digitContainer = document.createElement('div');
        digitContainer.classList.add('digit-selector');
        
        const label = document.createElement('label');
        label.classList.add('digit-label');
        label.textContent = `Digit ${i + 1}:`;

        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('digit-input');
        input.min = '0';
        input.max = '9';
        input.maxLength = '1';
        input.addEventListener('focus', () =>
        {
            input.style.transform = `translate(${Math.random() * 5 - 2.5}px, ${Math.random() * 5 - 2.5}px) rotate(${Math.random() * 10 - 5}deg)`;
            setTimeout(() => 
            {
                input.style.transform = '';
            }, 200);
        });

        input.addEventListener('input', (event) => 
        {
            const index = Array.from(digitEntryArea.children).indexOf(digitContainer);

            if (event.target.value.length > 1) 
            {
                event.target.value = event.target.value.slice(0, 1);
            }

            enteredDigits[index] = event.target.value;
            updateSubmitButtonVisibility();
        });

        digitContainer.appendChild(label);
        digitContainer.appendChild(input);
        digitEntryArea.appendChild(digitContainer);
    }
}

function updateSubmitButtonVisibility() {
    if (enteredDigits.every(digit => /^[0-9]$/.test(digit))) 
    {
        completionMessage.classList.remove('hidden');
        submitButton.classList.remove('hidden');
    } 
    
    else 
    {
        completionMessage.classList.add('hidden');
        submitButton.classList.add('hidden');
    }
}

let randomFocusInterval;

function startRandomFocus() 
{
    randomFocusInterval = setInterval(() => 
    {
        const inputs = digitEntryArea.querySelectorAll('.digit-input');
        if (inputs.length > 0) 
        {
            const randomIndex = Math.floor(Math.random() * inputs.length);
            inputs[randomIndex].focus();
        }
    }, 500);
}

function stopRandomFocus() 
{
    clearInterval(randomFocusInterval);
}

function formatPhoneNumber(digits) 
{
    if (digits.length === 10 && digits.every(digit => /^[0-9]$/.test(digit))) 
    {
        return `(${digits.slice(0, 3).join('')}) ${digits.slice(3, 6).join('')}-${digits.slice(6).join('')}`;
    } 
    
    else 
    {
        return "Please enter all 10 digits.";
    }
}

createDigitInputs();
startRandomFocus();
updateSubmitButtonVisibility();

resetButton.addEventListener('click', () => 
{
    enteredDigits.fill('');
    completionMessage.classList.add('hidden');
    submitButton.classList.add('hidden');
    stopRandomFocus();
    createDigitInputs();
    startRandomFocus();
});

submitButton.addEventListener('click', () => 
{
    const formattedNumber = formatPhoneNumber(enteredDigits);
    alert(`You bravely entered: ${formattedNumber}`);
});