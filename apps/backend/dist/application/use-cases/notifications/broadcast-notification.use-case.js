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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastNotificationUseCase = void 0;
const common_1 = require("@nestjs/common");
const send_notification_use_case_1 = require("./send-notification.use-case");
let BroadcastNotificationUseCase = class BroadcastNotificationUseCase {
    constructor(sendNotificationUseCase) {
        this.sendNotificationUseCase = sendNotificationUseCase;
    }
    async execute(subject, message, userIds) {
        if (userIds && userIds.length > 0) {
            for (const userId of userIds) {
                await this.sendNotificationUseCase.execute(userId, subject, message);
            }
        }
    }
};
exports.BroadcastNotificationUseCase = BroadcastNotificationUseCase;
exports.BroadcastNotificationUseCase = BroadcastNotificationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [send_notification_use_case_1.SendNotificationUseCase])
], BroadcastNotificationUseCase);
//# sourceMappingURL=broadcast-notification.use-case.js.map