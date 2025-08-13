enum Environment { local, dev, qa, prd }

abstract class BaseService {
  static late String environmentName;
  static late String baseDomain;
  static late String basePort;
  static late String baseUrl;

  static void setEnvironment(Environment env) {
    switch (env) {
      case Environment.local:
        environmentName = "LOCAL";
        baseDomain = "localhost";
        basePort = "3333";
        baseUrl = "http://$baseDomain:$basePort";
        break;
      case Environment.dev:
        environmentName = "DEV";
        baseDomain = "0.0.0.0";
        basePort = "0000";
        baseUrl = "http://$baseDomain:$basePort";
        break;
      case Environment.qa:
        environmentName = "QA";
        baseDomain = "0.0.0.0";
        basePort = "0000";
        baseUrl = "http://$baseDomain:$basePort";
        break;
      case Environment.prd:
        environmentName = "PRD";
        baseDomain = "0.0.0.0";
        basePort = "0000";
        baseUrl = "http://$baseDomain";
        break;
    }
  }
}
