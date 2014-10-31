var pubSub = {
	topics: {},

	subscribe: function (subsciption, listener) {
		self = this;
		// Create the topic's object if not yet created
		if (!this.topics[subsciption]) this.topics[subsciption] = {queue: []};

		// Add the listener to queue
		var index = this.topics[subsciption].queue.push(listener) - 1;

		// Provide handle back for removal of topic
		return {
			remove: function () {
				delete self.topics[subsciption].queue[index];
				// What if the last subscriber in queue is deleted?
				if (self.topics[subsciption].queue.length == 0) {
					delete self.topics[subsciption];
				}
			}
		};
	},
	publish: function (subscription, info) {
		// If the theme doesn't exist, or there's no listeners in queue, just leave
		if (!this.topics[subscription] || !this.topics[subscription].queue.length) return;

		// Cycle through topics queue, fire!
		var items = this.topics[subscription].queue;
		items.forEach(function (item) {
			item(info || {});
		});
	}
};