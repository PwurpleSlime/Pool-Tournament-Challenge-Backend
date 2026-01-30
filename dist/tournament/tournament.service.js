"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
let TournamentService = class TournamentService {
    tournaments = [];
    create(data) {
        const tournament = {
            id: (0, uuid_1.v4)(),
            ...data,
        };
        this.tournaments.push(tournament);
        return tournament;
    }
    findAll() {
        return this.tournaments;
    }
    findOne(id) {
        const tournament = this.tournaments.find(t => t.id === id);
        if (!tournament) {
            throw new common_1.NotFoundException('Tournament not found');
        }
        return tournament;
    }
    update() {
        throw new common_1.ForbiddenException('Tournament data is immutable once created');
    }
    remove() {
        throw new common_1.ForbiddenException('Tournament data cannot be deleted');
    }
};
exports.TournamentService = TournamentService;
exports.TournamentService = TournamentService = __decorate([
    (0, common_1.Injectable)()
], TournamentService);
//# sourceMappingURL=tournament.service.js.map