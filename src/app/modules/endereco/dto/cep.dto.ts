import { ApiProperty } from '@nestjs/swagger';

export class cep {
  @ApiProperty({
    description: 'PostalCode',
    required: true,
    example: '02998050',
  })
  postalCode!: string;
}
