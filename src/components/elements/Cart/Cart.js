import React, {useEffect, useState} from "react";
import styles from './index.module.css';
import Image from "next/image";
import { useCart, useCartDispatch } from "@/context/CartContext";
import api from '@/api';


const Cart = () => {

//   fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/33.json`)
//   .then(response => response.json())
//   .then(regencies => {
//     var data = regencies;
//     var tampung = '<option value="">Pilih</option>'; // Inisialisasi dengan elemen "Pilih" yang kosong
//     data.forEach(element => {
//       tampung += `<option data-reg="${element.id}" value="${element.name}">${element.name}</option>`;
//     });

//     // Kosongkan elemen dengan id "provinsi" sebelum menambahkan elemen <option> baru
//     document.getElementById('provinsi').innerHTML = '';

//     // Tambahkan elemen <option> yang baru ke dalam elemen dengan id "provinsi"
//     document.getElementById('provinsi').innerHTML = tampung;
//   });

//   // Ambil data kota dari API wilayah Indonesia berdasarkan kode provinsi (33 untuk Jawa Tengah)
// fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/33.json`)
// .then(response => response.json())
// .then(regencies => {
//   // Cari data kota Semarang (KOTA SEMARANG) berdasarkan namanya
//   const kotaSemarang = regencies.find(city => city.name === "KOTA SEMARANG");

//   // Jika data kota Semarang ditemukan, tampilkan hasilnya
//   if (kotaSemarang) {
//     console.log("Data Kota Semarang:");
//     console.log("ID Kota:", kotaSemarang.id);
//     console.log("Nama Kota:", kotaSemarang.name);
//     console.log("ID Provinsi:", kotaSemarang.province_id);
//   } else {
//     console.log("Data Kota Semarang tidak ditemukan.");
//   }
// });




    const [payAmount, setPayAmount] = useState();

    const carts = useCart();
    const dispatch = useCartDispatch();
    const [changeAmount, setChangeAmount] = useState(0);

    
    const handleAddToCart = cart =>{
       dispatch({
        type :'add',
        payload : product
       })
    }

    const getTotalPrice = () => {
        let totalPrice = 0;
        for (let i = 0; i < carts.length; i++) {
          totalPrice += carts[i].price * carts[i].quantity
        }
    
        return totalPrice;
      }


      

      const handleChangePay = (event) => {
        const { target } = event;
        const { value } = target;
    
        setPayAmount(value)
      }

    const handleDecreaseCart = product =>{
        dispatch({
            type :'decrease',
            payload : product
           })
    }

    const handleCheckout = async () => {
        const products = carts.map((item) => {
          return {
            id: item.id,
            quantity: item.quantity
          }
        });
    
        try {
          const payload = {
            total_price: +getTotalPrice(),
            paid_amount: +payAmount,
            kembalian: +changeAmount,
            products
          }
          await api.post('/transactions', payload);
          setPayAmount('');
          dispatch({type: 'clear'})
        } catch {
          throw Error('error')
        }
      }
    
      const isDisableButton = () => {
        return !payAmount || +payAmount < +getTotalPrice() || carts.length === 0;
      }

      useEffect(() => {
        // Step 2: Calculate the change amount whenever the payment amount or the cart items change
        const totalPrice = getTotalPrice();
        const paidAmount = +payAmount || 0;
        const change = paidAmount - totalPrice;
        setChangeAmount(change > 0 ? change : 0); // Ensure change amount is not negative
      }, [carts, payAmount]);

    return(
        <div className={styles.cart}>
            <h3>Cart</h3>
            <div className={styles['cart__cart-list']}>
              {carts.map((cart, index) =>{
                return( 
                    <div key={index} className={styles['cart-item']}>
                        <div className={styles['cart-item__image']}>
                        <Image src={cart.img_product} alt={cart.name} fill
                            style={{ objectFit: 'contain' }}
                        />
                        </div>
                        <div className={styles['cart-item__desc']}>
                         <p>{cart.name}</p>
                         <p>{cart.price}</p>
                         </div>
                         <div className={styles['cart-item__action']}>
                         <button onClick={() => handleDecreaseCart(cart)}>-</button>
                         <p>{cart.quantity}</p>
                         <button onClick={() => handleAddToCart(cart)}>+</button>
                         </div>
                    </div>
                )
            })}
        </div>

        <div className={styles['cart__checkout']}>
            <div className={styles['cart__total-price']}>
                <p>total harga: </p>
                <p>{getTotalPrice()}</p>
            </div>
            <div className={styles['cart__pay']}>
            <label>Bayar</label>
            <input placeholder="-" onChange={handleChangePay} type="number" value={payAmount} />  
            </div>
            <div className={styles['cart__change']}>
          <p>Kembalian:</p>
          <p>{changeAmount}</p>
        </div>
            <button onClick={handleCheckout} disabled={isDisableButton()}>Checkout</button>
        </div>
        
        </div>
    )
}

export default Cart;