import 'dart:developer';

import 'package:dio/dio.dart';

class ErrorHandler {
  static String handleDioError(DioException? error, StackTrace stackTrace) {
    String errorMessage = 'Erro desconhecido';

    if (error?.response != null) {
      final message = error?.response?.data;

      switch (error?.response!.statusCode) {
        case 400:
          errorMessage = 'Ocorreu um erro - $message';
          break;
        case 401:
          errorMessage = 'Não autorizado - $message';
          break;
        case 404:
          errorMessage = 'Recurso não encontrado - $message';
          break;
        default:
          errorMessage = '$message';
          break;
      }
    } else {
      errorMessage = 'Erro de conexão - ${error?.message ?? "Não foi possível realizar a conexão de rede."}';
    }

    return errorMessage;
  }

  static String handleException(Exception error, StackTrace stackTrace) {
    log("# # # Ocorreu uma exception no APP: ", error: error, stackTrace: stackTrace);
    return 'Erro: $error';
  }
}
