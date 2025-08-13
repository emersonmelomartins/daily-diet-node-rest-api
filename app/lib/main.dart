import 'dart:async';
import 'dart:developer';

import 'package:daily_diet/src/app.dart';
import 'package:daily_diet/src/libs/dio_client.dart';
import 'package:daily_diet/src/services/base_service.dart';
import 'package:daily_diet/src/services/user_service.dart';
import 'package:daily_diet/src/utils/commons.dart';
import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

GetIt getIt = GetIt.instance;

void main() {
  runZonedGuarded(
    () async {
      WidgetsFlutterBinding.ensureInitialized();

      BaseService.setEnvironment(Environment.local);
      DioClient.setup();

      getIt.registerSingleton<UserService>(UserService());

      var version = await AppCommons.getPackageVersion();
      log(version);

      runApp(const App());
    },
    (e, s) {
      log("[APP LOG]", error: e, stackTrace: s);
    },
  );
}
