export class CreateChiefDto {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export class ListChiefDto extends CreateChiefDto {}
