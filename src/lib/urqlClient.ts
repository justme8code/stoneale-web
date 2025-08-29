// src/lib/urqlClient.ts
import {Client, cacheExchange, fetchExchange, subscriptionExchange} from 'urql';

import { createClient as createWSClient } from 'graphql-ws';
import {getCookie} from "@/lib/cookieHelper.ts";

// Create a WebSocket client for subscriptions
const wsClient = createWSClient({
    url: 'ws://localhost:4001/query', // must match server
    connectionParams: () => {
        const token = getCookie("token") || '';
        return { headers: { Authorization: token ? `Bearer ${token}` : '' } };
    },
});


export const urqlClient = new Client({
    url: 'http://localhost:4001/query',
    exchanges: [
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription(operation) {
                return {
                    subscribe: (sink) => ({
                        unsubscribe: wsClient.subscribe(operation, sink),
                    }),
                };
            },
        }),
    ],
    fetchOptions: () => {
        const token = getCookie("token") || '';
        return {
            headers: { Authorization: token ? `Bearer ${token}` : '' },
        };
    },
});
