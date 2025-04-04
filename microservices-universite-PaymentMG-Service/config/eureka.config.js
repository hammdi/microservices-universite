const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
  instance: {
    app: 'BILLING-SERVICE',
    hostName: 'host.docker.internal',
    ipAddr: '127.0.0.1',
    port: {
      '$': process.env.PORT,
      '@enabled': true
    },
    vipAddress: 'billing-service',
    statusPageUrl: `http://host.docker.internal:${process.env.PORT}/health`,
    healthCheckUrl: `http://host.docker.internal:${process.env.PORT}/health`,
    homePageUrl: `http://host.docker.internal:${process.env.PORT}`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: process.env.EUREKA_HOST,
    port: process.env.EUREKA_PORT,
    servicePath: '/eureka/apps/',
    preferIpAddress: true,
    shouldUseDns: false,
    registerWithEureka: true,
    fetchRegistry: true
  }
});

module.exports = eurekaClient;