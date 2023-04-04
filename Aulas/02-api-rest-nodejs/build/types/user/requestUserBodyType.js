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

// src/types/user/requestUserBodyType.ts
var requestUserBodyType_exports = {};
__export(requestUserBodyType_exports, {
  userBodyZType: () => userBodyZType
});
module.exports = __toCommonJS(requestUserBodyType_exports);
var import_zod = require("zod");
function userBodyZType(req) {
  const createZUserBodyTypeSchema = import_zod.z.object({
    id: import_zod.z.string().uuid(),
    name: import_zod.z.string(),
    email: import_zod.z.string().email({ message: "Invalid e-mail address" })
  });
  const user = createZUserBodyTypeSchema.parse(req.body);
  return user;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userBodyZType
});
