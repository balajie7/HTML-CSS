document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    let currentInput = '';
    let result = '';

    function updateDisplay(value) {
        display.textContent = value || '0';
    }

    function handleInput(value) {
        if (value === '=') {
            try {
                result = eval(currentInput); 
                updateDisplay(result);
                currentInput = result;
            } catch {
                updateDisplay('Error');
            }
        } else if (value === 'C') {
            currentInput = '';
            updateDisplay('0');
        } else {
            currentInput += value;
            updateDisplay(currentInput);
        }
    }

    function handleKeyPress(event) {
        const key = event.key;
        if (/[0-9+\-*/.%]/.test(key)) {
            handleInput(key);
        } else {
            alert('Only numbers and basic operators are allowed');
        }
    }

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', function () {
            const action = this.dataset.action;
            const value = this.dataset.value;

            if (action === 'append') {
                handleInput(value);
            } else if (action === 'compute') {
                handleInput('=');
            } else if (action === 'clear') {
                handleInput('C');
            }
        });
    });

    document.addEventListener('keydown', handleKeyPress);
});