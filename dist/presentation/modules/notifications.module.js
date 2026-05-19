"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const send_notification_use_case_1 = require("../../application/use-cases/notifications/send-notification.use-case");
const get_notifications_by_user_use_case_1 = require("../../application/use-cases/notifications/get-notifications-by-user.use-case");
const mark_notification_as_read_use_case_1 = require("../../application/use-cases/notifications/mark-notification-as-read.use-case");
const delete_notification_use_case_1 = require("../../application/use-cases/notifications/delete-notification.use-case");
const broadcast_notification_use_case_1 = require("../../application/use-cases/notifications/broadcast-notification.use-case");
const email_service_impl_1 = require("../../infrastructure/services/email.service.impl");
const notification_typeorm_repository_1 = require("../../infrastructure/repositories/notification.typeorm.repository");
const notification_orm_entity_1 = require("../../infrastructure/database/entities/notification.orm-entity");
const notifications_controller_1 = require("../controllers/notifications.controller");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([notification_orm_entity_1.NotificationOrmEntity])],
        controllers: [notifications_controller_1.NotificationsController],
        providers: [
            {
                provide: 'IEmailService',
                useClass: email_service_impl_1.EmailService,
            },
            {
                provide: 'INotificationRepository',
                useClass: notification_typeorm_repository_1.NotificationTypeOrmRepository,
            },
            send_notification_use_case_1.SendNotificationUseCase,
            get_notifications_by_user_use_case_1.GetNotificationsByUserUseCase,
            mark_notification_as_read_use_case_1.MarkNotificationAsReadUseCase,
            delete_notification_use_case_1.DeleteNotificationUseCase,
            broadcast_notification_use_case_1.BroadcastNotificationUseCase,
        ],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map