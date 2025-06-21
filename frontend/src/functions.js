const apiUrl = 'http://localhost:9001';

// Авторизация пользователя
export const autho = (setPage) => {
    const login = document.getElementById('login').value
    const password = document.getElementById('password').value
    const data = {
        login: login,
        password: password
    }

    fetch(`${apiUrl}/autho`, {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    })
    .then(resurlt => resurlt.json())
    .then((resurlt) => {
        if (resurlt.token !== false){
            console.log(login)
            setCoockeAutho(login)
            setPage('Catalog')
        } else {
            alert(resurlt.message)
        }
    })
}

// Регистрация нового пользователя
export const addser = () => {
    const login = document.getElementById('login').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password_repeat = document.getElementById('password_repeat').value;

    const data = {
        login: login,
        email: email,
        password: password,
        password_repeat: password_repeat
    }

    fetch(`${apiUrl}/reg`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(resurlt => resurlt.json())
     .then((resurlt) => {
         /*if (!resurlt.status == 'ok'){
         } */
         console.log(resurlt)
     })
 }

 
// Добавление товара в каталог
export const newProductAdd = () => {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const imageNane = document.getElementById('imageNane').value;

    const data = {
        title: title,
        price: price,
        imageNane: imageNane,
    }

    fetch(`${apiUrl}/product_add`, {
        method: 'POST',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     })
     .then(resurlt => resurlt.json())
     .then((resurlt) => {
        document.getElementById('title').value = ''
        document.getElementById('price').value = ''
        document.getElementById('imageNane').value = ''

        console.log(resurlt)
        alert(resurlt.message)
     })
 }

 // Добавление товара в корзину
export const addProductCart = (productId, setCountCart, countCart) => {
    if (productId) {
        const login = getLogin();
    
        if (login == false)
            return;

        const data = {
            login: login,
            productId: productId,
            productCount: 1,
        };

        fetch(`${apiUrl}/cart_add`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resurlt => resurlt.json())
        .then((resurlt) => {
            console.log(resurlt);
            setCountCart(countCart + 1);
            alert(resurlt.message);
        });
    }
}

// Получает список товаров для корзины по логину
export const getListCart = (setCartProducts, setTotalPrica, setCountCart) => {
    const login = getLogin();
    
    if (login == false)
        return;

    const data = {
        login: login
    };

    fetch(`${apiUrl}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resurlt => resurlt.json())
    .then((resurlt) => {
        const cartProducts = resurlt.data;
        const countCart = cartProducts.reduce( (prev, item) => { return prev + 1 }, 0);
        const totalPrice = cartProducts.reduce( (prev, item) => { return prev + item.price }, 0);

        setCartProducts((cartProducts));
        setTotalPrica({ price: totalPrice, count: countCart });
        setCountCart(countCart);
    })
}

// Удаляет товар из корзины
export const cartProductDelete = (productId, setCartProducts, setTotalPrica, setCountCart) => {
    if (productId){
        const login = getLogin();
        
        if (login == false)
            return;

        const data = {
            productId: productId,
            login: login
        };

        fetch(`${apiUrl}/cart_delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resurlt => resurlt.json())
        .then((resurlt) => {
            if (resurlt.status == 'ok'){
                getListCart(setCartProducts, setTotalPrica, setCountCart) 
            } else {
                alert(resurlt.message)
            }
        });
    }
}

// Получает кол-во товаров в корзине
export const getCountProductsCart = (setCountCart) => {
    const login = getLogin();
    
    if (login == false)
        return;

    const data = {
        login: login
    };

    fetch(`${apiUrl}/cart_count`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resurlt => resurlt.json())
    .then((resurlt) => {
        setCountCart(resurlt.count);
    })
}

// Оформление (добавление) заказа
export const addOrder = () => {
    const CartItem = document.querySelectorAll('.CartItem');

    if (CartItem) {
        const login = getLogin();
    
        if (login == false)
            return;

        let productIds = [];
        const totalPrice = document.getElementById('total').getAttribute('data-total');

        CartItem.forEach(function(item) {  
            productIds.push(item.getAttribute('id'))
        });  

        const data = {
            login: login,
            productIds: productIds,
            totalPrice: totalPrice,
        };

        fetch(`${apiUrl}/order_add`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(resurlt => resurlt.json())
        .then((resurlt) => {
            alert(resurlt.message);
            window.location.reload(true);
        });
    }
}

// 
export const getOrders = (setOrders) => {
    const login = getLogin();
    
    if (login == false)
        return;

    const data = {
        login: login
    };

    fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resurlt => resurlt.json())
    .then((resurlt) => {
        const orders = resurlt.data;
        console.log(orders)
        setOrders(orders);
    })

}

export const formatDate = (dateString) => {
    //const dateString = "2025-06-21T14:55:14.956Z";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
}

// Устанавливает куки об авторизации
export const setCoockeAutho = (login) => {
    let toDate = new Date();
    let minutes = toDate.getMinutes();
    let minutesNew = minutes + 60;

    toDate.setMinutes(minutesNew);

    document.cookie = "login=" + login + ";expires=" + toDate.toString();
}

// Получает куки об авторизации
export const getLogin = () => {
    let results = document.cookie.match(/login=(.+?)(;|$)/);

    if (results !== null && results.length > 0)
        return results[1];

    return false;
}

// Проверяет, есть авторизация или нет
export const isAutho = () => {
    const login = getLogin();

    if (login != 0)
        return true;
    else
        return false;
}

// Удаляет куки об авторизации (выход)
export const exit = (props) => {
    document.cookie = "login=0;";
    props.setPage('Catalog');
    window.location.reload(true);
}