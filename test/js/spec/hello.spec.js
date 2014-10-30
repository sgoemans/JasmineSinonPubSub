/**
 * Created by Goemans.Stephan on 30.07.2014.
 */
describe("Trying out the test libraries:", function () {
	describe("Jasmine", function () {
		it("should be equal using 'expect', ", function () {
			expect(hello()).toEqual("Hello World");
		});
	});
	describe("Sinon.JS", function () {
		it("should report spy called", function () {
			var helloSpy = sinon.spy(window, 'hello');
			expect(helloSpy.called).toBeFalsy();
			hello();

			expect(helloSpy.called).toBeTruthy();
			hello.restore();
		});
		it("test should call subscribers on publish", function () {
			var callback = sinon.spy();
			var rem = pubSub.subscribe("message", callback);
			pubSub.publish("message");
			rem.remove();
			expect(callback.called).toBeTruthy();
		});
	});
});