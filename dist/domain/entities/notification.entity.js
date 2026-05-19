"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = void 0;
class Notification {
    constructor(id, userId, message, kind, status, createdAt) {
        this.id = id;
        this.userId = userId;
        this.message = message;
        this.kind = kind;
        this.status = status;
        this.createdAt = createdAt;
    }
    toDict() {
        return {
            id: this.id,
            user_id: this.userId,
            message: this.message,
            kind: this.kind,
            status: this.status,
            created_at: this.createdAt,
        };
    }
}
exports.Notification = Notification;
//# sourceMappingURL=notification.entity.js.map