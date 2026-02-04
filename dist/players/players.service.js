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
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const uuid_1 = require("uuid");
const supabase_js_1 = require("@supabase/supabase-js");
let PlayersService = class PlayersService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    players = [];
    async create(inputData) {
        const { data, error } = await this.supabase
            .from('Player')
            .insert({
            id: (0, uuid_1.v4)(),
            disName: inputData.displayName,
            tournamentId: inputData.tournamentId,
            wins: inputData.wins,
            losses: inputData.losses,
            "w-l": (inputData.wins + inputData.losses) === 0 ? '0%' : `${Math.round((inputData.wins / (inputData.wins + inputData.losses)) * 100)}%`,
            logo: "https://example.com/logo.png"
        })
            .select('*')
            .single();
        return data;
    }
    async findAll() {
        const { data, error } = await this.supabase
            .from('Player')
            .select('*');
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    async findByTournament(id) {
        const { data, error } = await this.supabase
            .from('Player')
            .select('*')
            .eq('tournamentId', id);
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabase
            .from('Player')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    async updateRecord(id, wins, losses, newName) {
        const { data, error } = await this.supabase
            .from('Player')
            .update({
            disName: newName,
            wins: wins,
            losses: losses,
            "w-l": (wins + losses) === 0 ? '0%' : `${Math.round((wins / (wins + losses)) * 100)}%`
        })
            .eq('id', id)
            .select('*')
            .single();
        if (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
        return data;
    }
    async deletePlayer(id) {
        const { data, error } = await this.supabase
            .from('Player')
            .delete()
            .eq('id', id)
            .select('*')
            .single();
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], PlayersService);
//# sourceMappingURL=players.service.js.map