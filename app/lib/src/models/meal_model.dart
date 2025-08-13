import 'package:freezed_annotation/freezed_annotation.dart';

part "meal_model.freezed.dart";
part "meal_model.g.dart";

@freezed
@JsonSerializable()
class Meal with _$Meal {
  @override
  final String id;
  @override
  final String name;
  @override
  final String description;
  @override
  final DateTime mealTime;
  @override
  final bool isOnDiet;
  @override
  final DateTime createdAt;
  @override
  final DateTime? updatedAt;

  Meal({
    required this.id,
    required this.name,
    required this.description,
    required this.mealTime,
    required this.isOnDiet,
    required this.createdAt,
    required this.updatedAt,
  });

  factory Meal.fromJson(Map<String, dynamic> json) => _$MealFromJson(json);
  Map<String, dynamic> toJson() => _$MealToJson(this);
}
