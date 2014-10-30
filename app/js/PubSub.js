var pubSub = {
	topics: {},

	subscribe: function (theme, listener) {
		self = this;
		// Create the topic's object if not yet created
		if (!this.topics[theme]) this.topics[theme] = {queue: []};

		// Add the listener to queue
		var index = this.topics[theme].queue.push(listener) - 1;

		// Provide handle back for removal of topic
		return {
			remove: function () {
				delete self.topics[theme].queue[index];
				// What if the last subscriber in queue is deleted?
				if (self.topics[theme].queue.length == 0) {
					delete self.topics[theme];
				}
			}
		};
	},
	publish: function (theme, info) {
		// If the theme doesn't exist, or there's no listeners in queue, just leave
		if (!this.topics[theme] || !this.topics[theme].queue.length) return;

		// Cycle through topics queue, fire!
		var items = this.topics[theme].queue;
		items.forEach(function (item) {
			item(info || {});
		});
	}
}