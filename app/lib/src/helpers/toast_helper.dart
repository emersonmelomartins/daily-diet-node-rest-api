import 'package:flutter/material.dart';
import 'package:toastification/toastification.dart';

sealed class Toast {
  static void showError(String message) {
    toastification.show(
      type: ToastificationType.error,
      style: ToastificationStyle.fillColored,
      description: Text(
        message,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 14,
          color: Colors.white,
        ),
      ),
      primaryColor: Colors.red,
      autoCloseDuration: const Duration(seconds: 5),
      backgroundColor: Colors.red,
      icon: const Icon(Icons.error),
      borderSide: const BorderSide(color: Colors.white, width: 1),
      showProgressBar: true,
      animationDuration: const Duration(milliseconds: 300),
      progressBarTheme: const ProgressIndicatorThemeData(
        color: Colors.white,
        linearTrackColor: Colors.red,
        linearMinHeight: 2,
      ),
    );
  }

  static void showSuccess(String message) {
    toastification.show(
      type: ToastificationType.success,
      style: ToastificationStyle.fillColored,
      description: Text(
        message,
        style: const TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 14,
          color: Colors.white,
        ),
      ),
      primaryColor: Colors.green,
      autoCloseDuration: const Duration(seconds: 5),
      showProgressBar: true,
      animationDuration: const Duration(milliseconds: 300),
      backgroundColor: Colors.green,
      icon: const Icon(Icons.check_circle),
      borderSide: const BorderSide(color: Colors.white, width: 1),
      progressBarTheme: const ProgressIndicatorThemeData(
        color: Colors.white,
        linearTrackColor: Colors.green,
        linearMinHeight: 2,
      ),
    );
  }
}
