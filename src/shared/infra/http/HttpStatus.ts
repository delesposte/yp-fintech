export default class HttpStatus {
  constructor() { }

  //1×× Informational
  static Continue = 100;
  static SwitchingProtocols = 101;
  static Processing = 102;

  //2××-Success
  static OK = 200;
  static Created = 201;
  static Accepted = 202;
  static NonAuthoritativeInformation = 203;
  static NoContent = 204;
  static ResetContent = 205;
  static PartialContent = 206;
  static MultiStatus = 207;
  static AlreadyReported = 208;
  static IMUsed = 226;

  //3××-Redirection
  static MultipleChoices = 300;
  static MovedPermanently = 301;
  static Found = 302;
  static SeeOther = 303;
  static NotModified = 304;
  static UseProxy = 305;
  static TemporaryRedirect = 307;
  static PermanentRedirect = 308;

  //4××-ClientError
  static BadRequest = 400;
  static Unauthorized = 401;
  static PaymentRequired = 402;
  static Forbidden = 403;
  static NotFound = 404;
  static MethodNotAllowed = 405;
  static NotAcceptable = 406;
  static ProxyAuthenticationRequired = 407;
  static RequestTimeout = 408;
  static Conflict = 409;
  static Gone = 410;
  static LengthRequired = 411;
  static PreconditionFailed = 412;
  static PayloadTooLarge = 413;
  static RequestURITooLong = 414;
  static UnsupportedMediaType = 415;
  static RequestedRangeNotSatisfiable = 416;
  static ExpectationFailed = 417;
  static ImATeapot = 418;
  static MisdirectedRequest = 421;
  static UnprocessableEntity = 422;
  static Locked = 423;
  static FailedDependency = 424;
  static UpgradeRequired = 426;
  static PreconditionRequired = 428;
  static TooManyRequests = 429;
  static RequestHeaderFieldsTooLarge = 431;
  static ConnectionClosedWithoutResponse = 444;
  static UnavailableForLegalReasons = 451;
  static ClientClosedRequest = 499;

  //5××-ServerError
  static InternalServerError = 500;
  static NotImplemented = 501;
  static BadGateway = 502;
  static ServiceUnavailable = 503;
  static GatewayTimeout = 504;
  static HTTPVersionNotSupported = 505;
  static VariantAlsoNegotiates = 506;
  static InsufficientStorage = 507;
  static LoopDetected = 508;
  static NotExtended = 510;
  static NetworkAuthenticationRequired = 511;
  static NetworkConnectTimeoutError = 599;
}