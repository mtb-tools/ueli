<template>
    <div class="notifications">
        <UNotification
            class="notification"
            v-for="(notification, index) in notifications"
            :key="index"
            :message="notification.message"
            :type="notification.type?.toString()"
            :icon="notification.icon"
            @close="removeNotification(index)"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { NotificationData } from "../../NotificationData";
import { vueEventEmitter } from "../../VueEventEmitter";
import { UNotification } from "ueli-designsystem";

const notifications = ref<NotificationData[]>([]);

const removeNotification = (index: number) => notifications.value.splice(index, 1);

const addNotification = (notification: NotificationData): void => {
    const defaultNotificationDurationInMs = 5000;
    const index = notifications.value.push(notification);

    if (notification.autoHide) {
        setTimeout(
            () => removeNotification(index - 1),
            notification.autoHideDuration || defaultNotificationDurationInMs
        );
    }
};

onMounted(() =>
    vueEventEmitter.on("Notification", (notification?: NotificationData) => {
        if (!notification) {
            return;
        }

        addNotification(notification);
    })
);
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
