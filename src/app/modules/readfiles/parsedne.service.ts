import { BadRequestException, Injectable } from '@nestjs/common';
import path from 'path';
import { type Options, parse, type ColumnOption } from 'csv-parse';
import fs from 'fs/promises';
import { promisify } from 'util';
import { PrismaService } from '../../db/prisma/prisma.service';

@Injectable()
export class ParseDneService {
  constructor(private readonly prismaService: PrismaService) {}
  async parser(): Promise<void> {
    const parsePromise = promisify(parse as any);

    const columnsLocalidade: ColumnOption[] = [
      'LOC_NU',
      'UFE_SG',
      'LOC_NO',
      'CEP',
      'LOC_IN_SIT',
      'LOC_IN_TIPO_LOC',
      'LOC_NU_SUB',
      'LOC_NO_ABREV',
      'MUN_NU',
    ];

    const columnsFaixaLocalidade: ColumnOption[] = [
      'LOC_NU',
      'LOC_CEP_INI',
      'LOC_CEP_FIM',
      'LOC_TIPO_FAIXA',
    ];

    const columnsLogBairro: ColumnOption[] = [
      'BAI_NU',
      'UFE_SG',
      'LOC_NU',
      'BAI_NO',
      'BAI_NO_ABREV',
    ];

    const columnsFaixaBairro: ColumnOption[] = [
      'BAI_NU',
      'FCB_CEP_INI',
      'FCB_CEP_FIM',
    ];

    const columnsFaixaCPC: ColumnOption[] = [
      'CPC_NU',
      'CPC_INICIAL',
      'CPC_FINAL',
    ];

    const columnsFaixaUF: ColumnOption[] = [
      'UFE_SG',
      'UFE_CEP_INI',
      'UFE_CEP_FIM',
    ];

    const columnsFaixaUOP: ColumnOption[] = [
      'UOP_NU',
      'FNC_INICIAL',
      'FNC_FINAL',
    ];
    const columnsGrandeUsuario: ColumnOption[] = [
      'GRU_NU',
      'UFE_SG',
      'LOC_NU',
      'BAI_NU',
      'LOG_NU',
      'GRU_NO',
      'GRU_ENDERECO',
      'CEP',
      'GRU_NO_ABREV',
    ];

    const columnsNumSec: ColumnOption[] = [
      'LOG_NU',
      'SEC_NU_INI',
      'SEC_NU_FIM',
      'SEC_IN_LADO',
    ];

    const columnsUnidOper: ColumnOption[] = [
      'UOP_NU',
      'UFE_SG',
      'LOC_NU',
      'BAI_NU',
      'LOG_NU',
      'UOP_NO',
      'UOP_ENDERECO',
      'CEP',
      'UOP_IN_CP',
      'UOP_NO_ABREV',
    ];
    const columnsVarLog: ColumnOption[] = [
      'LOG_NU',
      'VLO_NU',
      'TLO_TX',
      'VLO_TX',
    ];
    const columnsVarLoc: ColumnOption[] = ['LOC_NU', 'VAL_NU', 'VAL_TX'];

    const columnsVarBai: ColumnOption[] = ['BAI_NU', 'VDB_NU', 'VDB_TX'];

    const columnsCPC: ColumnOption[] = [
      'CPC_NU',
      'UFE_SG',
      'LOC_NU',
      'CPC_NO',
      'CPC_ENDERECO',
      'CEP',
    ];

    const columnsLogradouroXX: ColumnOption[] = [
      'LOG_NU',
      'UFE_SG',
      'LOC_NU',
      'BAI_NU_INI',
      'BAI_NU_FIM',
      'LOG_NO',
      'LOG_COMPLEMENTO',
      'CEP',
      'TLO_TX',
      'LOG_STA_TLO',
      'LOG_NO_ABREV',
    ];
    const parseLogradouroXX: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsLogradouroXX,
    };
  
