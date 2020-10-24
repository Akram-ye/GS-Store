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
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const editProductButton = document.querySelector('#edit-product-button')
const deleteProductButton = document.querySelector('#delete-product-button')
const messageOut = document.querySelector('.message-out')

const productNumber = Number(localStorage.getItem('product_no'))

const productsRef = db
    .collection('products')
    .where('product_number', '==', productNumber)

productsRef
    .get()
    .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data())
        showInformation(data[0])
    })
    .catch(function (error) {
        msgError('Error getting document=> ' + error)
    })

function showInformation(doc) {
    document.querySelector('#show_product_number').textContent =
        doc.product_number
    document.querySelector('#show_product_name').textContent = doc.product_name
    document.querySelector('#show_product_date').textContent = doc.product_date
    document.querySelector('#show_product_decsription').textContent =
        doc.product_description
    document.querySelector('#show_product_price').textContent =
        doc.product_price
}

editProductButton.addEventListener('click', e => {
    document.location.href = 'editproduct.html'
})

deleteProductButton.addEventListener('click', e => {
    if (confirm('هل تريد حذف المنتج')) {
        productsRef.get().then(querySnapshot => {
            // const data = querySnapshot.docs.map(doc =>{ doc.data()})
            querySnapshot.forEach(doc => {
                doc.ref
                    .delete()
                    .then(() => {
                        msgSuccess('تم حذف المنتج بنجاح')
                        setTimeout(() => {
                            document.location.href = 'index.html'
                        }, 2000)
                    })
                    .catch(error => {
                        msgError('خطاء: لم يتم حذف المنتج', error)
                    })
            })
        })
    } else {
        return false
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
