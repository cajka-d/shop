const PORT = 9001
const dbUrl = 'mongodb://127.0.0.1:27017/shop_db'

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jsonwebtoke = require('jsonwebtoken')

const {secret} = require('./config')

// Подключаем модели
const User = require('./models/User')
const Product = require('./models/Product')
const Cart = require('./models/Cart')
const Order = require('./models/Order')

// Настраиваем сервер
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const getToken = (id) => {
    const payLoad = {id}
    return jsonwebtoke.sign(payLoad, secret, {expiresIn: '24h'})
}

// Авторизация в ЛК
app.post('/autho', async (req, res) => {
    const {login, password} = req.body;
    const userItem = await User.findOne({login: login})
    let message = 'Вы успешно вошли!'
    let token = false

    if (!userItem || userItem.password != password){
        message = 'Логин или пароль неверные!'
    } else {
        token = getToken(userItem._id)
    }

    res.json({
        status: 'ok',
        token: token,
        message: message,
    })
})

// Регистрация нового пользователя
app.post('/reg', async (req, res) => {
    const {login, password, email} = req.body;
    const userItem = new User({
        login: login,
        password: password,
        email: email,
    });
    
    await userItem.save()

    res.json({
        status: 'ok',
        message: 'Data received successfully'
    })
})

// Добавление нового товара
app.post('/product_add', async (req, res) => {
    const {title, price, imageNane} = req.body;
    const productItem = new Product({
        title: title,
        price: price,
        imageNane: imageNane,
    });
    
    await productItem.save()

    res.json({
        status: 'ok',
        message: 'Товар добавлен!'
    })
})

// Получает список товаров
app.get('/products', async (req, res) => {
    const listProducts = await Product.find()

    res.json({
        status: 'ok',
        data: listProducts,
        message: 'Data received successfully'
    })
})

// Добавление товара в козину
app.post('/cart_add', async (req, res) => {
    const {login, productId, productCount} = req.body
    const cartData = await Cart.find({login: login})
    const cartId = cartData.find(element => element.productId == productId)

    let message = ''

    if (!cartId){
        const cartItem = new Cart({
            login: login,
            productId: productId,
            productCount: productCount,
        });

        await cartItem.save()
        message = 'Товар добавлен в корзину!'
    } else {
        message = 'Данный товар уже в корзине!'
    }

    res.json({
        status: 'ok',
        message: message
    })
})

// Выводит товары для корзины
app.post('/cart', async (req, res) => {
    const {login} = req.body
    let data = {};
    let message;

    if (login){
        const cartData = await Cart.find({login: login})

        if (cartData){
            const productIds = cartData.map(item => item.productId)
            data = await Product.find({_id: {$in: productIds}})

            data.map((item, index) => {
                const cartId = cartData.find(element => element.productId == item._id)

                data[index].cartId = cartId._id
            })
        } else {
            message = 'Корзина пуста!'
        }
    }

    res.json({
        status: 'ok',
        data: data,
        message: message
    })
})

// Удаляет товар из корзины
app.post('/cart_delete', async (req, res) => {
    const {productId, login} = req.body
    let cartData = false;

    if (productId && login){
        cartData = await Cart.deleteOne({$and: [{productId: productId, login: login}]})
    }

    res.json({
        status: (cartData) ? 'ok' : 'no',
        message: (cartData) ? 'Удалено!' : 'Не удалось удалить!'
    })
})

app.post('/cart_count', async (req, res) => {
    const {login} = req.body
    let countItems = 0;

    if (login){
        countItems = await Cart.countDocuments({login: login})
    }

    res.json({
        status: 'ok',
        count: countItems
    })
})

// Оформление (добавление) заказа
app.post('/order_add', async (req, res) => {
    const {login, productIds, totalPrice} = req.body
    let message = 'Не удалось оформить заказ!'

    if (login && productIds && totalPrice){
        const ordertem = new Order({
            login: login,
            productIds: productIds,
            totalPrice: totalPrice,
            createdAt: new Date()
        })

        await ordertem.save()
        await Cart.deleteMany({ login: login })

        message = 'Заказ оформлен!'
    }

    res.json({
        status: 'ok',
        message: message
    })
})

// Выводит список заказов
app.post('/orders', async (req, res) => {
    const {login} = req.body
    let data = {};
    let message;

    if (login){
        data = await Order.find({login: login})
    }

    res.json({
        status: 'ok',
        data: data,
        message: message
    })
})


// Запускаем сервер
const start = async () => {
    try {
        await mongoose.connect(dbUrl, {authSource: 'admin'})

        app.listen(PORT, () => {
            console.log(`server start ${PORT}`)
        })
    } catch (e){
        console.log(e);
    }
}

start()