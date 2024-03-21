export class FileTypeNotAbodedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MediaTypeError";
  }
}

export class linkMediaToMessageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "linkMediaToMessageError";
  }
}

export class MediaNotExitsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MediaNotExitsError";
  }
}
