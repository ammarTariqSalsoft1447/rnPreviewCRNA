
import { store } from '../../WooCommerceWrapper/store';
const state = store.getState()
const configs = state.ConfigReducer
export const config = {
// url: "https://dev62.onlinetestingserver.com/testingserver/",
// url: 'https://pinkpoppy-boutique.com/',
// url:"https://dev57.onlinetestingserver.com/cindy-walling/",
// baseUrl: "https://dev62.onlinetestingserver.com/testingserver/wp-json/wc/v3",

// url: 'https://pinkpoppy-boutique.com/wp-json/wc/v3/',
// baseUrl: 'https://pinkpoppy-boutique.com/wp-json/wc/v3',
// consumerKey: 'ck_43d6ea0ff91e438032d45193e49f9bda9334262f', // Your consumer secret
// consumerSecret: 'cs_179c977d171dc139734c80cda3e1663f6b6c8a7e', // Your consumer secret
// loginUrl: 'https://pinkpoppy-boutique.com/',

url: configs.baseUrl,
baseUrl: configs.baseUrl,
consumerKey: configs.consumerKey,
consumerSecret: configs.consumerSecret,
loginUrl: configs.loginUrl,


// baseUrl: 'https://dev57.onlinetestingserver.com/cindy-walling/wp-json/wc/v3',

name: '',
// nonce: 'EOqVnicRb3YYhcXrSeuYybSglKvyiRum',
// auth: undefined,
// key: 'Y2tfOGZiOTU0YjBmZWE2YmExM2I0ZGMyYTEwODRlNGZhNTk1ZDU2YzA2Yzpjc19lMzg5OTQ5OWUzY2ViMDIxMDM5YWE1MGM3MWE1YWViZTZmZmQwOGY3'
};
export default config;