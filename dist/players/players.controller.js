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
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const players_service_1 = require("./players.service");
let PlayersController = class PlayersController {
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
    deletePlayer(id) {
        return this.service.deletePlayer(id);
    }
    findTournamentPlayers(id) {
        return this.service.findByTournament(id);
    }
    updateRecord(id, body) {
        return this.service.updateRecord(id, body.wins, body.losses);
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create player' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['tournamentId', 'displayName', 'logo'],
            properties: {
                tournamentId: { type: 'string', example: 'uuid-of-tournament' },
                displayName: { type: 'string', example: 'Player One' },
                logo: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://example.com/logo.png',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all players' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get player by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Player By Id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "deletePlayer", null);
__decorate([
    (0, common_1.Get)(':id/tournament'),
    (0, swagger_1.ApiOperation)({ summary: 'Get player by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "findTournamentPlayers", null);
__decorate([
    (0, common_1.Patch)(':id/record'),
    (0, swagger_1.ApiOperation)({ summary: 'Update wins/losses only' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            required: ['wins', 'losses'],
            properties: {
                wins: { type: 'number', example: 3 },
                losses: { type: 'number', example: 1 },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "updateRecord", null);
exports.PlayersController = PlayersController = __decorate([
    (0, swagger_1.ApiTags)('players'),
    (0, common_1.Controller)(['player', 'players']),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map