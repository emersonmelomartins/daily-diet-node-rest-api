import 'package:daily_diet/src/services/base_service.dart';
import 'package:dio/dio.dart';

class DioClient {
  static final Dio _client = Dio();

  static Dio get client => _client;

  static void setup() {
    _client.options = BaseOptions(
      connectTimeout: const Duration(seconds: 60),
      receiveTimeout: const Duration(seconds: 60),
      sendTimeout: const Duration(seconds: 60),
      baseUrl: BaseService.baseUrl,
      contentType: Headers.jsonContentType,
      responseType: ResponseType.json,
    );

    _client.interceptors.add(
      LogInterceptor(requestBody: true, responseBody: true),
    );
  }

  static void setAuthToken(String? authToken) {
    _client.options.headers['Authorization'] = authToken != null ? 'Bearer $authToken' : '';
  }
}
