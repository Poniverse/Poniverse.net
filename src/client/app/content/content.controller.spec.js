/* jshint -W117, -W030 */
describe('ContentController', function() {
    var controller;
    var people = mockData.getMockPeople();

    beforeEach(function() {
        bard.appModule('app.content');
        bard.inject('$controller', '$log', '$q', '$rootScope');
    });

    beforeEach(function () {
        controller = $controller('ContentController');
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Content controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
