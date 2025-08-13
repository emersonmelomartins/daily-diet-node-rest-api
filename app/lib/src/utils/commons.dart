import 'package:package_info_plus/package_info_plus.dart';

abstract class AppCommons {
  static Future<String> getPackageVersion() async {
    final info = await PackageInfo.fromPlatform();
    final pkgVersion = "${info.version}+${info.buildNumber}";

    return pkgVersion;
  }
}
