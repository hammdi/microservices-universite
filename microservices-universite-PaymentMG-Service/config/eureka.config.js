const Eureka = require('eureka-js-client').Eureka;

const eurekaClient = new Eureka({
  instance: {
    app: 'PAYMENT-SERVICE',
    hostName: 'payment-service',
    instanceId: 'payment-service:8070',
    ipAddr: 'payment-service',
    port: {
      '$': 8070,
      '@enabled': true
    },
    vipAddress: 'PAYMENT-SERVICE',
    statusPageUrl: 'http://payment-service:8070/health',
    healthCheckUrl: 'http://payment-service:8070/health',
    homePageUrl: 'http://payment-service:8070',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn'
    }
  },
  eureka: {
    host: 'eureka-server',
    port: 8761,
    servicePath: '/eureka/apps/',
    preferIpAddress: false,
    shouldUseDns: false,
    registerWithEureka: true,
    fetchRegistry: true,
    serviceUrls: {
      default: ['http://eureka-server:8761/eureka/apps/']
    }
  }
});

module.exports = eurekaClient;