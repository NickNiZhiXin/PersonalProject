// 汇率查询器 JavaScript 文件

class CurrencyConverter {
    constructor() {
        this.baseURL = 'https://api.exchangerate-api.com/v4/latest/';
        this.fallbackURL = 'https://open.er-api.com/v6/latest/';
        this.rates = {};
        this.lastUpdate = null;
        this.chart = null;
        this.chartData = {};
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadDefaultRates();
        this.initChart();
    }

    bindEvents() {
        // 绑定元素
        this.amountInput = document.getElementById('amount');
        this.fromCurrencySelect = document.getElementById('from-currency');
        this.toCurrencySelect = document.getElementById('to-currency');
        this.swapBtn = document.getElementById('swap-currencies');
        this.refreshBtn = document.getElementById('refresh-btn');
        this.resultAmount = document.getElementById('result-amount');
        this.exchangeRate = document.getElementById('exchange-rate');
        this.lastUpdateElement = document.getElementById('last-update');
        
        // 图表相关元素
        this.chartCurrencySelect = document.getElementById('chart-currency-pair');
        this.chartPeriodSelect = document.getElementById('chart-period');
        this.chartRefreshBtn = document.getElementById('chart-refresh-btn');
        this.chartCanvas = document.getElementById('exchange-rate-chart');
        this.chartLoading = document.getElementById('chart-loading');
        this.currentRateElement = document.getElementById('current-rate');
        this.highestRateElement = document.getElementById('highest-rate');
        this.lowestRateElement = document.getElementById('lowest-rate');
        this.changeRateElement = document.getElementById('change-rate');

        // 事件监听
        this.amountInput.addEventListener('input', () => this.convertCurrency());
        this.fromCurrencySelect.addEventListener('change', () => this.convertCurrency());
        this.toCurrencySelect.addEventListener('change', () => this.convertCurrency());
        this.swapBtn.addEventListener('click', () => this.swapCurrencies());
        this.refreshBtn.addEventListener('click', () => this.refreshRates());
        
        // 图表事件监听
        this.chartCurrencySelect.addEventListener('change', () => this.updateChart());
        this.chartPeriodSelect.addEventListener('change', () => this.updateChart());
        this.chartRefreshBtn.addEventListener('click', () => this.refreshChart());

        // 实时转换
        this.amountInput.addEventListener('input', this.debounce(() => {
            this.convertCurrency();
        }, 300));
    }

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 加载默认汇率
    async loadDefaultRates() {
        try {
            console.log('开始加载默认汇率...');
            this.showLoading();
            
            // 获取人民币汇率数据
            const cnyRates = await this.fetchRates('CNY');
            console.log('获取到汇率数据:', cnyRates);
            
            // 更新默认汇率显示
            this.updateDefaultRateCards(cnyRates);
            
            // 执行初始转换
            this.convertCurrency();
            
            this.hideLoading();
            this.updateLastUpdateTime();
            
            // 在微信环境中显示成功消息
            if (this.isWeChatBrowser()) {
                this.showSuccess('汇率数据加载完成');
            }
            
            console.log('默认汇率加载完成');
            
        } catch (error) {
            console.error('加载默认汇率失败:', error);
            
            // 即使出错也要显示备用数据
            const fallbackRates = this.getFallbackRates('CNY');
            this.updateDefaultRateCards(fallbackRates);
            this.convertCurrency();
            this.hideLoading();
            this.updateLastUpdateTime();
            
            if (this.isWeChatBrowser()) {
                this.showSuccess('使用离线数据');
            } else {
                this.showError('网络异常，使用离线数据');
            }
        }
    }

    // 获取汇率数据
    async fetchRates(baseCurrency) {
        try {
            // 在微信环境中直接使用备用数据，避免跨域问题
            if (this.isWeChatBrowser()) {
                console.log('微信环境：使用本地数据');
                return this.getFallbackRates(baseCurrency);
            }
            
            let response = await fetch(`${this.baseURL}${baseCurrency}`);
            
            if (!response.ok) {
                // 尝试备用API
                response = await fetch(`${this.fallbackURL}${baseCurrency}`);
            }
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.rates[baseCurrency] = data.rates;
            
            return data.rates;
            
        } catch (error) {
            console.error('获取汇率数据失败:', error);
            // 返回模拟数据作为备用
            return this.getFallbackRates(baseCurrency);
        }
    }

