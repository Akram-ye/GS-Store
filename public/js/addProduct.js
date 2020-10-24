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

const addProdcutForm = document.querySelector('#prodcut-add-form')
const messageOut = document.querySelector('.message-out')

addProdcutForm.addEventListener('submit', e => {
    e.preventDefault()

    const productNumber = Number(addProdcutForm['add-product-number'].value)
    const productPrice = Number(addProdcutForm['add-product-price'].value)
    const productName = addProdcutForm['add-product-name'].value
    const productDate = addProdcutForm['add-product-date'].value
    const productDescription = addProdcutForm['add-product-description'].value

    if (productNumber == '' || productPrice == '' || productName == '') {
        msgError('يرجاء تعبئة الحقول المطلوبة!')
    } else {
        const productsRef = db.collection('products')

        productsRef
            .where('product_number', '==', productNumber)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data())
                if (data.length > 0) {
                    msgError('المنتج موجود بالفعل !')
                } else {
                    productsRef
                        .add({
                            product_number: productNumber,
                            product_price: productPrice,
                            product_name: productName,
                            product_date: productDate,
                            product_description: productDescription,
                            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        .then(ref => {
                            msgSuccess('تم إضافة المنتج بنجاح ')
                            addProdcutForm.reset()
                        })
                        .catch(error => {
                            msgError('خطاء في اضافة المنتج ' + error)
                        })
                }
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
