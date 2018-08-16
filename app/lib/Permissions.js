import { database } from 'app/config/firebase';
import { Permissions, Notifications } from 'expo';

export default class PermissionsHandler {

	static async requestNotifications(userId) {
		const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		
		if(status != 'granted') {
			console.log(status)
			alert('Please enable notifications, they are essential for the proper functioning of the app.');
			return;
		}

		const token = await Notifications.getExpoPushTokenAsync();
		const Users = database.collection('Users');

		Users.doc(userId).update({
			"permissions.notifications": status == 'granted',
			"permissions.notifications_token": token,
			updated_at: new Date(),
		});
	}
}