import { XMLParser, XMLBuilder } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@"
});

const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: "@"
});

export { parser, builder };