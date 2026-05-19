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
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const send_notification_use_case_1 = require("../../application/use-cases/notifications/send-notification.use-case");
const get_notifications_by_user_use_case_1 = require("../../application/use-cases/notifications/get-notifications-by-user.use-case");
const mark_notification_as_read_use_case_1 = require("../../application/use-cases/notifications/mark-notification-as-read.use-case");
const delete_notification_use_case_1 = require("../../application/use-cases/notifications/delete-notification.use-case");
const broadcast_notification_use_case_1 = require("../../application/use-cases/notifications/broadcast-notification.use-case");
const send_notification_dto_1 = require("../../application/dto/send-notification.dto");
let NotificationsController = class NotificationsController {
    constructor(sendNotificationUseCase, getNotificationsByUserUseCase, markNotificationAsReadUseCase, deleteNotificationUseCase, broadcastNotificationUseCase) {
        this.sendNotificationUseCase = sendNotificationUseCase;
        this.getNotificationsByUserUseCase = getNotificationsByUserUseCase;
        this.markNotificationAsReadUseCase = markNotificationAsReadUseCase;
        this.deleteNotificationUseCase = deleteNotificationUseCase;
        this.broadcastNotificationUseCase = broadcastNotificationUseCase;
    }
    async getNotificationsByUser(userId) {
        const notifications = await this.getNotificationsByUserUseCase.execute(parseInt(userId));
        return notifications.map(n => n.toDict());
    }
    async sendNotification(dto) {
        const subject = dto.subject || 'Notificación';
        return this.sendNotificationUseCase.execute(dto.user_id, subject, dto.message, dto.kind);
    }
    async markAsRead(id) {
        await this.markNotificationAsReadUseCase.execute(parseInt(id));
        return { message: 'Notification marked as read' };
    }
    async deleteNotification(id) {
        await this.deleteNotificationUseCase.execute(parseInt(id));
        return { message: 'Notification deleted' };
    }
    async broadcastNotification(body) {
        await this.broadcastNotificationUseCase.execute(body.subject, body.message, body.userIds);
        return { message: 'Notification broadcasted' };
    }
};
exports.NotificationsController = NotificationsController;
__decorate([
    (0, common_1.Get)('notifications/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "getNotificationsByUser", null);
__decorate([
    (0, common_1.Post)('notifications'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_notification_dto_1.SendNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "sendNotification", null);
__decorate([
    (0, common_1.Post)('notifications/:id/read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Delete)('notifications/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "deleteNotification", null);
__decorate([
    (0, common_1.Post)('notifications/broadcast'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "broadcastNotification", null);
exports.NotificationsController = NotificationsController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [send_notification_use_case_1.SendNotificationUseCase,
        get_notifications_by_user_use_case_1.GetNotificationsByUserUseCase,
        mark_notification_as_read_use_case_1.MarkNotificationAsReadUseCase,
        delete_notification_use_case_1.DeleteNotificationUseCase,
        broadcast_notification_use_case_1.BroadcastNotificationUseCase])
], NotificationsController);
//# sourceMappingURL=notifications.controller.js.map