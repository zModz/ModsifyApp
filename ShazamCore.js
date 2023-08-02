import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shazamCoreAPI = createApi({
    reducerPath: 'shazamCoreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', process.env.EXPO_PUBLIC_XRapidAPIKey)

            return headers
        }
    }),
    endpoints: (builder) => ({
        getCharts: builder.query({ query: () => '/charts/track' }),
    }),
})


export const {
    useGetChartsQuery,
} = shazamCoreAPI
