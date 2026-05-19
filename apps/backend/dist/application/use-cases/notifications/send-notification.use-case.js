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
exports.SendNotificationUseCase = void 0;
const common_1 = require("@nestjs/common");
let SendNotificationUseCase = class SendNotificationUseCase {
    constructor(emailService, notificationRepository) {
        this.emailService = emailService;
        this.notificationRepository = notificationRepository;
    }
    async execute(userId, subject, message, kind) {
        await this.emailService.send(userId, subject, message);
        const notification = await this.notificationRepository.create(userId, message, kind || 'info', 'unread');
        return { id: notification.id };
    }
};
exports.SendNotificationUseCase = SendNotificationUseCase;
exports.SendNotificationUseCase = SendNotificationUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IEmailService')),
    __param(1, (0, common_1.Inject)('INotificationRepository')),
    __metadata("design:paramtypes", [Object, Object])
], SendNotificationUseCase);
//# sourceMappingURL=send-notification.use-case.js.map