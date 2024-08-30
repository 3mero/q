let currentPage;
let totalPages;
let startPage;
let startTime;

function updateTitle() {
    const titleInput = document.getElementById('title-input').value;
    const pageTitle = document.getElementById('page-title');
    pageTitle.textContent = titleInput ? titleInput : 'عرض صفحات القرآن';
}

function initializePages() {
    totalPages = parseInt(document.getElementById('page-count').value);
    startPage = parseInt(document.getElementById('start-page').value);
    currentPage = startPage;
    startTime = new Date();
    showCurrentPage();
    updatePagination();
}

function showCurrentPage() {
    const container = document.getElementById('quran-page-container');
    container.innerHTML = '';

    if (!totalPages || !startPage || isNaN(currentPage)) {
        return;
    }

    if (currentPage > startPage + totalPages - 1 || currentPage > 604) {
        container.innerHTML = '<p class="finished-text">تم الانتهاء من جميع الصفحات</p>';

        const backButton = document.createElement('button');
        backButton.className = 'read-button';
        backButton.textContent = 'العودة لأول صفحة';
        backButton.onclick = resetToFirstPage;

        const shareButton = document.createElement('button');
        shareButton.className = 'share-button';
        shareButton.textContent = 'مشاركة عبر الواتساب';
        shareButton.onclick = shareOnWhatsApp;

        container.appendChild(backButton);
        container.appendChild(shareButton);
        return;
    }

    const pageDiv = document.createElement('div');
    pageDiv.className = 'quran-page';

    const img = document.createElement('img');
    img.src = `https://3mero.github.io/q/Quran/${currentPage}.png`;
    img.alt = `صفحة ${currentPage}`;

    const button = document.createElement('button');
    button.className = 'read-button';
    button.textContent = 'تمت القراءة';
    button.onclick = nextPage;

    img.onerror = () => {
        img.alt = `تعذر تحميل صفحة ${currentPage}`;
    };

    pageDiv.appendChild(img);
    pageDiv.appendChild(button);
    container.appendChild(pageDiv);

    updatePagination();
}

function resetToFirstPage() {
    currentPage = startPage;
    showCurrentPage();
}

function nextPage() {
    currentPage++;
    showCurrentPage();
}

function goToPage(page) {
    currentPage = page;
    showCurrentPage();
}

function updatePagination() {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPageCount = Math.min(startPage + totalPages - 1, 604);
    
    for (let i = startPage; i <= totalPageCount; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.className = 'page-button';
        if (i === currentPage) {
            pageButton.classList.add('current-page');
        }
        if (i < currentPage) {
            pageButton.classList.add('read-page');
        }
        pageButton.onclick = () => goToPage(i);
        paginationContainer.appendChild(pageButton);
    }
}

function shareOnWhatsApp() {
    const endTime = new Date();
    const timeDiff = endTime - startTime;

    const currentDate = endTime.toLocaleDateString('en-GB');
    const currentTime = endTime.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const hijriDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(endTime);

    const message = encodeURIComponent(
`سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك، وأتوب إليك
تم بحمد الله وتوفيقه الانتهاء من قراءة القرآن الكريم من الصفحة ${startPage} الى الصفحة ${currentPage - 1}. التاريخ والوقت : ${currentDate} ${currentTime}`
    );

    window.open(`https://wa.me/?text=${message}`, '_blank');
}


