<template>
    <div class="notifications">
        <UNotification
            class="notification"
            v-for="(notification, index) in notifications"
            :key="index"
            :message="notification.message"
            :type="notification.type"
            :icon="notification.icon"
            @close="removeNotification(index)"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { NotificationData } from "../../NotificationData";
import { vueEventEmitter } from "../../VueEventEmitter";
import { UNotification } from "ueli-designsystem";

interface Data {
    notifications: NotificationData[];
}

export default defineComponent({
    components: {
        UNotification,
    },

    data(): Data {
        return {
            notifications: [],
        };
    },

    methods: {
        addNotification(notification: NotificationData): void {
            const defaultNotificationDurationInMs = 5000;
            const index = this.notifications.push(notification);

            if (notification.autoHide) {
                setTimeout(
                    () => this.removeNotification(index - 1),
                    notification.autoHideDuration || defaultNotificationDurationInMs
                );
            }
        },

        removeNotification(index: number): void {
            this.notifications.splice(index, 1);
        },
    },

    mounted() {
        vueEventEmitter.on("Notification", (notification?: NotificationData) => {
            if (!notification) {
                return;
            }

            this.addNotification(notification);
        });
    },
});
</script>

<style scoped>
.notifications {
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
}

.notification:not(:first-child) {
    margin-bottom: var(--ueli-spacing-2x);
}
</style>
