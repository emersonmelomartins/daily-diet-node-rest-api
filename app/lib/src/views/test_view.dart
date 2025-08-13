import 'package:daily_diet/src/viewmodels/test_viewmodel.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class TestView extends StatelessWidget {
  final String title;
  const TestView({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    final vm = Provider.of<TestViewModel>(context);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Contador: ${vm.count}"),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: () async => await vm.createuser(),
              child: Text("Criar usuário"),
            ),
          ],
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        onPressed: () => vm.increment(),
        tooltip: 'Acrescentar',
        child: const Icon(Icons.add),
      ),
    );
  }
}
