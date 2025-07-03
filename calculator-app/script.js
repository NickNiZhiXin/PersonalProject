class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('不能除以零！');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }
        
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('zh-CN', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand) || '0';
        
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = '';
        }
    }
}

// 获取DOM元素
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-clear]');
const previousOperandElement = document.querySelector('#previous-operand');
const currentOperandElement = document.querySelector('#current-operand');

// 创建计算器实例
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// 添加事件监听器
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// 键盘支持
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // 数字键
    if (!isNaN(key) && key !== ' ') {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    
    // 小数点
    if (key === '.') {
        calculator.appendNumber(key);
        calculator.updateDisplay();
    }
    
    // 运算符
    switch (key) {
        case '+':
            calculator.chooseOperation('+');
            calculator.updateDisplay();
            break;
        case '-':
            calculator.chooseOperation('-');
            calculator.updateDisplay();
            break;
        case '*':
            calculator.chooseOperation('×');
            calculator.updateDisplay();
            break;
        case '/':
            event.preventDefault(); // 防止浏览器快速查找
            calculator.chooseOperation('÷');
            calculator.updateDisplay();
            break;
        case '%':
            calculator.chooseOperation('%');
            calculator.updateDisplay();
            break;
        case 'Enter':
        case '=':
            calculator.compute();
            calculator.updateDisplay();
            break;
        case 'Escape':
        case 'c':
        case 'C':
            calculator.clear();
            calculator.updateDisplay();
            break;
        case 'Backspace':
            calculator.delete();
            calculator.updateDisplay();
            break;
    }
});

// 初始化显示
calculator.updateDisplay();

// 为所有按钮添加点击反馈
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);
    });
});

// 防止双击选中文本
document.addEventListener('selectstart', (e) => {
    if (e.target.classList.contains('btn')) {
        e.preventDefault();
    }
});
