import 'package:daily_diet/src/dtos/create_user_dto.dart';
import 'package:daily_diet/src/helpers/toast_helper.dart';
import 'package:daily_diet/src/services/user_service.dart';
import 'package:flutter/material.dart';

class TestViewModel extends ChangeNotifier {
  final BuildContext ctx;
  late UserService _userService;

  int _count = 0;
  int get count => _count;

  TestViewModel(this.ctx) {
    _userService = UserService();
  }

  void increment() {
    _count++;
    notifyListeners();
  }

  Future<void> createuser() async {
    try {
      var form = CreateUserDTO(
        email: "emerson25xd@gmail.com",
        name: "Emerson Melo Martins",
      );
      await _userService.createUser(form: form);

      if (!ctx.mounted) return;
      // toastification.show(
      //   title: Text('Hello, world!'),
      //   autoCloseDuration: const Duration(seconds: 5),
      // );
      Toast.showSuccess("Usuário criado com sucesso!");
    } on Exception catch (e) {
      if (!ctx.mounted) return;
      Toast.showError("$e");
      rethrow;
    }
  }
}
