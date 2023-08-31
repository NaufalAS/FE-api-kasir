import React, {useEffect, useState} from "react";
import Layout from "@/components/layouts/layout";
import api from "@/api";
import ProductList from "@/components/elements/ProductList/ProductList";
import Cart from "@/components/elements/Cart/Cart";
import styles from '@/styles/Home.module.css'

export default function Home() {


//   fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/33.json`)
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

// fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/33.json`)
// .then(response => response.json())
// .then(regencies => {
//   // Cari data kota Semarang (KOTA SEMARANG) berdasarkan namanya
//   const kotaSemarang = regencies.find(city => city.name === "KOTA SEMARANG");

//   // Jika data kota Semarang ditemukan, tampilkan hasilnya
//   if (kotaSemarang) {
//     // Buat tampilan untuk data Kota Semarang
//     const kotaSemarangData = `
//       <h3>Outlet: ${kotaSemarang.name}</h3>
//     `;

//     // Tampilkan data di dalam div dengan id "kotaSemarangData"
//     document.getElementById("kotaSemarangData").innerHTML = kotaSemarangData;
//   } else {
//     console.log("Data Kota Semarang tidak ditemukan.");
//   }
// });

  const[products, setProducts] = useState([])

  const fetchProduct = async () => {
     const response = await api.get('/products');
     const data = await response.data.payload;
     setProducts(data)
  }
 



  useEffect(() => {
    fetchProduct();
  }, [])


  
  return (
    <Layout>
      <div className={styles.ok}>
      <h1>Home</h1>
      </div>
      <div className={styles.home}>
      <ProductList products={products}/>

      <Cart />
      </div>
      
    </Layout>
  )
}