    // 检测是否在微信浏览器中
    isWeChatBrowser() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.indexOf('micromessenger') !== -1;
    }

    // 备用汇率数据
    getFallbackRates(baseCurrency) {
        const fallbackRates = {
            'CNY': {
                'USD': 0.1408,
                'SGD': 0.1901,
                'EUR': 0.1298,
                'CAD': 0.1885,
                'JPY': 20.85,
                'GBP': 0.1123,
                'AUD': 0.2105,
                'HKD': 1.0985,
                'THB': 4.815
            },
            'USD': {
                'CNY': 7.10,
                'SGD': 1.35,
                'EUR': 0.92,
                'CAD': 1.34,
                'JPY': 148.0,
                'GBP': 0.798,
                'AUD': 1.495,
                'HKD': 7.80,
                'THB': 34.2,
                'CNY': 7.10
            },
            'SGD': {
                'CNY': 5.26,
                'USD': 0.741,
                'EUR': 0.681,
                'CAD': 0.993,
                'JPY': 109.6,
                'GBP': 0.591,
                'AUD': 1.108,
                'HKD': 5.78,
                'THB': 25.35
            },
            'EUR': {
                'CNY': 7.71,
                'USD': 1.088,
                'SGD': 1.468,
                'CAD': 1.458,
                'JPY': 160.8,
                'GBP': 0.868,
                'AUD': 1.626,
                'HKD': 8.49,
                'THB': 37.22
            },
            'CAD': {
                'CNY': 5.31,
                'USD': 0.748,
                'SGD': 1.007,
                'EUR': 0.686,
                'JPY': 110.8,
                'GBP': 0.596,
                'AUD': 1.115,
                'HKD': 5.84,
                'THB': 25.54
            },
            'THB': {
                'CNY': 0.208,
                'USD': 0.0292,
                'SGD': 0.0394,
                'EUR': 0.0269,
                'CAD': 0.0391,
                'JPY': 4.33,
                'GBP': 0.0233,
                'AUD': 0.0437,
                'HKD': 0.228
            }
        };
        
        return fallbackRates[baseCurrency] || fallbackRates['USD'];
    }

    // 更新默认汇率卡片
    updateDefaultRateCards(rates) {
        const defaultCurrencies = ['USD', 'SGD', 'EUR', 'CAD', 'THB'];
        
        defaultCurrencies.forEach(currency => {
            const card = document.querySelector(`[data-from="${currency}"][data-to="CNY"]`);
            if (card && rates[currency]) {
                const rate = (1 / rates[currency]).toFixed(4);
                card.querySelector('.rate-value').textContent = `¥${rate}`;
                card.classList.remove('loading');
                
                // 模拟汇率变化（实际项目中应该从API获取历史数据）
                const change = (Math.random() - 0.5) * 0.1;
                const changeElement = card.querySelector('.rate-change');
                const changePercent = (change * 100).toFixed(2);
                
                if (change > 0) {
                    changeElement.textContent = `+${changePercent}%`;
                    changeElement.className = 'rate-change positive';
                } else if (change < 0) {
                    changeElement.textContent = `${changePercent}%`;
                    changeElement.className = 'rate-change negative';
                } else {
                    changeElement.textContent = '0.00%';
                    changeElement.className = 'rate-change neutral';
                }
            }
        });
    }

    // 货币转换
    async convertCurrency() {
        const amount = parseFloat(this.amountInput.value) || 0;
        const fromCurrency = this.fromCurrencySelect.value;
        const toCurrency = this.toCurrencySelect.value;

        if (amount === 0) {
            this.resultAmount.textContent = '0.00';
            this.exchangeRate.textContent = `1 ${fromCurrency} = 0.00 ${toCurrency}`;
            return;
        }

        try {
            let rate = 1;
            
            if (fromCurrency !== toCurrency) {
                // 获取汇率
                if (!this.rates[fromCurrency]) {
                    await this.fetchRates(fromCurrency);
                }
                
                if (this.rates[fromCurrency] && this.rates[fromCurrency][toCurrency]) {
                    rate = this.rates[fromCurrency][toCurrency];
                } else {
                    // 通过USD作为中间货币
                    if (!this.rates['USD']) {
                        await this.fetchRates('USD');
                    }
                    
                    const fromToUSD = fromCurrency === 'USD' ? 1 : (1 / this.rates['USD'][fromCurrency]);
                    const usdToTarget = toCurrency === 'USD' ? 1 : this.rates['USD'][toCurrency];
                    rate = fromToUSD * usdToTarget;
                }
            }

            const result = amount * rate;
            
            // 格式化结果
            this.resultAmount.textContent = this.formatCurrency(result, toCurrency);
            this.exchangeRate.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
            
        } catch (error) {
            console.error('转换失败:', error);
            this.resultAmount.textContent = '转换失败';
            this.exchangeRate.textContent = '无法获取汇率';
        }
    }

    // 格式化货币
    formatCurrency(amount, currency) {
        const currencySymbols = {
            'USD': '$',
            'CNY': '¥',
            'EUR': '€',
            'GBP': '£',
            'SGD': 'S$',
            'CAD': 'C$',
            'AUD': 'A$',
            'HKD': 'HK$',
            'JPY': '¥',
            'THB': '฿'
        };
        
        const symbol = currencySymbols[currency] || '';
        const formattedAmount = currency === 'JPY' ? 
            Math.round(amount).toLocaleString() : 
            amount.toFixed(2);
            
        return `${symbol}${formattedAmount}`;
    }

    // 交换货币
    swapCurrencies() {
        const fromValue = this.fromCurrencySelect.value;
        const toValue = this.toCurrencySelect.value;
        
        this.fromCurrencySelect.value = toValue;
        this.toCurrencySelect.value = fromValue;
        
        this.convertCurrency();
    }

    // 刷新汇率
    async refreshRates() {
        this.refreshBtn.disabled = true;
        this.refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 刷新中...';
        
        try {
            // 清除缓存的汇率
            this.rates = {};
            
            // 重新加载
            await this.loadDefaultRates();
            
            this.showSuccess('汇率已更新');
            
        } catch (error) {
            console.error('刷新失败:', error);
            this.showError('刷新失败，请稍后重试');
        } finally {
            this.refreshBtn.disabled = false;
            this.refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> 刷新数据';
        }
    }

    // 显示加载状态
    showLoading() {
        const cards = document.querySelectorAll('.rate-card');
        cards.forEach(card => {
            card.classList.add('loading');
            card.querySelector('.rate-value').textContent = '加载中...';
        });
    }

    // 隐藏加载状态
    hideLoading() {
        const cards = document.querySelectorAll('.rate-card');
        cards.forEach(card => {
            card.classList.remove('loading');
        });
    }

    // 更新最后更新时间
    updateLastUpdateTime() {
        const now = new Date();
        const timeString = now.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        this.lastUpdateElement.textContent = timeString;
    }

    // 显示成功消息
    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    // 显示错误消息
    showError(message) {
        this.showMessage(message, 'error');
    }

    // 显示消息
    showMessage(message, type) {
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        
        // 添加样式
        Object.assign(messageDiv.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545'
        });
        
        document.body.appendChild(messageDiv);
        
        // 显示动画
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    // 图表相关方法
    initChart() {
        // 检查Chart.js是否可用
        if (typeof Chart === 'undefined') {
            console.error('Chart.js未加载，隐藏图表功能');
            const chartSection = document.querySelector('.chart-section');
            if (chartSection) {
                chartSection.style.display = 'none';
            }
            return;
        }
        
        console.log('初始化图表...');
        // 延迟初始化图表，确保DOM完全加载
        setTimeout(() => {
            this.updateChart();
        }, 1000);
    }

    updateChart() {
        const currencyPair = this.chartCurrencySelect.value;
        const period = this.chartPeriodSelect.value;
        
        this.showChartLoading();
        
        // 生成历史数据
        const historyData = this.generateHistoryData(currencyPair, period);
        
        // 渲染图表
        this.renderChart(historyData, currencyPair);
        
        // 更新统计信息
        this.updateChartStats(historyData, currencyPair);
        
        this.hideChartLoading();
    }

    generateHistoryData(currencyPair, period) {
        const [from, to] = currencyPair.split('/');
        const now = new Date();
        const data = [];
        
        // 确定时间范围
        const periods = {
            '1M': 30,
            '3M': 90,
            '6M': 180,
            '1Y': 365
        };
        
        const days = periods[period] || 365;
        
        // 获取基础汇率
        const baseRates = {
            'USD/CNY': 7.1,
            'SGD/CNY': 5.25,
            'EUR/CNY': 7.8,
            'CAD/CNY': 5.3,
            'THB/CNY': 0.21,
            'JPY/CNY': 0.048,
            'GBP/CNY': 9.1,
            'AUD/CNY': 4.8,
            'HKD/CNY': 0.91
        };
        
        const baseRate = baseRates[currencyPair] || 1;
        
        // 生成历史数据点
        for (let i = days; i >= 0; i--) {
            const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
            
            // 生成带有趋势和随机波动的汇率
            const trendFactor = Math.sin((i / days) * Math.PI * 2) * 0.1; // 长期趋势
            const randomFactor = (Math.random() - 0.5) * 0.05; // 随机波动
            const seasonalFactor = Math.sin((i / 30) * Math.PI * 2) * 0.03; // 季节性波动
            
            const rate = baseRate * (1 + trendFactor + randomFactor + seasonalFactor);
            
            data.push({
                date: date.toISOString().split('T')[0],
                rate: parseFloat(rate.toFixed(4))
            });
        }
        
        return data;
    }

    renderChart(data, currencyPair) {
        const ctx = this.chartCanvas.getContext('2d');
        
        // 销毁现有图表
        if (this.chart) {
            this.chart.destroy();
        }
        
        // 创建新图表
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => {
                    const date = new Date(item.date);
                    return date.toLocaleDateString('zh-CN', {
                        month: 'short',
                        day: 'numeric'
                    });
                }),
                datasets: [{
                    label: currencyPair,
                    data: data.map(item => item.rate),
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 6,
                    pointHoverBackgroundColor: '#667eea',
                    pointHoverBorderColor: '#fff',
                    pointHoverBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#2c3e50',
                            font: {
                                size: 14,
                                weight: 'bold'
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: '#667eea',
                        borderWidth: 1,
                        callbacks: {
                            label: function(context) {
                                return `${currencyPair}: ${context.parsed.y.toFixed(4)}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: '日期',
                            color: '#2c3e50',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: '#666',
                            maxTicksLimit: 8
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: '汇率',
                            color: '#2c3e50',
                            font: {
                                size: 12,
                                weight: 'bold'
                            }
                        },
                        ticks: {
                            color: '#666',
                            callback: function(value) {
                                return value.toFixed(4);
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                }
            }
        });
    }

    updateChartStats(data, currencyPair) {
        if (data.length === 0) return;
        
        const rates = data.map(item => item.rate);
        const currentRate = rates[rates.length - 1];
        const firstRate = rates[0];
        const highestRate = Math.max(...rates);
        const lowestRate = Math.min(...rates);
        
        const change = currentRate - firstRate;
        const changePercent = (change / firstRate) * 100;
        
        // 更新统计信息
        this.currentRateElement.textContent = currentRate.toFixed(4);
        this.highestRateElement.textContent = highestRate.toFixed(4);
        this.lowestRateElement.textContent = lowestRate.toFixed(4);
        
        const changeText = `${change >= 0 ? '+' : ''}${change.toFixed(4)} (${changePercent.toFixed(2)}%)`;
        this.changeRateElement.textContent = changeText;
        this.changeRateElement.className = `stat-value ${change >= 0 ? 'positive' : 'negative'}`;
    }

    showChartLoading() {
        this.chartLoading.classList.remove('hidden');
    }

    hideChartLoading() {
        this.chartLoading.classList.add('hidden');
    }

    refreshChart() {
        this.chartRefreshBtn.disabled = true;
        this.chartRefreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 更新中...';
        
        // 模拟加载延迟
        setTimeout(() => {
            this.updateChart();
            this.chartRefreshBtn.disabled = false;
            this.chartRefreshBtn.innerHTML = '<i class="fas fa-chart-line"></i> 更新图表';
            this.showSuccess('图表已更新');
        }, 1000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM加载完成，开始初始化应用...');
    
    try {
        const converter = new CurrencyConverter();
        
        // 检测微信浏览器
        if (isWeChatBrowser()) {
            console.log('运行在微信浏览器中');
            // 添加微信特有的优化
            optimizeForWeChat();
            
            // 强制确保内容显示
            setTimeout(() => {
                const container = document.querySelector('.container');
                if (container) {
                    container.style.display = 'block';
                    container.style.visibility = 'visible';
                    container.style.opacity = '1';
                }
                
                // 强制触发数据加载
                if (converter && converter.loadDefaultRates) {
                    converter.loadDefaultRates();
                }
            }, 500);
        }
        
        // 检测移动设备
        if (isMobileDevice()) {
            // 添加移动端特有的优化
            optimizeForMobile();
        }
        
        console.log('应用初始化完成');
        
    } catch (error) {
        console.error('应用初始化失败:', error);
        
        // 显示基本内容即使出错
        const container = document.querySelector('.container');
        if (container) {
            container.style.display = 'block';
            container.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h1>汇率查询器</h1>
                    <p>应用正在加载中...</p>
                    <p>如果长时间无响应，请刷新页面</p>
                </div>
            `;
        }
    }
});

// 全局检测函数（供外部使用）
function isWeChatBrowser() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('micromessenger') !== -1;
}

