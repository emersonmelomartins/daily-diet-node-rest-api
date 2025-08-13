import 'package:daily_diet/src/viewmodels/test_viewmodel.dart';
import 'package:daily_diet/src/views/test_view.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:provider/single_child_widget.dart';
import 'package:toastification/toastification.dart';

class App extends StatelessWidget {
  const App({super.key});

  @override
  Widget build(BuildContext context) {
    List<SingleChildWidget> providers = [
      ChangeNotifierProvider(create: (ctx) => TestViewModel(ctx)),
    ];

    return MultiProvider(
      providers: providers,
      child: ToastificationWrapper(
        child: MaterialApp(
          title: 'Daily Diet',
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.deepPurple,
            ),
          ),
          home: const TestView(title: 'Título da página teste'),
        ),
      ),
    );
  }
}
