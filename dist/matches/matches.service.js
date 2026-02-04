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
exports.MatchesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const uuid_1 = require("uuid");
let MatchesService = class MatchesService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    matches = [];
    async create(inputData) {
        const newMatchUUID = (0, uuid_1.v4)();
        const { data, error } = await this.supabase
            .from('Match')
            .insert({
            id: newMatchUUID,
            playerWin: null,
            timeStart: inputData.timeStart,
            timeEnd: inputData.timeEnd,
            roundNum: inputData.roundNum,
        })
            .select('*')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        for (let i = 0; i < inputData.playerIds.length; i++) {
            const { data, error } = await this.supabase
                .from('Match_Player')
                .insert({
                id: (0, uuid_1.v4)(),
                playerId: inputData.playerIds[i],
                matchId: newMatchUUID
            })
                .select('*')
                .single();
            if (error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabase
            .from('Match')
            .select('*');
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    async findMatchPlayer(id) {
        const { data, error } = await this.supabase
            .from('Match_Player')
            .select('*')
            .eq('matchId', id);
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    findOne(id) {
        const match = this.matches.find(m => m.id === id);
        if (!match) {
            throw new common_1.NotFoundException('Match not found');
        }
        return match;
    }
    setWinner(matchId, playerId) {
        const match = this.findOne(matchId);
        match.playerWin = playerId;
        return match;
    }
};
exports.MatchesService = MatchesService;
exports.MatchesService = MatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], MatchesService);
//# sourceMappingURL=matches.service.js.map