import { MultipartFields, MultipartValue } from '@fastify/multipart';
import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

export const ApiSingleBaseResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
          },
          result: {
            $ref: getSchemaPath(model),
          },
        },
        required: ['status', 'result'],
      },
    }),
  );
};

export const ApiListBaseResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        type: 'object',
        properties: {
          status: {
            type: 'boolean',
          },
          count: {
            type: 'integer',
          },
          totalCount: {
            type: 'integer',
          },
          offset: {
            type: 'integer',
          },
          limit: {
            type: 'integer',
          },
          result: {
            $ref: getSchemaPath(model),
          },
        },
        required: ['result', 'status'],
      },
    }),
  );
};

export class SingleBase<T> {
  status: boolean;
  result: T;
  constructor(result: T) {
    this.status = true;
    this.result = result;
  }
}

export class ListBase<T> {
  status: true;
  result: T[];
  totalCount?: number;
  count: number;
  offset?: number;
  limit?: number;
  constructor(result: T[]) {
    this.status = true;
    this.result = result;
  }
}

export function extractMultipartFields<T = any>(fields: MultipartFields): T {
  const body = Object.fromEntries(
    Object.keys(fields).map((key) => {
      const field = fields[key] as unknown as MultipartValue<any>;
      return [key, field.value];
    }),
  );
  return body as T;
}