function exportPage() {
    const title = document.getElementById('page-title').textContent;

    const exportContent = `
        <!DOCTYPE html>
        <html lang="ar">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body { font-family: Arial, sans-serif; direction: rtl; text-align: center; background-color: #f8f9fa; transition: background-color 0.3s; }
                h1 { font-size: 2em; margin: 20px 0; color: #006400; border: 2px solid #006400; padding: 10px; border-radius: 8px; display: inline-block; }
                .quran-page { margin-bottom: 20px; }
                .quran-page img { max-width: 100%; border: 1px solid #ddd; border-radius: 8px; padding: 5px; background-color: white; }
                .read-button { margin-top: 10px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 10px 20px; font-size: 1em; display: inline-block; }
                .read-button:hover { background-color: #218838; }
                .share-button { background-color: #25D366; color: white; border: none; border-radius: 5px; cursor: pointer; padding: 10px 20px; font-size: 1em; display: inline-block; margin-top: 20px; }
                .share-button:hover { background-color: #1ebd56; }
                #color-buttons { display: flex; justify-content: center; margin-top: 15px; }
                .color-option { width: 30px; height: 30px; border-radius: 50%; cursor: pointer; margin: 0 5px; transition: transform 0.3s; }
                .color-option:hover { transform: scale(1.1); }
                p.finished-text { color: #28a745; font-size: 1.2em; font-weight: bold; }
                #pagination { margin-top: 20px; }
                .page-button { margin: 0 5px; padding: 5px 10px; cursor: pointer; border: 1px solid #ddd; background-color: #f8f9fa; border-radius: 5px; }
                .page-button.current-page { background-color: #28a745; color: white; }
                .page-button.read-page { background-color: #007bff; color: white; }
            </style>
        </head>
        <body>
            <header>
                <h1>${title}</h1>
                <div id="color-buttons">
                    <div class="color-option" data-color="#1a1a1a" style="background-color: #1a1a1a;"></div>
                    <div class="color-option" data-color="#2c3e50" style="background-color: #2c3e50;"></div>
                    <div class="color-option" data-color="#34495e" style="background-color: #34495e;"></div>
                    <div class="color-option" data-color="#ffffff" style="background-color: #ffffff;"></div>
                </div>
            </header>
            <main id="quran-page-container">
                ${document.getElementById('quran-page-container').innerHTML}
            </main>
            <div id="pagination"></div>
            <script>
                let currentPage = ${startPage};
                let totalPages = ${totalPages};
                const startPage = ${startPage};
                const startTime = new Date();

                function resetToFirstPage() {
                    currentPage = startPage;
                    showCurrentPage();
                }

                function nextPage() {
                    currentPage++;
                    showCurrentPage();
                }

                function goToPage(page) {
                    currentPage = page;
                    showCurrentPage();
                }

                function shareOnWhatsApp() {
                    const endTime = new Date();
                    const timeDiff = endTime - startTime;

                    const currentDate = endTime.toLocaleDateString('en-GB');
                    const currentTime = endTime.toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });

                    const hijriDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', {
                        day: 'numeric',
                        month: 'numeric',
                        year: 'numeric'
                    }).format(endTime);

                    const message = encodeURIComponent(
                        \`سبحانك اللهم وبحمدك، أشهد أن لا إله إلا أنت، أستغفرك، وأتوب إليك...تم بحمد الله وتوفيقه الانتهاء من قراءة القران من الصفحة \${startPage} الى الصفحة \${currentPage - 1}. التاريخ : \${currentDate} \${currentTime}\`
                    );

                    window.open(\`https://wa.me/?text=\${message}\`, '_blank');
                }

                function showCurrentPage() {
                    const container = document.getElementById('quran-page-container');
                    container.innerHTML = '';

                    if (currentPage > startPage + totalPages - 1 || currentPage > 604) {
                        container.innerHTML = '<p class="finished-text">تم الانتهاء من جميع الصفحات</p>';

                        const backButton = document.createElement('button');
                        backButton.className = 'read-button';
                        backButton.textContent = 'العودة لأول صفحة';
                        backButton.onclick = resetToFirstPage;

                        const shareButton = document.createElement('button');
                        shareButton.className = 'share-button';
                        shareButton.textContent = 'مشاركة عبر الواتساب';
                        shareButton.onclick = shareOnWhatsApp;

                        container.appendChild(backButton);
                        container.appendChild(shareButton);
                        return;
                    }

                    const pageDiv = document.createElement('div');
                    pageDiv.className = 'quran-page';

                    const img = document.createElement('img');
                    img.src = \`https://3mero.github.io/q/Quran/\${currentPage}.png\`;
                    img.alt = \`صفحة \${currentPage}\`;

                    const button = document.createElement('button');
                    button.className = 'read-button';
                    button.textContent = 'تمت القراءة';
                    button.onclick = nextPage;

                    img.onerror = () => {
                        img.alt = \`تعذر تحميل صفحة \${currentPage}\`;
                    };

                    pageDiv.appendChild(img);
                    pageDiv.appendChild(button);
                    container.appendChild(pageDiv);

                    updatePagination();
                }

                function updatePagination() {
                    const paginationContainer = document.getElementById('pagination');
                    paginationContainer.innerHTML = '';

                    const totalPageCount = Math.min(startPage + totalPages - 1, 604);
                    
                    for (let i = startPage; i <= totalPageCount; i++) {
                        const pageButton = document.createElement('button');
                        pageButton.textContent = i;
                        pageButton.className = 'page-button';
                        if (i === currentPage) {
                            pageButton.classList.add('current-page');
                        }
                        if (i < currentPage) {
                            pageButton.classList.add('read-page');
                        }
                        pageButton.onclick = () => goToPage(i);
                        paginationContainer.appendChild(pageButton);
                    }
                }

                document.querySelectorAll('.color-option').forEach(option => {
                    option.addEventListener('click', function() {
                        document.body.style.backgroundColor = this.dataset.color;
                    });
                });

                showCurrentPage();
            </script>
        </body>
        </html>
    `;

    const blob = new Blob([exportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.html`;
    link.click();
    URL.revokeObjectURL(url);
}

document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
        document.body.style.backgroundColor = this.dataset.color;
    });
});

showCurrentPage();