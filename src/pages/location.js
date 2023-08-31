import React, { useState, useEffect } from 'react';
import Layout from "@/components/layouts/layout";
import  LocationList from '@/components/elements/Location/Location';

export default function Location() {

  return (
    <Layout>
      <h1>Lokasi Outlet</h1>
      < LocationList  />
    </Layout>
  )
}
