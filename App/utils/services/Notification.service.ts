import * as Notifications from "expo-notifications";
import { AppState, NativeEventSubscription } from "react-native";
import PlaybackService from "./Playback.service";
import { Audio } from "expo-av";

class NotificationService {
    setNotificationsListeners() {
        Notifications.setNotificationHandler({
            handleNotification: async ({ request }) => {
                return {
                    shouldPlaySound: false,
                    shouldShowAlert: true,
                    shouldSetBadge: false,
                };
            },
        });
    }
}

export default new NotificationService();
