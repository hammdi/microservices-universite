const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
  instance: {
    app: 'PAYMENT-SERVICE',
    hostName: 'localhost',
    instanceId: 'payment-service:8070',
    ipAddr: '127.0.0.1',
    port: {
      '$': 8070,
      '@enabled': true
    },
    vipAddress: 'PAYMENT-SERVICE',
    statusPageUrl: 'http://localhost:8070/health',
    healthCheckUrl: 'http://localhost:8070/health',
    homePageUrl: 'http://localhost:8070',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/',
    preferIpAddress: true,
    shouldUseDns: false,
    registerWithEureka: true,
    fetchRegistry: true,
    serviceUrls: {
      default: ['http://localhost:8761/eureka/apps/']
    }
  }
});

module.exports = eurekaClient;