import 'package:daily_diet/src/dtos/create_user_dto.dart';
import 'package:daily_diet/src/errors/error_handler.dart';
import 'package:daily_diet/src/errors/exceptions/service_exception.dart';
import 'package:daily_diet/src/libs/dio_client.dart';
import 'package:dio/dio.dart';

class UserService {
  final Dio dio = DioClient.client;
  final String route = "users";

  Future<void> createUser({required CreateUserDTO form}) async {
    try {
      var resp = await dio.post(
        "/$route",
        data: form.toJson(),
      );

      print(resp);
    } on DioException catch (e, s) {
      throw ServiceException(ErrorHandler.handleDioError(e, s));
    }
  }
}
