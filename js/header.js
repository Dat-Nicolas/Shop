const colorOptions = document.querySelectorAll('[data-color]');
const langOptions = document.querySelectorAll('[data-lang]');

defineColorChange();
function defineColorChange() {
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedColor = option.getAttribute('data-color');
            document.body.style.backgroundColor = selectedColor;
        });
    });
}

defineLanguageChange();
function defineLanguageChange() {
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            i18next.changeLanguage(selectedLang, () => {
                updateContent();
            });
        });
    });
}

function updateContent() {
    document.querySelector('#clothing a').textContent = i18next.t('clothing');
    document.querySelector('#accessories a').textContent = i18next.t('accessories');
    document.querySelector('#input').setAttribute('placeholder', i18next.t('searchPlaceholder'));
    document.querySelector('.manage a').setAttribute('title', i18next.t('manage'));
    document.querySelector('details summary:first-child').textContent = i18next.t('background');
    document.querySelector('details:nth-of-type(2) summary').textContent = i18next.t('language');

}

// Khởi tạo i18next
i18next.init({
    lng: 'vi',
    resources: {
        en: {
            translation: {
                clothing: 'Fashion',
                accessories: 'Accessories',
                searchPlaceholder: 'Enter to search',
                cart: 'Cart',
                manage: 'Manage',
                background: 'Background',
                language: 'Language'

            }
        },
        vi: {
            translation: {
                clothing: 'Thời trang',
                accessories: 'Phụ kiện',
                searchPlaceholder: 'Nhập để tìm kiếm',
                cart: 'Giỏ hàng',
                manage: 'Quản lý',
                background: 'Màu nền',
                language: 'Ngôn ngữ'
            }
        }
    }
}, () => {
    updateContent();
});
