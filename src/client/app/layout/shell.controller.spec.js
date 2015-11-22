/* jshint -W117, -W030 */
describe('ShellController', function() {
    var controller, scope;

    beforeEach(function() {
        bard.appModule('app.layout');
        bard.inject(
            '$controller',
            '$rootScope',
            'config',
            'logger',
            'coreevents',
            '$sessionStorage',
            'Users'
        );
    });

    beforeEach(function () {
        scope = $rootScope.$new();
        controller = $controller('ShellController', {$scope: scope});
        $rootScope.$apply();
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('Shell controller', function() {
        it('should be created successfully', function () {
            expect(controller).to.be.defined;
        });
    });
});
