document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#converter-form');
    const resultDiv = document.querySelector('#result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const fromCurrency = document.querySelector('#from-currency').value.trim().toUpperCase();
        const toCurrency = document.querySelector('#to-currency').value.trim().toUpperCase();

        if (!fromCurrency || !toCurrency) {
            resultDiv.textContent = 'Please enter both currency codes!';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Invalid currency code or network issue');
                }
                return response.json();
            })
            .then(data => {
                const rate = data.rates[toCurrency];
                if (!rate) {
                    resultDiv.textContent = 'Invalid target currency!';
                    return;
                }

                resultDiv.innerHTML = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
            })
            .catch(error => {
                resultDiv.textContent = 'Error: ' + error.message;
                console.error('Fetch error:', error);
            });
    });
});
