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

const editProductForm = document.querySelector('#edit-product-form')
const productNumber = Number(localStorage.getItem('product_no'))
const showProductNumber = document.querySelector('#edit-product-number')

const messageOut = document.querySelector('.message-out')

// show the prdouct number
showProductNumber.textContent = productNumber

editProductForm.addEventListener('submit', e => {
    e.preventDefault()

    const productPrice = Number(editProductForm['edit-product-price'].value)
    const productName = editProductForm['edit-product-name'].value
    const productDate = editProductForm['edit-product-date'].value
    const productDescription = editProductForm['edit-product-description'].value

    if (productPrice == '' || productName == '') {
        msgError('يرجاء تعبئة الحقول المطلوبة!')
    } else {
        const productsRef = db.collection('products')

        productsRef
            .where('product_number', '==', productNumber)
            .get()
            .then(querySnapshot => {
                // const data = querySnapshot.docs.map(doc =>{ doc.data()})
                querySnapshot.forEach(doc => {
                    doc.ref
                        .update({
                            product_price: productPrice,
                            product_name: productName,
                            product_date: productDate,
                            product_description: productDescription,
                        })
                        .then(() => {
                            msgSuccess('تم تعديل المنتج بنجاح')
                            editProductForm.reset()
                            document.location.href = 'showproduct.html'
                        })
                        .catch(error => {
                            msgError('فشل تعديل المنتج', error)
                        })
                })
            })
    }
})

function msgError(text) {
    let html = ''
    const error_message = `
        <div class="mx-auto flex justify-center  items-center border-r-4 bg-red-500 border-red-500  h-20 w-5/6   text-red-100 font-bold rounded-md">
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
        <div class="mx-auto flex justify-center  items-center border-r-4  bg-green-500 border-green-500  h-20 w-5/6 text-green-100 font-bold rounded-md">
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
