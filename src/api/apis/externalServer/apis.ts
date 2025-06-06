import type { UploadFileRequest } from '@/api/apis/externalServer/schemas';
import type { BlobResponse } from '@/api/apis/externalServer/schemas';
import type {
  ErrorResponse,
  InternalFileCallParams,
  ResponseNecessary,
  SuccessResponse,
} from '@/api/entities';

type GetApisProps = {
  callWithFile: <R extends ResponseNecessary>(
    p: InternalFileCallParams,
    returnFile?: boolean,
  ) => Promise<R | ErrorResponse>;
};

type Api = (_: {
  path: string;
  body: never;
  token: string;
  contentType: never;
  params: never;
  query: never;
}) => Promise<{ status: number; data: unknown }>;

export const getExternalServerApis = ({ callWithFile }: GetApisProps) =>
  ({
    'PUT upload-file': ({
      path,
      body,
      contentType,
    }: {
      path: string;
      body: UploadFileRequest;
      contentType: string;
    }) =>
      callWithFile<SuccessResponse<void>>({
        method: 'PUT',
        contentType,
        path,
        body,
      }),
    'GET download-file': ({ path }: { path: string }) => {
      const returnFile = true;
      return callWithFile<SuccessResponse<BlobResponse>>(
        {
          method: 'GET',
          path,
        },
        returnFile,
      );
    },
  }) satisfies Record<string, Api>;
