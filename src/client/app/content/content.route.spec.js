/* jshint -W117, -W030 */
describe('content routes', function () {
    describe('state', function () {
        var view = 'app/content/home.html';

        beforeEach(function() {
            module('app.content', bard.fakeToastr);
            bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
        });

        beforeEach(function() {
            $templateCache.put(view, '');
        });

        bard.verifyNoOutstandingHttpRequests();

        it('should map state content to url / ', function() {
            expect($state.href('home', {})).to.equal('/');
        });

        it('should map / route to content View template', function () {
            expect($state.get('home').templateUrl).to.equal(view);
        });

        it('of content should work with $state.go', function () {
            $state.go('home');
            $rootScope.$apply();
            expect($state.is('home'));
        });
    });
});
