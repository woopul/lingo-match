export type BaseApiResponseType<BodyType = unknown> = {
  body: BodyType;
  error?: object;
  status: number;
};
