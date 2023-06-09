const routeController = (queueClient) => {
	return (req, res) => {
		const { name, age, company } = req.body;
		
		queueClient.publish(process.env.QUEUE_EVENT_TO_PUBLISH, JSON.stringify({ name, age, company }))
			.then(done => {
				console.log(`Published to queue with ack code: ${done}`);
				res.send(`done ack: ${done}`)
			})
			.catch(err => {
				console.log(`Error publishing on queue: ${err}`);
				res.send(`error: ${err}`)
			});
	}
};

module.exports = routeController;