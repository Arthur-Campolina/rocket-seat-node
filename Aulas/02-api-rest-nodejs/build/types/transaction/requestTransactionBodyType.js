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

// src/types/transaction/requestTransactionBodyType.ts
var requestTransactionBodyType_exports = {};
__export(requestTransactionBodyType_exports, {
  transactionBodyZType: () => transactionBodyZType
});
module.exports = __toCommonJS(requestTransactionBodyType_exports);
var import_zod = require("zod");
function transactionBodyZType(req) {
  const createZTransactionBodySchema = import_zod.z.object({
    title: import_zod.z.string(),
    amount: import_zod.z.number(),
    type: import_zod.z.enum(["debit", "credit"])
  });
  const body = createZTransactionBodySchema.parse(req.body);
  return body;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transactionBodyZType
});
