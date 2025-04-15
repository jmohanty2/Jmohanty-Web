const quoteEl   = document.getElementById('quote');
const authorEl  = document.getElementById('author');
const loadingEl = document.getElementById('loading');
const newBtn    = document.getElementById('new-quote');
const tweetBtn  = document.getElementById('tweet-quote');

newBtn.onclick   = getQuote;
tweetBtn.onclick = tweetQuote;

// Fetch a quote from Quotable API
async function getQuote() {
    loadingEl.style.display = 'block';
    quoteEl.textContent = '';
    authorEl.textContent = '';

    try 
    {
        const res = await fetch('https://api.quotable.io/random');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        quoteEl.textContent  = `"${data.content}"`;
        authorEl.textContent = `— ${data.author}`;
    } 
    
    catch (err) 
    {
        quoteEl.textContent  = 'Could not load quote.';
        authorEl.textContent = '';
    } 
    
    finally 
    {
        loadingEl.style.display = 'none';
    }
}

// Open Twitter intent with current quote
function tweetQuote() {
  const text = `${quoteEl.textContent} ${authorEl.textContent}`;
  const url  = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// Initial load
getQuote();
