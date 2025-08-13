import 'package:freezed_annotation/freezed_annotation.dart';

part "create_user_dto.freezed.dart";
part "create_user_dto.g.dart";

@freezed
@JsonSerializable()
class CreateUserDTO with _$CreateUserDTO {
  @override
  final String email;
  @override
  final String name;

  CreateUserDTO({
    required this.email,
    required this.name,
  });

  factory CreateUserDTO.fromJson(Map<String, dynamic> json) => _$CreateUserDTOFromJson(json);
  Map<String, dynamic> toJson() => _$CreateUserDTOToJson(this);
}
