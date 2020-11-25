var firebaseConfig = {
    apiKey: 'AIzaSyA6EQXH8tutxI5VEv9Yzx3_SrvYTZLhfJo',
    authDomain: 'gs-store-6ca34.firebaseapp.com',
    databaseURL: 'https://gs-store-6ca34.firebaseio.com',
    projectId: 'gs-store-6ca34',
    storageBucket: 'gs-store-6ca34.appspot.com',
    messagingSenderId: '1056104909295',
    appId: '1:1056104909295:web:7acbbd4f72dd4c1cf94e1a',
    measurementId: 'G-P3MCS91FDR',
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const searchForm = document.querySelector('#search-form')

const messageOut = document.querySelector('.message-out')

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const productNumber = searchForm['product-number'].value

    if (productNumber == '') {
        msgError('يرجى إدخال رقم المنتج!')
    } else {
        const productsRef = db
            .collection('products')
            .where('product_number', '==', productNumber)

        productsRef
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())

                if (data.length > 0) {
                    msgSuccess('تم العثور على المنتج :)')
                    document.location.href = 'showproduct.html'
                    localStorage.setItem('product_no', data[0].product_number)
                } else {
                    msgError('خطاء: لم يتم العثور منتج')
                }
            })
            .catch(function (error) {
                msgError('Error getting document: ' + error)
            })
    }
})

// Massages
function msgError(text) {
    let html = ''
    const error_message = `
        <div class="mx-auto flex justify-center  items-center border-r-4 bg-red-500 border-red-500  h-20 w-5/6  sm:w-8/12 md:w-7/12 lg:w-6/12 text-red-100 font-bold rounded-md">
            <p class="text-sm sm:text-xl m-auto mr-2 pr-2">${text}</p>
            <i class="h-full bg-red-200 w-1"></i>
            <i class="fas fa-times-circle text-4xl m-3 mx-5 items-center"></i>
        </div>`

    html += error_message
    messageOut.innerHTML = html
}

function msgSuccess(text) {
    let html = ''
    const error_message = `
        <div class="mx-auto flex justify-center  items-center border-r-4  bg-green-500 border-green-500  h-20 w-5/6  sm:w-8/12 md:w-5/12 text-green-100 font-bold rounded-md">
            <p class="text-sm sm:text-xl m-auto mr-2 pr-2">${text}</p>
            <i class="h-full bg-green-200 w-1"></i>
            <i class="fas fa-times-circle text-4xl m-3 mx-5 items-center"></i>
        </div>`

    html += error_message
    messageOut.innerHTML = html
}
function onlyNumberKey(evt) {
    var ASCIICode = evt.which ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false
    return true
}
