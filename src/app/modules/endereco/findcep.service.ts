import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import axios from 'axios';
import { cepReturn, Neighborhood, publicArea } from '../../types/cep-types'; // Certifique-se de importar os tipos corretos
import { PrismaService } from '../../db/prisma/prisma.service';

@Injectable()
export class FindCepService {
  constructor(private readonly prisma: PrismaService) {}

  async findCep(param: string): Promise<{ publicAreaReturn: cepReturn }> {
    const CEP = param.replace(/[^\d]/g, '');

    try {
      const publicArea = await this.findPublicArea(CEP);

      if (!publicArea.BAI_NU_INI) {
        throw new NotFoundException('publicArea parameter not found.');
      }
      const neighborhood = await this.findNeighborhood(publicArea.BAI_NU_INI);

      const publicAreaReturn: cepReturn = {
        publicArea: {
          streetName: publicArea.LOG_NO,
          postalCode: publicArea.CEP,
          state: publicArea.UFE_SG,
          municipality: {
            codMun: publicArea.LOG_LOCALIDADE?.MUN_NU,
            municipalityName: publicArea.LOG_LOCALIDADE?.LOC_NO,
          },
        },
        neighborhood: {
          neighborhoodName: neighborhood.BAI_NO,
        },
        prefix: publicArea.TLO_TX,
        abbreviatedStreet: publicArea.LOG_NO_ABREV,
      };

      return { publicAreaReturn };
    } catch (error) {
      try {
        const response2 = await axios.get(
          `https://viacep.com.br/ws/${CEP}/json`,
        );
        if (response2.data.erro === true || response2.data.erro === 'true') {
          throw new BadRequestException('postal code not found');
        }
        const publicAreaReturn: cepReturn = {
          publicArea: {
            streetName: response2.data.logradouro,
            postalCode: response2.data.cep,
            state: response2.data.uf,
            municipality: {
              codMun: response2.data.ibge,
              municipalityName: response2.data.localidade,
            },
          },
          neighborhood: {
            neighborhoodName: response2.data.bairro,
          },
          prefix: '',
          abbreviatedStreet: response2.data.logradouro,
        };

        return { publicAreaReturn };
      } catch (error) {
        try {
          const response2 = await axios.get(
            `https://brasilapi.com.br/api/cep/v2/${CEP}`,
          );
          const publicAreaReturn: cepReturn = {
            publicArea: {
              streetName: response2.data.street,
              postalCode: response2.data.cep,
              state: response2.data.state,
              municipality: {
                codMun: '',
                municipalityName: response2.data.city,
              },
            },
            neighborhood: {
              neighborhoodName: response2.data.neighborhood,
            },
            prefix: '',
            abbreviatedStreet: response2.data.street,
          };

          return { publicAreaReturn };
        } catch (error) {
          throw new BadRequestException('postal code not found');
        }
      }
    }
  }

  async findPublicArea(CEP: string): Promise<publicArea> {
    const publicArea = await this.prisma.lOG_LOGRADOURO.findFirstOrThrow({
      where: {
        CEP,
      },
      select: {
        BAI_NU_INI: true,
        CEP: true,
        UFE_SG: true,
        LOG_NO: true,
        TLO_TX: true,
        LOG_NO_ABREV: true,
        LOG_LOCALIDADE: {
          select: {
            MUN_NU: true,
            LOC_NO: true,
          },
        },
      },
    });

    if (!publicArea) {
      throw new NotFoundException('publicArea not found');
    }

    if (!publicArea.LOG_LOCALIDADE) {
      throw new NotFoundException('publicArea municipality not found');
    }

    return publicArea;
  }

  async findNeighborhood(BAI_NU_INI: number): Promise<Neighborhood> {
    const neighborhood = await this.prisma.lOG_BAIRRO.findFirstOrThrow({
      where: {
        BAI_NU: Number(BAI_NU_INI),
      },
      select: {
        BAI_NO: true,
      },
    });
    return neighborhood;
  }
}