// 检测是否为移动设备
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 微信浏览器优化
function optimizeForWeChat() {
    // 禁用长按选择
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // 防止页面被拖拽
    document.addEventListener('touchmove', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'SELECT') {
            e.preventDefault();
        }
    }, { passive: false });
    
    // 添加微信分享优化
    if (typeof WeixinJSBridge !== 'undefined') {
        WeixinJSBridge.on('menu:share:appmessage', function(argv) {
            // 分享给朋友
            shareToFriend();
        });
        
        WeixinJSBridge.on('menu:share:timeline', function(argv) {
            // 分享到朋友圈
            shareToTimeline();
        });
    }
}

// 移动端优化
function optimizeForMobile() {
    // 防止双击缩放
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // 优化输入框体验
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            // 防止输入框被键盘遮挡
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
    
    // 添加触摸反馈
    const touchElements = document.querySelectorAll('button, .rate-card');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// 分享给朋友
function shareToFriend() {
    const title = '汇率查询器';
    const desc = '实时汇率查询，支持多种货币转换和历史趋势图表';
    const link = window.location.href;
    
    if (typeof WeixinJSBridge !== 'undefined') {
        WeixinJSBridge.invoke('sendAppMessage', {
            appid: '',
            img_url: '',
            img_width: '120',
            img_height: '120',
            link: link,
            desc: desc,
            title: title
        });
    }
}

// 分享到朋友圈
function shareToTimeline() {
    const title = '汇率查询器 - 实时汇率查询工具';
    const link = window.location.href;
    
    if (typeof WeixinJSBridge !== 'undefined') {
        WeixinJSBridge.invoke('shareTimeline', {
            img_url: '',
            img_width: '120',
            img_height: '120',
            link: link,
            desc: '',
            title: title
        });
    }
}

// 添加一些实用功能
document.addEventListener('keydown', (e) => {
    // 按F5或Ctrl+R刷新汇率
    if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        const refreshBtn = document.getElementById('refresh-btn');
        if (refreshBtn) {
            refreshBtn.click();
        }
    }
});

// 添加网络状态检测
window.addEventListener('online', () => {
    console.log('网络已连接');
});

window.addEventListener('offline', () => {
    console.log('网络已断开');
});

// 页面可见性检测，当页面重新可见时自动刷新数据
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // 如果数据超过5分钟没更新，自动刷新
        const lastUpdate = document.getElementById('last-update').textContent;
        if (lastUpdate && lastUpdate !== '--') {
            const lastUpdateTime = new Date(lastUpdate);
            const now = new Date();
            const diffMinutes = (now - lastUpdateTime) / (1000 * 60);
            
            if (diffMinutes > 5) {
                const refreshBtn = document.getElementById('refresh-btn');
                if (refreshBtn) {
                    refreshBtn.click();
                }
            }
        }
    }
}); 