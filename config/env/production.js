module.exports = {
    server: {
        trust_proxy_host: "",
        port: 80,
        session_expire: 1080000,
        single_cluster: false,
        accept_domain: "",
        auth_key: ""
    },
    store: {
        storeDBMS: "",
        mysqlHost: "",
        mysqlPort: "",
        mysqlUser: "",
        mysqlPassword: "",
        mysqlDatabase: "",
        ConnectionLimit: 1000,
        ConnectionIdle: 10000
    },
    redis: {
        redisHost: "",
        redisPort: 6379,
        redisDatabase: 1,
        redisPassword: ""
    }
};
