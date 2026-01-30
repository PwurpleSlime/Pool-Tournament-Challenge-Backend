"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let PlayersService = class PlayersService {
    players = [];
    create(data) {
        if (!data.logo.startsWith('http')) {
            throw new common_1.BadRequestException('Logo must be an image URL');
        }
        const player = {
            id: (0, uuid_1.v4)(),
            wins: 0,
            losses: 0,
            w_l: '0%',
            ...data,
        };
        this.players.push(player);
        return player;
    }
    findAll() {
        return this.players;
    }
    findOne(id) {
        const player = this.players.find(p => p.id === id);
        if (!player) {
            throw new common_1.NotFoundException('Player not found');
        }
        return player;
    }
    updateRecord(id, wins, losses) {
        const player = this.findOne(id);
        const total = wins + losses;
        player.wins = wins;
        player.losses = losses;
        player.w_l = total === 0 ? '0%' : `${Math.round((wins / total) * 100)}%`;
        return player;
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)()
], PlayersService);
//# sourceMappingURL=players.service.js.map