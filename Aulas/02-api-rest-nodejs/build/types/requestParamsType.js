"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/types/requestParamsType.ts
var requestParamsType_exports = {};
__export(requestParamsType_exports, {
  paramsZType: () => paramsZType
});
module.exports = __toCommonJS(requestParamsType_exports);
var import_zod = require("zod");
function paramsZType(req) {
  const createZParamsSchema = import_zod.z.object({
    id: import_zod.z.string().uuid()
  });
  const { id } = createZParamsSchema.parse(req.params);
  return id;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  paramsZType
});
