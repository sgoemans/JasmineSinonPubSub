/**
 * Created by Goemans.Stephan on 31.07.2014.
 */
describe("Test timing", function () {
	it("should be a fast test", function (done) {
		expect("hi").toEqual("hi");
		done();
	});
	it("should be a medium test", function (done) {
		setTimeout(function () {
			expect("hi").toEqual("hi");
			done();
		}, 40);
	});
	it("should be a slow test", function (done) {
		setTimeout(function () {
			expect("hi").toEqual("hi");
			done();
		}, 100);
	});
	it("should be a timeout failure", function (done) {
		setTimeout(function () {
			expect("hi").toEqual("hi");
			done();
		}, 4000);
	});
});

describe("Asynchronous specs", function() {
	var value;
	beforeEach(function (done) {
		setTimeout(function () {
			value = 0;
			done();
		}, 1000);
	});
	it("should support async execution of test preparation and expectations", function (done) {
		value++;
		expect(value).toBeGreaterThan(0);
		done();
	});
});
describe("long asynchronous specs", function() {
	var originalTimeout;
	beforeEach(function() {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 7000;
	});

	it("takes a long time", function(done) {
		setTimeout(function() {
			expect('Me').toEqual('Me');
			done();
		}, 6000);
	});

	afterEach(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
});

