import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': '42560f71c1msh67d9d1e5b2e152fp15efadjsn0d9fc1977c24',
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders })

export const cryptoApi = createApi({
   reducerPath: 'cryptoApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: (builder) => ({
    getCryptos: builder.query({
        query: (count) => createRequest(`/coins?limit=${count}`)
   }),
   getcryptoDetails: builder.query({
         query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

  })
})

export const {
    useGetCryptosQuery,useGetcryptoDetailsQuery,
} = cryptoApi;