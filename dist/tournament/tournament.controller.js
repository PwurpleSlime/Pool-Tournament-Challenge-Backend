"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tournament_service_1 = require("./tournament.service");
let TournamentController = class TournamentController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(body) {
        return this.service.create(body);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
};
exports.TournamentController = TournamentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create tournament (immutable)' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['dateStart', 'dateEnd', 'location', 'lengthOfBreak', 'numberOfRounds'],
            properties: {
                dateStart: { type: 'string', format: 'date-time', example: '2026-02-01T10:00:00Z' },
                dateEnd: { type: 'string', format: 'date-time', example: '2026-02-01T18:00:00Z' },
                location: { type: 'string', example: 'Main Hall A' },
                lengthOfBreak: { type: 'number', example: 10 },
                numberOfRounds: { type: 'number', example: 5 },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all tournaments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get tournament by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TournamentController.prototype, "findOne", null);
exports.TournamentController = TournamentController = __decorate([
    (0, swagger_1.ApiTags)('tournament'),
    (0, common_1.Controller)('tournament'),
    __metadata("design:paramtypes", [tournament_service_1.TournamentService])
], TournamentController);
//# sourceMappingURL=tournament.controller.js.map