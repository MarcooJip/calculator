// Mendapatkan elemen layar display dari HTML
const display = document.getElementById('display');

/**
 * Menambahkan nilai (angka atau operator) ke layar.
 * @param {string} value - Karakter yang akan ditambahkan ke layar.
 */
function appendToDisplay(value) {
    // Mencegah beberapa titik desimal dalam satu angka
    const lastChar = display.value.slice(-1);
    if (value === '.' && display.value.includes('.') && !'+-*/%'.includes(lastChar)) {
       // Cari operator terakhir untuk memastikan titik tidak ada di angka saat ini
       const operators = ['+', '-', '*', '/', '%'];
       let lastOperatorIndex = -1;
       operators.forEach(op => {
           lastOperatorIndex = Math.max(lastOperatorIndex, display.value.lastIndexOf(op));
       });
       if (!display.value.substring(lastOperatorIndex).includes('.')) {
            display.value += value;
       }
    } else {
        display.value += value;
    }
}


/**
 * Menghapus seluruh isi layar (fungsi untuk tombol AC).
 */
function clearDisplay() {
    display.value = '';
}

/**
 * Menghapus karakter terakhir dari layar (fungsi untuk tombol DEL).
 */
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

/**
 * Menghitung hasil dari ekspresi matematika di layar.
 * Menggunakan try-catch untuk menangani ekspresi yang tidak valid.
 */
function calculateResult() {
    try {
        // eval() digunakan untuk mengevaluasi string matematika.
        // Berhati-hatilah dengan eval() dalam proyek nyata karena alasan keamanan,
        // namun untuk kalkulator sederhana ini, ini adalah cara yang paling praktis.
        let result = eval(display.value.replace('%', '/100'));
        
        // Memformat hasil agar tidak terlalu panjang
        if (!Number.isInteger(result)) {
            result = result.toFixed(5);
        }
        
        display.value = result;
    } catch (error) {
        // Jika terjadi error (misal: "5 * * 2"), tampilkan "Error".
        display.value = 'Error';
    }
}