    const parseLogBairro: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsLogBairro,
    };

    const parseLogFaixaCPC: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsFaixaCPC,
    };

    const parseLogCPC: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsCPC,
    };

    const parseFaixaBairro: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsFaixaBairro,
    };
    const parseFaixaUf: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsFaixaUF,
    };

    const parseFaixaUOP: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsFaixaUOP,
    };

    const parseGrandeUsuario: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsGrandeUsuario,
    };
    const parseNumSec: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsNumSec,
    };
    const parseUnidOper: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsUnidOper,
    };

    const parseVarBai: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsVarBai,
    };

    const parseVarLoc: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsVarLoc,
    };

    const parseVarLog: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsVarLog,
    };

    const parseLocalidade: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsLocalidade,
    };
    const parseFaixaLocalidade: Options = {
      delimiter: '@',
      cast: true,
      columns: columnsFaixaLocalidade,
    };
    const sourceFolderPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'dne',
    );

    const files = await fs.readdir(sourceFolderPath);

    const logLogradouroFiles = files.filter((file) =>
      file.includes('LOG_LOGRADOURO'),
    );
    const logBairroFiles = files.filter((file) =>
      file.includes('LOG_BAIRRO.TXT'),
    );

    const logCPC = files.filter((file) => file.includes('LOG_CPC.TXT'));

    const logFaixaBairro = files.filter((file) =>
      file.includes('LOG_FAIXA_BAIRRO.TXT'),
    );
    const logFaixaCPC = files.filter((file) =>
      file.includes('LOG_FAIXA_CPC.TXT'),
    );

    const logFaixaUF = files.filter((file) =>
      file.includes('LOG_FAIXA_UF.TXT'),
    );

    const logFaixaUOP = files.filter((file) =>
      file.includes('LOG_FAIXA_UOP.TXT'),
    );
    const logGrandeUsuario = files.filter((file) =>
      file.includes('LOG_GRANDE_USUARIO.TXT'),
    );
    const logNumSec = files.filter((file) => file.includes('LOG_NUM_SEC.TXT'));

    const logUnidOper = files.filter((file) =>
      file.includes('LOG_UNID_OPER.TXT'),
    );
    const logVarLoc = files.filter((file) => file.includes('LOG_VAR_LOC.TXT'));
    const logVarLog = files.filter((file) => file.includes('LOG_VAR_LOG.TXT'));

    const logVarBai = files.filter((file) => file.includes('LOG_VAR_BAI.TXT'));
    const logLocalidade = files.filter((file) =>
      file.includes('LOG_LOCALIDADE.TXT'),
    );
    const logFaixaLocalidade = files.filter((file) =>
      file.includes('LOG_FAIXA_LOCALIDADE.TXT'),
    );

    for await (const file of logLocalidade) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseLocalidade)) as Array<{
        LOC_NU: number;
        UFE_SG: string;
        LOC_NO: string;
        CEP: string;
        LOC_IN_SIT: string;
        LOC_IN_TIPO_LOC: string;
        LOC_NU_SUB: number;
        LOC_NO_ABREV: string;
        MUN_NU: string;
      }>;

      for await (const obj of json) {
        try {
             await this.prismaService.lOG_LOCALIDADE.create({
            data: {
              LOC_NU: +obj.LOC_NU,
              CEP: obj.CEP.toString(),
              LOC_IN_SIT: obj.LOC_IN_SIT.toString(),
              LOC_IN_TIPO_LOC: obj.LOC_IN_TIPO_LOC,
              LOC_NO: obj.LOC_NO,
              LOC_NO_ABREV: obj.LOC_NO_ABREV,
              LOC_NU_SUB: +obj.LOC_NU_SUB,
              MUN_NU: obj.MUN_NU.toString(),
              UFE_SG: obj.UFE_SG,
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logBairroFiles) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseLogBairro)) as Array<{
        BAI_NU: number;
        UFE_SG: string;
        LOC_NU: number;
        BAI_NO: string;
        BAI_NO_ABREV: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_BAIRRO.create({
            data: {
              BAI_NU: +obj.BAI_NU,
              UFE_SG: obj.UFE_SG,
              LOC_NU: +obj.LOC_NU,
              BAI_NO: obj.BAI_NO.substring(0, 72),
              BAI_NO_ABREV: obj.BAI_NO_ABREV.substring(0, 36),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logCPC) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseLogCPC)) as Array<{
        CPC_NU: number;
        UFE_SG: string;
        LOC_NU: number;
        CPC_NO: string;
        CPC_ENDERECO: string;
        CEP: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_CPC.create({
            data: {
              CPC_NU: +obj.CPC_NU,
              UFE_SG: obj.UFE_SG,
              LOC_NU: +obj.LOC_NU,
              CPC_NO: String(obj.CPC_NO),
              CPC_ENDERECO: String(obj.CPC_ENDERECO),
              CEP: String(obj.CEP),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logFaixaBairro) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseFaixaBairro)) as Array<{
        BAI_NU: number;
        FCB_CEP_INI: string;
        FCB_CEP_FIM: string;
      }>;

      for await (const obj of json) {

        try {
          await this.prismaService.lOG_FAIXA_BAIRRO.create({
            data: {
              BAI_NU: +obj.BAI_NU,
              FCB_CEP_INI: String(obj.FCB_CEP_INI),
              FCB_CEP_FIM: String(obj.FCB_CEP_FIM),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logFaixaCPC) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseLogFaixaCPC)) as Array<{
        CPC_NU: number;
        CPC_INICIAL: string;
        CPC_FINAL: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_FAIXA_CPC.create({
            data: {
              CPC_NU: +obj.CPC_NU,
              CPC_INICIAL: String(obj.CPC_INICIAL),
              CPC_FINAL: String(obj.CPC_FINAL),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logFaixaLocalidade) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(
        readStream,
        parseFaixaLocalidade,
      )) as Array<{
        LOC_NU: number;
        LOC_CEP_INI: string;
        LOC_CEP_FIM: string;
        LOC_TIPO_FAIXA: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_FAIXA_LOCALIDADE.create(
            {
              data: {
                LOC_NU: +obj.LOC_NU,
                LOC_TIPO_FAIXA: String(obj.LOC_TIPO_FAIXA),
                LOC_CEP_INI: String(obj.LOC_CEP_INI),
                LOC_CEP_FIM: String(obj.LOC_CEP_FIM),
              },
            },
          );
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logFaixaUF) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseFaixaUf)) as Array<{
        UFE_SG: string;
        UFE_CEP_INI: string;
        UFE_CEP_FIM: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_FAIXA_UF.create({
            data: {
              UFE_SG: obj.UFE_SG,
              UFE_CEP_INI: String(obj.UFE_CEP_INI),
              UFE_CEP_FIM: String(obj.UFE_CEP_FIM),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logLogradouroFiles) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(
        readStream,
        parseLogradouroXX,
      )) as Array<{
        LOG_NU: number;
        UFE_SG: string;
        LOC_NU: number;
        BAI_NU_INI: number;
        BAI_NU_FIM: number;
        LOG_NO: string;
        LOG_COMPLEMENTO: string;
        CEP: string;
        TLO_TX: string;
        LOG_STA_TLO: string;
        LOG_NO_ABREV: string;
      }>;

      for await (const obj of json) {

        try {
         await this.prismaService.lOG_LOGRADOURO.create({
            data: {
              LOG_NU: +obj.LOG_NU,
              UFE_SG: String(obj.UFE_SG),
              LOC_NU: +obj.LOC_NU,
              BAI_NU_INI: +obj.BAI_NU_INI,
              BAI_NU_FIM: +obj.BAI_NU_FIM,
              LOG_NO: String(obj.LOG_NO),
              LOG_COMPLEMENTO: String(obj.LOG_COMPLEMENTO),
              CEP: String(obj.CEP),
              TLO_TX: String(obj.TLO_TX),
              LOG_STA_TLO: String(obj.LOG_STA_TLO),
              LOG_NO_ABREV: String(obj.LOG_NO_ABREV).substring(0, 36),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logUnidOper) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseUnidOper)) as Array<{
        UOP_NU: number;
        UFE_SG: string;
        LOC_NU: number;
        BAI_NU: number;
        LOG_NU: number;
        UOP_NO: string;
        UOP_ENDERECO: string;
        CEP: string;
        UOP_IN_CP: string;
        UOP_NO_ABREV: string;
      }>;

      for await (const obj of json) {

        try {
          await this.prismaService.lOG_UNID_OPER.create({
            data: {
              UOP_NU: +obj.UOP_NU,
              UFE_SG: String(obj.UFE_SG),
              LOC_NU: +obj.LOC_NU,
              BAI_NU: +obj.BAI_NU,
              LOG_NU: +obj.LOG_NU,
              UOP_NO: obj.UOP_NO,
              UOP_ENDERECO: obj.UOP_ENDERECO,
              CEP: String(obj.CEP),
              UOP_IN_CP: String(obj.UOP_IN_CP),
              UOP_NO_ABREV: String(obj.UOP_NO_ABREV),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logFaixaUOP) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseFaixaUOP)) as Array<{
        UOP_NU: number;
        FNC_INICIAL: number;
        FNC_FINAL: number;
      }>;

      for await (const obj of json) {

        try {
         await this.prismaService.lOG_FAIXA_UOP.create({
            data: {
              UOP_NU: +obj.UOP_NU,
              FNC_INICIAL: +obj.FNC_INICIAL,
              FNC_FINAL: +obj.FNC_FINAL,
            },
          });
       
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }

    for await (const file of logGrandeUsuario) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(
        readStream,
        parseGrandeUsuario,
      )) as Array<{
        GRU_NU: number;
        UFE_SG: string;
        LOC_NU: number;
        BAI_NU: number;
        LOG_NU: number;
        GRU_NO: string;
        GRU_ENDERECO: string;
        CEP: string;
        GRU_NO_ABREV: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_GRANDE_USUARIO.create({
            data: {
              GRU_NU: +obj.GRU_NU,
              UFE_SG: obj.UFE_SG,
              LOC_NU: +obj.LOC_NU,
              BAI_NU: +obj.BAI_NU,
              LOG_NU: +obj.LOG_NU,
              GRU_NO: String(obj.GRU_NO),
              GRU_ENDERECO: String(obj.GRU_ENDERECO),
              CEP: String(obj.CEP),
              GRU_NO_ABREV: String(obj.GRU_NO_ABREV),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }

    for await (const file of logNumSec) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseNumSec)) as Array<{
        LOG_NU: number;
        SEC_NU_INI: string;
        SEC_NU_FIM: string;
        SEC_IN_LADO: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_NUM_SEC.create({
            data: {
              LOG_NU: +obj.LOG_NU,
              SEC_NU_INI: String(obj.SEC_NU_INI),
              SEC_NU_FIM: String(obj.SEC_NU_FIM),
              SEC_IN_LADO: String(obj.SEC_IN_LADO),
            },
          });
          
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }

    for await (const file of logVarBai) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseVarBai)) as Array<{
        BAI_NU: number;
        VDB_NU: number;
        VDB_TX: string;
      }>;

      for await (const obj of json) {
      try {
          await this.prismaService.lOG_VAR_BAI.create({
            data: {
              BAI_NU: +obj.BAI_NU,
              VDB_NU: +obj.VDB_NU,
              VDB_TX: String(obj.VDB_TX),
            },
          });
         
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
    for await (const file of logVarLoc) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseVarLoc)) as Array<{
        LOC_NU: number;
        VAL_NU: number;
        VAL_TX: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_VAR_LOC.create({
            data: {
              LOC_NU: +obj.LOC_NU,
              VAL_NU: +obj.VAL_NU,
              VAL_TX: String(obj.VAL_TX),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }

    for await (const file of logVarLog) {
      const filePath = path.join(sourceFolderPath, file);
      const readStream = (await fs.readFile(filePath, 'latin1')).replace(
        /"/g,
        '',
      );

      const json = (await parsePromise(readStream, parseVarLog)) as Array<{
        LOG_NU: number;
        VLO_NU: number;
        TLO_TX: string;
        VLO_TX: string;
      }>;

      for await (const obj of json) {
        try {
          await this.prismaService.lOG_VAR_LOG.create({
            data: {
              LOG_NU: +obj.LOG_NU,
              VLO_NU: +obj.VLO_NU,
              TLO_TX: String(obj.TLO_TX),
              VLO_TX: String(obj.VLO_TX),
            },
          });
        } catch (error) {
          throw new BadRequestException(error);
        }
      }
    }
  }
}
